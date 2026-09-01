import type { UploadAuth, UploadedFile } from "@nextmentor/shared";

/**
 * Uploads a file straight from the browser to ImageKit.
 *
 * The bytes never pass through our own servers, which is what keeps a 10MB PDF
 * from hitting a serverless request-body limit — the same reasoning behind
 * Cloudflare Stream's direct-creator-upload for video.
 *
 * This replaced an S3-style presigned PUT. ImageKit wants a multipart POST to
 * its own endpoint carrying a short-lived signature the API generated, so the
 * request shape is different even though the security model is the same: the
 * private key stays on the server.
 */
export async function uploadToImageKit(
  auth: UploadAuth,
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadedFile> {
  const form = new FormData();
  form.append("file", file);
  form.append("fileName", auth.fileName);
  form.append("publicKey", auth.publicKey);
  form.append("signature", auth.signature);
  form.append("expire", String(auth.expire));
  form.append("token", auth.token);
  form.append("folder", auth.folder);
  // Without this ImageKit appends a random suffix, and the path we store would
  // not match the one it actually saved.
  form.append("useUniqueFileName", "false");

  // XHR rather than fetch: fetch still has no upload progress events, and a
  // large file with no progress bar is indistinguishable from a hang.
  return new Promise<UploadedFile>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", auth.uploadUrl, true);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      let body: { filePath?: string; url?: string; fileId?: string; message?: string };
      try {
        body = JSON.parse(xhr.responseText);
      } catch {
        reject(new Error(`ImageKit returned an unreadable response (${xhr.status}).`));
        return;
      }

      if (xhr.status < 200 || xhr.status >= 300) {
        // ImageKit's own message is far more useful than the status code —
        // it names an expired signature or a rejected file type outright.
        reject(new Error(body.message ?? `Upload failed (${xhr.status}).`));
        return;
      }

      if (!body.filePath || !body.url || !body.fileId) {
        reject(new Error("Upload succeeded but the response was incomplete."));
        return;
      }

      resolve({ filePath: body.filePath, url: body.url, fileId: body.fileId });
    };

    xhr.onerror = () => reject(new Error("Upload failed. Check your connection."));
    xhr.ontimeout = () => reject(new Error("Upload timed out."));

    xhr.send(form);
  });
}
