import { useEffect, useState } from "react";
import { fetchScheduledEmails, fetchSentEmails } from "../services/api";
import EmailTable from "../components/EmailTable";
import Tabs from "../components/Tabs";
import Header from "../components/Header";
import ComposeEmailModal from "../components/ComposeEmailModal";
import type Email from "../types/email";

type User = {
  email: string;
  name: string;
  picture: string;
};

type Props = {
  user: User;
  onLogout: () => void;
};

export default function Dashboard({ user, onLogout }: Props) {
  const [activeTab, setActiveTab] =
    useState<"scheduled" | "sent">("scheduled");
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  async function loadEmails() {
    setLoading(true);
    try {
      const data =
        activeTab === "scheduled"
          ? await fetchScheduledEmails()
          : await fetchSentEmails();
      setEmails(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEmails();
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <Header
          user={user}
          onLogout={onLogout}
          onCompose={() => setIsComposeOpen(true)}
        />

        <Tabs active={activeTab} onChange={setActiveTab} />

        {loading ? (
          <div className="text-gray-400 mt-6">Loading...</div>
        ) : (
          <div className="bg-[#0F172A] rounded-xl p-4 mt-4">
            <EmailTable emails={emails} />
          </div>
        )}
      </div>

      <ComposeEmailModal
        isOpen={isComposeOpen}
        onClose={() => setIsComposeOpen(false)}
        onSuccess={loadEmails}
      />
    </div>
  );
}
