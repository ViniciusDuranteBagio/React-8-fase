import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Game from './pages/Game';

const router = createBrowserRouter([
 {
  path: '/',
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
      <main className="main-content">{children}</main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router}/>
}