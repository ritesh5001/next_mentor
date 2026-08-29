/**
 * The shape every Server Action in this app returns to a form.
 *
 * Shared because it is a contract between the two sides: backend actions
 * produce it, frontend forms consume it via useActionState. Declaring it
 * separately in each layer is how the two drift apart.
 */
export type ActionState = { error?: string; success?: string } | null;

/** A Server Action bound to useActionState. */
export type FormAction = (prev: ActionState, formData: FormData) => Promise<ActionState>;
