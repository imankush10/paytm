import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import { useUsersContext } from "../context/UsersContext";
import { useAuthContext } from "../context/AuthContext";

export default function SendMoney() {
  const { amount, setAmount, send, overflow, setOverflow } = useUsersContext();
  const { balance } = useAuthContext();
  const [seachParams] = useSearchParams();
  const to = seachParams.get("to");
  const name = seachParams.get("name");
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center h-screen overflow-hidden">
        <div className="flex flex-col gap-3 w-[500px] h-[425px] rounded-xl p-6 shadow-2xl shadow-zinc-500 bg-white ">
          <h1 className="text-center font-bold text-4xl">Send Money</h1>

          <h1 className="text-2xl font-semibold">Your balance: {balance}</h1>

          {overflow && (
            <h1 className="text-xl font-bold text-red-500">
              Insufficient amount
            </h1>
          )}

          <div className="font-semibold text-2xl flex gap-2 items-center mt-4 mb-4">
            <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center">
              {name[0]}
            </div>
            <span>{name} </span>
          </div>
          <InputBox
            label="Amount"
            type="number"
            placeholder="Enter amount"
            value={amount}
            setValue={setAmount}
          />
          <Button
            type="transfer"
            onClick={() => {
              if (amount > balance) {
                setOverflow(true);
                return;
              }
              send(to, amount);
              navigate("/dashboard");
            }}
          >
            Initiate Transfer
          </Button>
        </div>
      </div>
    </div>
  );
}
