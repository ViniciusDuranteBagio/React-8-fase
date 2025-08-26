import './styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Game from './pages/Game';
import Navigation from './components/Navigation';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Home/>
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
  }
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
