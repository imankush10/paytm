import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function UserDetail({ name, id }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="font-semibold text-2xl flex gap-2 items-center">
        <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center">
          {name[0]}
        </div>
        <span>{name} </span>
      </div>
      <Button onClick={() => navigate(`/sendmoney?to=${id}&name=${name}`)}>
        Send Money
      </Button>
    </div>
  );
}
