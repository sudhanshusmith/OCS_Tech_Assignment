import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//utils 
import { LoggedInUserOnly, LoggedOutUserOnly, tokenLoader } from './utils/auth';
import { Logout } from "./utils/logout.jsx";
import LoggedOut from "./pages/Success/LoggedOut.jsx";

import Root from './Root.jsx';
import ErrorPage from './pages/Error/ErrorPage.jsx';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        path: "/",
        element: <Login />,
        loader: LoggedOutUserOnly,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: LoggedInUserOnly,
      },
      {
        path: '/logout',
        element: <Logout />,
        loader: LoggedInUserOnly,
      },
      {
        path: "/logout_success",
        element: <LoggedOut />,
        loader: LoggedOutUserOnly
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
