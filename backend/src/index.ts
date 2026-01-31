import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import { db } from "./config/db";
import { createEmail } from "./db/emails";
import authRoutes from "./routes/auth";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// 🔐 Google auth
app.use("/auth", authRoutes);

// ✅ Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// 📩 Get emails by status
app.get("/emails", async (req: Request, res: Response) => {
  const status = req.query.status as string;

  if (!status) {
    return res.status(400).json({ error: "status required" });
  }

  const result = await db.query(
    "SELECT * FROM emails WHERE status = $1 ORDER BY scheduled_at ASC",
    [status]
  );

  res.json(result.rows);
});

// 🕒 Schedule email (NO BULLMQ – SAFE MODE)
app.post("/schedule-email", async (req: Request, res: Response) => {
  try {
    const { emails, subject, body, scheduled_at } = req.body;

    if (!Array.isArray(emails) || emails.length === 0) {
      return res.status(400).json({ error: "emails array required" });
    }

    const scheduledDate = new Date(scheduled_at);
    if (isNaN(scheduledDate.getTime())) {
      return res.status(400).json({ error: "invalid scheduled date" });
    }

    for (const to_email of emails) {
      await createEmail({
        to_email,
        subject,
        body,
        scheduled_at: scheduledDate,
      });
    }

    return res.json({
      message: "Emails scheduled successfully",
      count: emails.length,
    });
  } catch (err) {
    console.error("Schedule error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
