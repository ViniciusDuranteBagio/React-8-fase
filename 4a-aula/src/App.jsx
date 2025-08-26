import './styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Game from './pages/Game';
import About from './pages/About';
import NotFound from './pages/Notfound';
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
    path: '/about',
    element: (
      <AppLayout>
        <About/>
      </AppLayout>
    )
  },
  {
    path: '/*',
    element: (
      <AppLayout>
        <NotFound/>
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
