import Game from './pages/Game';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/404';

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
  {
    path: '*',
    element: <NotFound />,
    errorElement: (
      <AppLayout>
        <NotFound />
      </AppLayout>
    ),
  },
]);

function AppLayout({ children }) {
  return (
    <div className='app'>
      <Navigation />
      <main className='main-content'>{children}</main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
