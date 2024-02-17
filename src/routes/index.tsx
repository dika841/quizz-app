import { createBrowserRouter } from "react-router-dom";
import { LoginModule } from "@libs/modules/login";
import App from "../App.tsx";
import { MainLayout, NotFound } from "@libs/index.ts";
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <LoginModule />,
      },
      {
        path: "/quiz",
        element: <App />,
      },
    ],
  },
]);
