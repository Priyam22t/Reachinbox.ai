interface TabsProps {
  active: "scheduled" | "sent";
  onChange: (tab: "scheduled" | "sent") => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-4 border-b border-gray-700 px-6">
      {["scheduled", "sent"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab as any)}
          className={`py-3 capitalize ${
            active === tab
              ? "border-b-2 border-green-400 text-green-400"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab} Emails
        </button>
      ))}
    </div>
  );
}
