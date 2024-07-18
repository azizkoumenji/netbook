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

function App() {
  const currentUser = true;

  // Navigate to login page when user not logged in (wrapped with Layout component in router).
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) return <Navigate to="/login" />;
    return children;
  };

  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const Layout = () => (
    <>
      <NavBar />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
