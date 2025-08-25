import './App.css'
import Navigation from './components/Navigation';
import Game from './pages/Game';

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
