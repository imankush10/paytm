import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import AuthContext from "./context/AuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import UsersContext from "./context/UsersContext";

function App() {
  return (
    <AuthContext>
      <UsersContext>
        <BrowserRouter>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/sendmoney"
              element={
                <ProtectedRoutes>
                  <SendMoney />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </BrowserRouter>
      </UsersContext>
    </AuthContext>
  );
}

export default App;
