import InputBox from "../components/InputBox";
import FooterWarning from "../components/FooterWarning";
import { useAuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    signup,
    username,
    setUsername,
    status,
    setStatus,
  } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (status === 200) navigate("/dashboard");
    return () => {
      setStatus(null);
    };
  }, [status, setStatus, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-neutral-500 overflow-hidden">
      <div className="flex flex-col gap-3 w-[400px] h-[650px] rounded-xl p-6 shadow-2xl shadow-zinc-800 bg-white">
        <h1 className="text-center font-bold text-4xl">Sign Up</h1>
        <h4 className="text-center text-xl text-gray-500 font-semibold">
          Enter your information to create an account
        </h4>
        <InputBox
          label="Name"
          type="text"
          placeholder="John Doe"
          value={name}
          setValue={setName}
        />
        <InputBox
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          value={email}
          setValue={setEmail}
        />
        <InputBox
          label="Username"
          type="text"
          placeholder="johndoe123"
          value={username}
          setValue={setUsername}
        />
        <InputBox
          label="Password"
          type="password"
          placeholder="******"
          value={password}
          setValue={setPassword}
        />
        <Button onClick={() => signup(email, password, name, username)}>
          Sign Up
        </Button>
        <FooterWarning linkRoute="/signin" linkText="Login">
          Already have an account?
        </FooterWarning>
      </div>
    </div>
  );
}
