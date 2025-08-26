import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css'
import Navigation from "./components/Navigation";
import Game from './pages/Game';
import Home from './pages/Home'

const router = createBrowserRouter([
 {
  path: '/home',
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

]);

function AppLayout({children}) {
  return (
    <div className="app">
      <Navigation />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router}/>
}