import { createRoot } from 'react-dom/client'
import './index.css'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { routeTree } from './routing/routeTree'

const router = createRouter({ routeTree })

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
