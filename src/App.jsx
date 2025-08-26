import { useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Game from './pages/Game';
import Navigation from './components/Navigation';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: ( <AppLayout>
      <Home/>
    </AppLayout> )
  },
  {
    path: '/game',
    element: ( <AppLayout>
      <Game/>
    </AppLayout> )
  }
]);

function AppLayout({children}) {
  return (
    <div className="app">
      <Navigation/>
    <main className="main-content">
    {children}
    </main>
    </div>
  );
}

export default function App() {
  return <RouterProvider router={router} />
}
