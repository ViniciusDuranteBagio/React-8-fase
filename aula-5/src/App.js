import Jogo from "./pages/Jogo";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation';
import Inicio from "./pages/Inicio";
import '.'


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout>
      <Inicio />
    </AppLayout>
  },
  {
    path: '/jogo',
    element: <AppLayout>
      <Jogo />
    </AppLayout>
  }



])
function AppLayout({ children }) {
  return (
    < div className='app'>
      <Navigation />
      <main className='main-content'>
        {children}
      </main>
    </div>
  )
}
export default function App() {
  return <RouterProvider router={router} />;
}
