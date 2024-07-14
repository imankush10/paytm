import Balance from "../components/Balance";
import UserName from "../components/UserName";
import Users from "../components/Users";
import { useAuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { name } = useAuthContext();
  return (
    <div className="p-5 flex flex-col gap-5">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-4xl">Payments App</h1>
        <UserName name={name} />
      </div>
      <hr/>
      <div>
        <Balance />
      </div>
      <div>
        <Users/>
      </div>
    </div>
  );
}
