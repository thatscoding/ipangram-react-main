import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";

import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Dashboard/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Employees from "./pages/Dashboard/Employees";
import Department from "./pages/Dashboard/Department";
import AddEmployee from "./pages/Dashboard/AddEmployee";
import AddDepartment from "./pages/Dashboard/AddDepartment";

import { UserContextProvider } from "./context/userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile/:id",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/employees",
    element: <Employees />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/departments",
    element: <Department />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/departments/:id",
    element: <AddDepartment />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/employees/new",
    element: <AddEmployee />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/employees/:id",
    element: <AddEmployee />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashbard/departments/new",
    element: <AddDepartment />,
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </React.StrictMode>
);
