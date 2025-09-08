import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Link, NavLink, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home.jsx";
import Todos from "./pages/Todos.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";

function AppLayout() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setDeferredPrompt(null);
      console.log('PWA foi instalado');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('Usuário aceitou instalar o PWA');
    } else {
      console.log('Usuário recusou instalar o PWA');
    }

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  return (
    <div>
      <header className="header">
        <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:'.75rem'}}>
          <h1 style={{margin:0}}><Link to="/">To-Do PWA</Link></h1>
          <div style={{display:'flex', alignItems:'center', gap:'.5rem'}}>
            {showInstallButton && (
              <button 
                onClick={handleInstallClick}
                style={{
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                📱 Instalar App
              </button>
            )}
            <nav className="nav" style={{display:'flex', gap:'.5rem', flexWrap:'wrap'}}>
              <NavLink to="/" end>Home</NavLink>
              <NavLink to="/todos">Todos</NavLink>
              <NavLink to="/about">About</NavLink>
            </nav>
          </div>
        </div>
      </header>
      <main className="container"><Outlet /></main>
    </div>
  );
}

// Esse tipo de router é diferente do que vimos, porem funciona igual, o element é o nosso layout, que fica ao redor da pagina
// e dentro de children é o nosso conteudo, que fica dentro do layout.
// path é o caminho da nossa pagina que fica na url, e element é o html da nossa pagina.
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
