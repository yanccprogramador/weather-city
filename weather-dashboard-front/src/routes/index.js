import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Home from "../Pages/Home";

function RequireAuth({ children }) {;
  
    return localStorage.getItem('token')? children : <Navigate to="/login" replace />;
}
export const routes = createBrowserRouter( [
  {
    path: "/",
    element: <RequireAuth><Home /></RequireAuth>
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
