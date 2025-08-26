import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/app-layout";
import { Home } from "./pages/home";
import { About } from "./pages/about";
import { NotFound } from "./pages/not-found";
import { Game } from "./pages/game";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/game",
        element: <Game />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
