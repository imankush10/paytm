import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const usersContextVar = createContext();

export default function UsersContext({ children }) {
  const { token, getBalance } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);
  const [amount, setAmount] = useState("");
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/bulk?filter=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserList(response.data);
    }
    if (token !== null) fetchUsers();
  }, [searchQuery, token]);

  useEffect(() => {
    setOverflow(false);
  }, [amount]);

  async function send(to, amount) {
    await axios.post(
      "http://localhost:3000/api/v1/account/transfer",
      {
        to,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getBalance();
    setAmount("");
  }

  return (
    <usersContextVar.Provider
      value={{
        searchQuery,
        setSearchQuery,
        userList,
        amount,
        setAmount,
        send,
        overflow,
        setOverflow,
      }}
    >
      {children}
    </usersContextVar.Provider>
  );
}

export function useUsersContext() {
  return useContext(usersContextVar);
}
