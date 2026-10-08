// Shared by the contact form (client) and /api/contact (server). No secrets here.

export const projectOptions = ["Création ou refonte de site", "Référencement naturel", "Publicité en ligne", "Autre sujet"] as const;

/** Invisible anti-bot field. Deliberately unremarkable name; a human never sees or fills it. */
export const trapField = "reference";
/** Milliseconds between the form being displayed and its submission. */
export const elapsedField = "elapsed";
/** Below this delay a submission is treated as automated. A human cannot fill the form this fast. */
export const minimumFillMs = 3000;

export type ContactPayload = {
  name: string;
  company: string;
  email: string;
  project: string;
  message: string;
  service: string;
  source: string;
  [trapField]: string;
  [elapsedField]: number;
};

export type ContactResponse = { success?: boolean; delivered?: boolean; error?: string };

/**
 * Sends the form and reports whether the request was really delivered.
 * Only a delivered submission may count as a conversion: the server answers spam with a
 * generic success (so bots learn nothing) but without `delivered`.
 */
export async function submitContact(
  payload: ContactPayload,
  send: (body: string) => Promise<{ ok: boolean; json: () => Promise<unknown> }>,
  onDelivered: (service: string) => void,
) {
  const res = await send(JSON.stringify(payload));
  const data = (await res.json()) as ContactResponse;
  if (!res.ok || data.success !== true) throw new Error(data.error || "Erreur lors de l'envoi.");
  if (data.delivered === true && !payload[trapField]) onDelivered(payload.service);
}
