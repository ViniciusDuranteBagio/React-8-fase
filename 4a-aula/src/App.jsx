import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css'

const router = createBrowserRouter([
 {
  path: '/',
  element: (
    <AppLayout>
      <Home />
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