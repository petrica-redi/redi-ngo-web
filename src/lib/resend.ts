import { Resend } from "resend";
import { getEnv } from "./env";

let instance: Resend | null | undefined;

export function getResend(): Resend | null {
  if (instance !== undefined) return instance;
  const key = getEnv("RESEND_API_KEY");
  if (!key) {
    instance = null;
    return null;
  }
  instance = new Resend(key);
  return instance;
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();
  const to = getEnv("CONTACT_EMAIL") ?? getEnv("RESEND_FROM_EMAIL");
  const from = getEnv("RESEND_FROM_EMAIL") ?? "REDI NGO <onboarding@resend.dev>";

  if (!resend || !to) {
    console.info("[contact] Resend not configured, logging message:", data);
    return { ok: true };
  }

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: data.email,
    subject: `REDI Contact: ${data.name}`,
    text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
    tags: [{ name: "type", value: "contact-form" }],
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
