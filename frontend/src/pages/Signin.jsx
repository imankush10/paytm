import InputBox from "../components/InputBox";
import FooterWarning from "../components/FooterWarning";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const { email, setEmail, password, setPassword, signin, status, setStatus } =
    useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 200) navigate("/dashboard");
    return () => {
      setStatus(null);
    };
  }, [status, setStatus, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-500">
      <div className="flex flex-col gap-3 w-[400px] h-[480px]  rounded-xl p-6 shadow-2xl shadow-zinc-800 bg-white">
        <h1 className="text-center font-bold text-4xl">Sign In</h1>
        <h4 className="text-center text-xl text-gray-500 font-semibold">
          Enter your information to access your account
        </h4>
        <InputBox
          label="Email or username"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          label="Password"
          type="password"
          placeholder="******"
          value={password}
          setValue={setPassword}
        />
        <Button onClick={() => signin(email, password)}>Sign In</Button>
        <FooterWarning linkRoute="/signup" linkText="Sign up">
          Don't have an account?
        </FooterWarning>
      </div>
    </div>
  );
}
