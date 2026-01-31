type User = {
  email: string;
  name: string;
  picture: string;
};

type Props = {
  user: User;
  onCompose: () => void;
  onLogout: () => void;
};

export default function Header({ user, onCompose, onLogout }: Props) {
  return (
    <div className="flex items-center justify-between bg-[#020617] p-4 rounded-xl">
      <h1 className="text-2xl font-bold text-green-500">
        ReachInbox
      </h1>

      <div className="flex items-center gap-4">
        <button
          onClick={onCompose}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md"
        >
          Compose
        </button>

        <div className="flex items-center gap-2">
          <img
            src={user.picture}
            className="w-8 h-8 rounded-full"
          />
          <div className="text-sm">
            <div>{user.name}</div>
            <div className="text-gray-400">
              {user.email}
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="text-red-400 hover:underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
