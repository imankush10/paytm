import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import AuthContext from "./context/AuthContext";
import UsersContext from "./context/UsersContext";
import SpinnerFullPage from "./components/SpinnerFullPage/SpinnerFullPage";

const Signup = lazy(() => import("./pages/Signup"));
const Signin = lazy(() => import("./pages/Signin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const SendMoney = lazy(() => import("./pages/SendMoney"));
const ProtectedRoutes = lazy(() => import("./pages/ProtectedRoutes"));

function App() {
  return (
    <AuthContext>
      <UsersContext>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Navigate replace to="/signin" />} />
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
          </Suspense>
        </BrowserRouter>
      </UsersContext>
    </AuthContext>
  );
}

export default App;
