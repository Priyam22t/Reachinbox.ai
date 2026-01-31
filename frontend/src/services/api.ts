import type Email from "../types/email";

const API_BASE = "http://localhost:4000";

export async function fetchScheduledEmails(): Promise<Email[]> {
  const res = await fetch(`${API_BASE}/emails?status=scheduled`);

  if (!res.ok) {
    throw new Error("Failed to fetch scheduled emails");
  }

  const data = (await res.json()) as Email[];
  return data;
}

export async function fetchSentEmails(): Promise<Email[]> {
  const res = await fetch(`${API_BASE}/emails?status=sent`);

  if (!res.ok) {
    throw new Error("Failed to fetch sent emails");
  }

  const data = (await res.json()) as Email[];
  return data;
}
