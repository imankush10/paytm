import { useAuthContext } from "../context/AuthContext";
import Button from "./Button";

export default function UserName({ name }) {
  const { logout } = useAuthContext();
  return (
    <div className="font-semibold text-2xl flex gap-4 items-center">
      <span>Hello, {name.split(" ")[0]} </span>
      <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center">
        {name[0]}
      </div>
      <div className="text-lg">
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
