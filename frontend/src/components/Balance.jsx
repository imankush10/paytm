import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Balance() {
  const { balance, getBalance } = useAuthContext();

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return (
    <>
      <h1 className="font-bold text-2xl">
        Your Balance <span>${balance}</span>
      </h1>
    </>
  );
}
