import { useAuthContext } from "../context/AuthContext";
import { useUsersContext } from "../context/UsersContext";
import InputBox from "./InputBox";
import UserDetail from "./UserDetail";

export default function Users() {
  const { name } = useAuthContext();
  const { searchQuery, setSearchQuery, userList } = useUsersContext();
  return (
    <>
      <h1 className="font-bold text-3xl mb-5 mt-4">Users</h1>
      <InputBox
        type="text"
        placeholder="Search Users..."
        value={searchQuery}
        setValue={setSearchQuery}
      />
      <ul className="mt-10 flex flex-col gap-6">
        {userList
          ?.filter((user) => user.name !== name)
          .map((user) => (
            <li key={user._id}>
              <UserDetail name={user.name} id={user._id}/>
            </li>
          ))}
      </ul>
    </>
  );
}
