import { Outlet } from '@tanstack/react-router'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'

const RouteLayout = () => {
  return (
    <div>
      
  
    <HomePage/>
  <Outlet/>
    </div>
  
  
  )
} 
export default RouteLayout
