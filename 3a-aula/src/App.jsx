
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/Game';


function AppLayout({ children }) {
  return (
    <div className="app">
      <nav>
        {/* Adicione seus links de navegação aqui */}
        <a href="/">Home</a>
        <a href="/game">Game</a>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
}

function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout><Game/></AppLayout>,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
