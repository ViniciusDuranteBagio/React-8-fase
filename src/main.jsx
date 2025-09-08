import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Link, NavLink, Outlet } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Todos from "./pages/Todos.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function AppLayout() {
  return (
    <div>
      <header className="header">
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'.75rem'}}>
          <h1 style={{margin:0}}><Link to="/">To-Do PWA</Link></h1>
          <nav className="nav" style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/todos">Todos</NavLink>
            <NavLink to="/about">About</NavLink>
          </nav>
        </div>
      </header>
      <main className="container"><Outlet /></main>
    </div>
  );
}

// Router com layout + rotas filhas
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "todos", element: <Todos /> },
      { path: "about", element: <About /> },
    ],
  },
]);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js");
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);
