import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './pages/Game'
import Home from './pages/Home'
import Navigation from './components/Navigation';
import './style.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout>
      <Navigation/>
      <Home/>
    </AppLayout>
  },
  {
    path: '/Game',
    element: <AppLayout>
      <Navigation/>
      <Game/>
    </AppLayout>
  }
]);

function AppLayout({children}) {
  return(
    <div className="app">
      <main className="main-content">
      {children}
      </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router}/>
}
