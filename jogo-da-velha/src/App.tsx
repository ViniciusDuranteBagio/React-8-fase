import { RouterProvider } from "react-router";
import { router } from "./routes";

export const App = () => {
  return <RouterProvider router={router} />;
};
