import { useContext } from "react";
import LeftBar from "./components/leftbar/LeftBar";
import NavBar from "./components/navbar/NavBar";
import RightBar from "./components/rightbar/RightBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import PropTypes from "prop-types";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Chat from "./pages/chat/Chat";
import Friends from "./pages/friends/Friends";
import { OnlineContextProvider } from "./context/onlineContext";

const queryClient = new QueryClient();

function App() {
  const { currentUser } = useContext(AuthContext);

  // Navigate to login page when user not logged in (wrapped with Layout component in router).
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const Layout = () => (
    <QueryClientProvider client={queryClient}>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </QueryClientProvider>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <OnlineContextProvider>
            <Layout />
          </OnlineContextProvider>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/following",
          element: <Friends />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/chat",
      element: (
        <ProtectedRoute>
          <OnlineContextProvider>
            <Chat />
          </OnlineContextProvider>
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
