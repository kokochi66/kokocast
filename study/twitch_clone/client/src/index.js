import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css';
import { App } from './App';

import { AuthPage } from './AuthPage'
import { DashboardPage } from './DashboardPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App>
      <Routes>
        <Route path='/auth' element={<AuthPage />}></Route>
        <Route path='/*' element={<DashboardPage />}></Route>
      </Routes>
    </App>
  </BrowserRouter>
);
