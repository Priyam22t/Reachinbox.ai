export default interface Email {
  id: number;
  to_email: string;
  subject: string;
  body: string;
  status: string;
  scheduled_at: string;
  sent_at?: string;
}
