import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx' 
import { createRouter, RouterProvider } from '@tanstack/react-router'
// import routes from './routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { routeTree } from './routing/routeTree'


export const queryClient = new QueryClient()
const router = createRouter({routeTree})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}>
  
    </RouterProvider>
  </QueryClientProvider>

)
