import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from "./pages/Game.jsx"
import Home from './pages/Home.jsx';
import Navigation from './components/Navigation.jsx';

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
])

function AppLayout({ children }){
  return <div className='app'>
    <Navigation />
    <main className='main-content'>
      {children}
    </main>
  </div>
}

export default function App(){
  return <RouterProvider router={router} />
}