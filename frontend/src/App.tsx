import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

type User = {
  email: string;
  name: string;
  picture: string;
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Dashboard
      user={user}
      onLogout={() => setUser(null)}
    />
  );
}
