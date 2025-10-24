import React, { useState } from 'react'
import { Link, useNavigate, useMatch } from '@tanstack/react-router'

const Navbar = () => {
  // We'll replace this with actual auth state management later
  const [isAuthenticated] = useState(false)
  const navigate = useNavigate()
  
  // Get current route match to highlight active link
  const homeMatch = useMatch('/')
  const dashboardMatch = useMatch('/dashboard')
  
  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Brand and Navigation */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-xl font-bold text-gray-800 hover:text-gray-700"
            >
              URL Shortener
            </Link>
            
            {/* Main navigation */}
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

          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">Welcome!</span>
                <button
                  onClick={() => {
                    // We'll add logout logic later
                    navigate('/')
                  }}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
