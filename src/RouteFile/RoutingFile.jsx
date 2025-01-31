import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import React from "react";
import Loader from "../Loader/Loader";
const DashboardLogin = React.lazy(() => import("../Login/DashboardLogin"));
const ForgotPassword = React.lazy(() => import("../Login/ForgotPassword"));
const DontHaveAccount = React.lazy(() => import("../Login/DontHaveAccount"));
const ChatComponent = React.lazy(() => import("../Chats/ChatComponent"));

const RouteingFile = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DashboardLogin />,
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />,
    },
    {
      path: "/signup",
      element: <DontHaveAccount />,
    },
    {
      path: "/conversations",
      element: <ChatComponent />,
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
