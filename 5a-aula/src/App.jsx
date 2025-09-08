import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/about';
import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Home />
      </AppLayout>
    ),
  },
  {
    path: '/game',
    element: (
      <AppLayout>
        <Game />
      </AppLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <AppLayout>
        <About />
      </AppLayout>
    ),
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