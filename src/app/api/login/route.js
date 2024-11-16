import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request) {
  try {
    const body = await request.json()
    console.log('Login attempt - Email:', body.email, 'Password:', '*'.repeat(body.password?.length || 0))

    const { email, password } = body

    // Basic validation
    if (!email || !password) {
      console.log('Validation failed: Missing email or password')
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Read users file
    const usersFilePath = path.join(process.cwd(), 'src/utils/users.json')
    const fileContent = await fs.readFile(usersFilePath, 'utf8')
    const usersData = JSON.parse(fileContent)
    
    console.log('Available roles:', usersData.roles.map(u => ({ email: u.email, role: u.role })))

    // Find user
    const user = usersData.roles.find(user => user.email === email)
    console.log('User lookup result:', user ? {
      found: true,
      email: user.email,
      role: user.role,
      passwordMatch: user.password === password
    } : 'User not found')

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      console.log('Authentication failed:', !user ? 'User not found' : 'Password mismatch')
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create user object without sensitive data
    const userSession = {
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
      permissions: user.permissions
    }

    // Generate a simple token (in production, use JWT)
    const token = crypto.randomUUID()

    // Set both session and token
    cookies().set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    // Store session data
    if (!global.sessions) {
      global.sessions = new Map()
    }
    global.sessions.set(token, userSession)

    console.log('Login successful for role:', userSession.role)

    // Return success response with user data and token
    return NextResponse.json({
      message: 'Login successful',
      user: userSession,
      token: token
    }, { 
      status: 200
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 