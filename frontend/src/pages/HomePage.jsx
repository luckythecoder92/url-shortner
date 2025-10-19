import React from 'react'
import UrlForm from '../components/UrlForm'
import RegisterForm from '../components/RegisterForm'

const HomePage = () => {
  return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          URL Shortener
        </h1>
        
      <UrlForm/>
        
      </div>
    </div>
  )
}

export default HomePage