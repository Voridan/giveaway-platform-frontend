import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.tsx';
import './index.css';
import { AuthProvider } from './context/AuthProvider.tsx';
import { ThemeProvider } from '@emotion/react';
import theme from './theme.ts';

//TODO complete requireauth component, sign up, test authenticaton and authorization

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
