// app/layout.tsx (or RootLayout.tsx)
'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux'; 
import Home from './pages/Home';
import NavBar from './components/Navbar';
import store from './store/store'; 
import './App.css'; 

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="border">
        <Provider store={store}>
          <Home />
          <NavBar />
          <main className="wrapper">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
