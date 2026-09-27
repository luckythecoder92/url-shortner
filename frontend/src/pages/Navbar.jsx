import React from 'react'
import { Link, useNavigate, useMatch } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import { logoutUser } from '../apis/user.api'

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const homeMatch = useMatch('/')
  const dashboardMatch = useMatch('/dashboard')

  const handleLogout = async () => {
    try {
      await logoutUser()

      dispatch(logout())

      await navigate({
        to: '/',
        replace: true,
      })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* Left side */}
          <div className="flex items-center space-x-8">

            <Link
              to="/"
              className="text-xl font-bold text-gray-800 hover:text-gray-700"
            >
              URL Shortener
            </Link>

            <div className="hidden md:flex space-x-4">

              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  homeMatch
                    ? 'text-blue-700 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    dashboardMatch
                      ? 'text-blue-700 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
              )}

            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">

            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome{user?.username ? `, ${user.username}` : ''}!
                </span>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Login
              </Link>
            )}

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar