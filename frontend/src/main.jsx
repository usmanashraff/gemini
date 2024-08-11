import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'
import Dashboard from './pages/Dashboard.jsx'
import Chat from './pages/Chat.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import RootLayout from './layouts/RootLayout.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignInPage from './pages/SignIn.jsx'
import SignUpPage from './pages/SignUp.jsx'

const router = createBrowserRouter([
 {
  element: <RootLayout />,
  children:[
    {
      path:'/',
      element:<Home />
    },
    {
      element: <DashboardLayout />,
      children:[
        {
          path: '/dashboard',
          element: <Dashboard />
        },
        {
          path: '/dashboard/chats/:id',
          element: <Chat />
        }
      ]
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
    {
      path: '/sign-up',
      element: <SignUpPage />
    }
  ]
 }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
   </React.StrictMode>
)
