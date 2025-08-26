import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './styles.css';
import { useState } from "react";
import Navigation from "./components/Navigation";
import Game from './pages/Game';
import Home from './pages/Home';
import About from "./pages/About";
import Err404 from "./pages/Error";

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
  {
  path: '/about',
  element: (
    <AppLayout>
      <About />
    </AppLayout>
  ),
 },
 {
  path: '/*',
  element: (
    <AppLayout>
      <Err404 />
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