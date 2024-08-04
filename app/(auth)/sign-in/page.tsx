'use client'

import React from 'react'
import { signIn } from 'next-auth/react'

const SignInPage = () => {
  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' })
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded flex items-center justify-center hover:bg-gray-50 transition duration-150"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google logo" className="w-5 h-5 mr-2" />
          Sign in with Google
        </button>
      </div>
    </section>
  )
}

export default SignInPage