'use client'

import RegisterForm from '../../../components/form/RegisterForm'

export default function RegisterPage() {
  async function onSubmit(event) {
    event.preventDefault()
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulating an error for demonstration
        reject(new Error("This email is already registered. Please try another."))
      }, 2000)
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-orange-50 to-yellow-100 flex flex-col justify-center p-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <RegisterForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}