import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from './pages/Game';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Sobre from './pages/sobre';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Sobre/>
      </AppLayout>
    )
  },
  {
    path: '/game',
    element: (
      <AppLayout>
        <Game/>
      </AppLayout>
    )
  },
  {
    path: '/home',
    element: (
      <AppLayout>
        <Home/>
      </AppLayout>
    )
  },
  
]);

function AppLayout({ children }) {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}