import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContextVar = createContext();

export default function AuthContext({ children }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");

  async function signup(email, password, name, username) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          name,
          email,
          password,
          username,
        }
      );
      setStatus(response.status);
    } catch (error) {
      setStatus(error.response.status);
      if (error.response) console.log(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  }
  async function signin(identifier, password) {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          identifier,
          password,
        }
      );
      setStatus(response.status);
    } catch (error) {
      setStatus(error.response.status);
      if (error.response) console.log(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  }

  return (
    <AuthContextVar.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        name,
        setName,
        username,
        setUsername,
        signup,
        signin,
        status,
        setStatus,
      }}
    >
      {children}
    </AuthContextVar.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContextVar);
}
