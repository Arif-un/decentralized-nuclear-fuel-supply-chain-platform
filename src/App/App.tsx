import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { MetaMaskProvider } from 'metamask-react'

import Layout from '@/components/Layout/Layout'
import useTypedSelector from '@/hooks/useTypedSelector'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Login from '@/pages/Login'
import CreateOrder from '@/pages/Orders/CreateOrder'
import OrderDetails from '@/pages/Orders/OrderDetails'
import Orders from '@/pages/Orders/Orders'
import AddUser from '@/pages/Users/AddUser'
import Users from '@/pages/Users/Users'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/add-user',
        element: <AddUser />,
      },
      {
        path: '/orders',
        element: <Orders />,
      },
      {
        path: '/create-order',
        element: <CreateOrder />,
      },
      {
        path: '/order-details/:id',
        element: <OrderDetails />,
      },
    ],
  },
])

export const App = () => {
  const theme = useTypedSelector((state) => state.AppSettingsSlice.theme)

  return (
    <div data-theme={theme === 'light' ? 'light' : 'dark'} className={`${theme} h-full`}>
      <MetaMaskProvider>
        <RouterProvider router={router} />
      </MetaMaskProvider>
    </div>
  )
}

export default App
