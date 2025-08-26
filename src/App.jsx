import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Game from './pages/Game';
import Home from './pages/Home';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
      <Home />
      </AppLayout> 
    )
  },
  {
    path: '/game',
    element: (
      <AppLayout>
      <Game />
      </AppLayout> 
    )
  }
]);

function AppLayout({ children }) {
  return (  
    <div className='app'>
      <Navigation></Navigation>
      <main className='main-content'>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />;
}
