import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContextVar = createContext();

export default function AuthContext({ children }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [balance, setBalance] = useState(0);

  async function signup(email, password, name, username) {
    if (!email || !password || !name || !username) return;
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
      setIsAuthenticated(true);
    } catch (error) {
      setStatus(error.response.status);
      setIsAuthenticated(false);
      if (error.response) console.log(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  }
  async function signin(identifier, password) {
    if (!identifier || !password) return;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          identifier,
          password,
        }
      );
      setStatus(response.status);
      setName(response.data.name);
      setToken(response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setStatus(error.response.status);
      setIsAuthenticated(false);
      if (error.response) console.log(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  }

  async function getBalance() {
    if (!token) return;
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBalance(response.data.balance);
    } catch (error) {
      setStatus(error.response.status);
      setIsAuthenticated(false);
      if (error.response) console.log(error.response.data.message);
      else if (error.request) console.log(error.request);
      else console.log(error.message);
    }
  }

  function logout() {
    setEmail("");
    setUsername("");
    setPassword("");
    setName("");
    setStatus("");
    setIsAuthenticated(false);
    setToken(null);
    setBalance(0);
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
        isAuthenticated,
        balance,
        getBalance,
        token,
        logout,
      }}
    >
      {children}
    </AuthContextVar.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContextVar);
}
