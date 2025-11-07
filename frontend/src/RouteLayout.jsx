import { Outlet } from '@tanstack/react-router'
import Navbar from './pages/Navbar.jsx'

const RouteLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-10xl mt-20 mx-auto  sm:px-10 lg:py-1 py-8">
        <Outlet />
      </main>
    </div>
  )
} 

export default RouteLayout
