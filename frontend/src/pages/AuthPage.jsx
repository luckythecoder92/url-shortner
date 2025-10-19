import React, { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import LoginForm from '../components/LoginForm'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  return (
    <div className='h-screen w-screen flex items-center justify-center bg-gray-300'>
      {isLogin ? <LoginForm state= {setIsLogin}/> : <RegisterForm state= {setIsLogin}/>}
    </div>
  )
}

export default AuthPage