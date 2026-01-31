import { useState } from "react";
import Papa from "papaparse";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ComposeEmailModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [emails, setEmails] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  function handleCSVUpload(file: File) {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: (results) => {
        const parsed = results.data
          .map((r: any) => String(r[0]).trim())
          .filter((e) => e.includes("@"));

        setEmails(parsed);
      },
    });
  }

  async function handleSchedule() {
  if (!emails.length || !subject || !body || !scheduledAt) {
    setError("All fields are required");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const isoDate = new Date(scheduledAt).toISOString();

    const res = await fetch("http://localhost:4000/schedule-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emails,
        subject,
        body,
        scheduled_at: isoDate,
      }),
    });

    // 🔥 IMPORTANT FIX
    if (!res.headers.get("content-type")?.includes("application/json")) {
      throw new Error("Backend did not return JSON. Is server running?");
    }

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to schedule");
    }

    onSuccess();
    onClose();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0F172A] rounded-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Compose Email</h2>

        <input
          type="file"
          accept=".csv"
          onChange={(e) =>
            e.target.files && handleCSVUpload(e.target.files[0])
          }
          className="text-sm mb-2"
        />

        {emails.length > 0 && (
          <p className="text-green-400 text-sm mb-3">
            {emails.length} emails loaded
          </p>
        )}

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#020617]"
        />

        <textarea
          placeholder="Email body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full mb-3 p-2 rounded bg-[#020617]"
        />

        {/* ✅ MUST BE datetime-local */}
        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full mb-3 p-2 rounded bg-[#020617]"
        />

        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSchedule}
            disabled={loading}
            className="bg-green-600 px-4 py-2 rounded"
          >
            {loading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
