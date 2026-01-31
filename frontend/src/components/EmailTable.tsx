import type Email from "../types/email";

interface Props {
  emails: Email[];
}

export default function EmailTable({ emails }: Props) {
  if (emails.length === 0) {
    return (
      <div className="text-gray-400 text-center py-8">
        No emails found
      </div>
    );
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-400 border-b border-gray-700">
          <th className="py-3">Email</th>
          <th className="py-3">Subject</th>
          <th className="py-3">Status</th>
          <th className="py-3">Time</th>
        </tr>
      </thead>

      <tbody>
        {emails.map((email) => (
          <tr
            key={email.id}
            className="border-b border-gray-800 hover:bg-[#0B1220]"
          >
            <td className="py-3">{email.to_email}</td>
            <td className="py-3">{email.subject}</td>
            <td className="py-3">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  email.status === "sent"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {email.status}
              </span>
            </td>
            <td className="py-3 text-gray-300">
              {new Date(
                email.sent_at || email.scheduled_at
              ).toLocaleString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
