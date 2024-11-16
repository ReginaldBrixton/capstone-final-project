import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { email, password, role = 'student', firstName, lastName } = body

    // Basic validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { message: 'All fields are required' },
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
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    try {
      // Read the current users file
      const usersFilePath = path.join(process.cwd(), 'src/utils/users.json')
      const fileContent = await fs.readFile(usersFilePath, 'utf8')
      const usersData = JSON.parse(fileContent)

      // Check if user already exists
      const userExists = usersData.roles.some(user => user.email === email)
      if (userExists) {
        return NextResponse.json(
          { message: 'User with this email already exists' },
          { status: 400 }
        )
      }

      // Create new user object
      const newUser = {
        email,
        password, // In a real application, you should hash the password
        role,
        permissions: ['read'], // Default permissions for new users
        firstName,
        lastName
      }

      // Add new user to the array
      usersData.roles.push(newUser)

      // Write the updated data back to the file
      await fs.writeFile(
        usersFilePath,
        JSON.stringify(usersData, null, 2),
        'utf8'
      )

      return NextResponse.json(
        { 
          message: 'User registered successfully',
          user: { email, role, firstName, lastName }
        },
        { status: 201 }
      )

    } catch (fileError) {
      console.error('File operation error:', fileError)
      return NextResponse.json(
        { message: 'Error accessing user database' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 