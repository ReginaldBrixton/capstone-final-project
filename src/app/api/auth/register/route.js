import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email and password are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Password strength validation
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return NextResponse.json(
        { message: 'Password does not meet strength requirements' },
        { status: 400 }
      )
    }

    // Read existing users
    const usersFilePath = path.join(process.cwd(), 'src/utils/users.json')
    let usersData = { roles: [] }
    
    try {
      const fileContent = await fs.readFile(usersFilePath, 'utf8')
      usersData = JSON.parse(fileContent)
    } catch {
      // If file doesn't exist, we'll create it
      console.log('Users file not found, will create new one')
    }

    // Check if email already exists
    if (usersData.roles.some(user => user.email === email)) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      )
    }

    // Add new user
    const newUser = {
      name,
      email,
      password, // In production, hash the password before storing
      role: 'student',
      permissions: ['view_projects', 'submit_work']
    }

    usersData.roles.push(newUser)

    // Save updated users data
    await fs.writeFile(usersFilePath, JSON.stringify(usersData, null, 2))

    // Return success response (exclude password from response)
    const userResponse = { ...newUser }
    delete userResponse.password

    return NextResponse.json({
      message: 'Registration successful',
      user: userResponse
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 