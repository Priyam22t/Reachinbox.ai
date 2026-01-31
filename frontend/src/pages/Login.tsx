import { GoogleLogin } from "@react-oauth/google";

type Props = {
  onLogin: (user: any) => void;
};

export default function Login({ onLogin }: Props) {
  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <GoogleLogin
        onSuccess={async (res) => {
          const r = await fetch("http://localhost:4000/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: res.credential }),
          });

          const data = await r.json();
          onLogin(data.user);
        }}
        onError={() => {
          alert("Google login failed");
        }}
      />
    </div>
  );
}
