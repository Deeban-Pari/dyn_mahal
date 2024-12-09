import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import React from "react";
import ReactDom from "react-dom/client";
import Auth from "./components/Auth";
import Header from "./components/Header";
import Body from "./components/Body";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppLayout = () => {
  return (
    <div className="app">
      <ToastContainer />
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/auth/login",
        element: <Auth />,
      },
      // {
      //   path: "/auth/signup",
      //   element: <Auth />,
      // },
    ],
  },
]);

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
