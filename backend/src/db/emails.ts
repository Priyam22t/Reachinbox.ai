import { db } from "../config/db";

export async function createEmail(data: {
  to_email: string;
  subject: string;
  body: string;
  scheduled_at: Date;
}) {
  const result = await db.query(
    `
    INSERT INTO emails (to_email, subject, body, scheduled_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [data.to_email, data.subject, data.body, data.scheduled_at]
  );

  return result.rows[0];
}

export async function markEmailSent(id: number) {
  await db.query(
    `
    UPDATE emails
    SET status = 'sent', sent_at = NOW()
    WHERE id = $1
    `,
    [id]
  );
}
