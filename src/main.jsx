import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Marketplace from './pages/Marketplace.jsx'
import Feed from './pages/Feed.jsx'
import Profile from './pages/Profile.jsx'
import './global.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'marketplace', element: <Marketplace /> },
      { path: 'feed', element: <Feed /> },
      { path: 'profile', element: <Profile /> }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


