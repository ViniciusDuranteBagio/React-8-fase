import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/Game.jsx';  
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter ([
  {
    path: '/',
    element: (<Applayout>
      <Home />
    </Applayout>)
  },
    {
    path: '/game',
    element: (<Applayout>
      <Game />
    </Applayout>)
  }
])

function Applayout ({ children }) {
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

