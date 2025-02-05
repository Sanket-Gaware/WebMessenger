import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import Loader from "../Loader/Loader";
const DashboardLogin = React.lazy(() => import("../Login/DashboardLogin"));
const Register = React.lazy(() => import("../Login/Register"));
const Conversation = React.lazy(() => import("../Chats/Conversation"));

const RouteingFile = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLogin />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/conversations",
      element: <Conversation />,
    },
  ]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
};
export default RouteingFile;
