import './styles.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Game from './pages/Game';
import Navigation from './components/Navigation';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Game/>
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
