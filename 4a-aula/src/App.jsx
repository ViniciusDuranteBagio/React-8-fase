import "./styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from "./pages/game";
import Navigation from "./components/Navigation";
import Home from "./pages/home";

// Layout principal
function AppLayout({ children }) {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">{children}</main>
    </div>
  );
}

// Configuração do roteamento
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
    },
    {
     path: "/Game",
    element: (
      <AppLayout>
        <Game />
      </AppLayout>
    ),
  },
]);


// Componente principal
export default function App() {
  return <RouterProvider router={router} />;
}
