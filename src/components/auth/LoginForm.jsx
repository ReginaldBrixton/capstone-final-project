'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "../form/button";
import { Input } from "../form/input";
import { Label } from "../form/label";
import { Alert, AlertDescription } from "../form/alert";
import { Separator } from "../ui/separator";
import { Icons } from "../icons";
import { motion } from "framer-motion";
import { Checkbox } from "../form/checkbox";
import Link from "next/link";
import {
  signInWithEmailPassword,
  signInWithPhone,
  verifyPhoneCode,
  signInWithGoogle
} from '../../lib/firebase/config';
import { africanCountries } from '../../lib/constants/countries';
import { ErrorAlert } from "../ui/error-alert"

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(africanCountries[0]);
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleEmailLogin = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const user = await signInWithEmailPassword(email, password);
      console.log('Email login successful:', user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Email login error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSignIn = async (e) => {
    e.preventDefault();
    try {
      // Format phone number to E.164 format
      const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
      const confirmationResult = await signInWithPhone(auth, formattedPhone);
      // Handle confirmation result...
    } catch (error) {
      console.error('Phone sign in error:', error);
      setError(error.message);
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult || isVerifying) return;

    try {
      setIsVerifying(true);
      setError(null);

      const result = await verifyPhoneCode(confirmationResult, verificationCode);
      console.log('Phone authentication successful:', result);
      
      // Handle successful verification here
      router.push('/dashboard');
    } catch (err) {
      console.error('Code verification error:', err);
      setError(err.message || 'Failed to verify code');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      const user = await signInWithGoogle();
      console.log('Google login successful:', user);
      router.push('/dashboard');
    } catch (err) {
      console.error('Google login error:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => setError(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 flex flex-col justify-center p-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to your account
            </p>
          </div>

          <ErrorAlert message={error} onDismiss={dismissError} />

          <div className="flex justify-center space-x-4 mb-6">
            <Button
              variant={authMethod === 'email' ? 'default' : 'outline'}
              onClick={() => setAuthMethod('email')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Icons.mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button
              variant={authMethod === 'phone' ? 'default' : 'outline'}
              onClick={() => setAuthMethod('phone')}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <Icons.phone className="mr-2 h-4 w-4" />
              Phone
            </Button>
          </div>

          {authMethod === 'email' ? (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <div className="mt-1">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox id="remember-me" className="h-4 w-4 text-indigo-600" />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </Label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in with Email'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <select
                      value={selectedCountry.code}
                      onChange={(e) => {
                        const country = africanCountries.find(c => c.code === e.target.value);
                        setSelectedCountry(country);
                      }}
                      className="h-full py-0 pl-3 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md focus:ring-2 focus:ring-indigo-500"
                    >
                      {africanCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    className="block w-full pl-24 pr-3 py-2 border border-gray-300 rounded-md"
                    disabled={isLoading || isVerifying}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Enter your phone number without the country code
                </p>
              </div>

              {confirmationResult && (
                <div>
                  <Label htmlFor="code" className="block text-sm font-medium text-gray-700">
                    Verification Code
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="code"
                      type="text"
                      placeholder="123456"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={6}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled={isLoading || isVerifying}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the 6-digit code sent to your phone
                  </p>
                </div>
              )}

              <div id="phone-recaptcha"></div>

              <Button
                onClick={!confirmationResult ? handlePhoneSignIn : handleVerifyCode}
                disabled={isLoading || isVerifying || !phoneNumber || (confirmationResult && !verificationCode)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {isLoading || isVerifying ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    {isVerifying ? 'Verifying...' : 'Sending code...'}
                  </>
                ) : (
                  <>
                    <Icons.phone className="mr-2 h-4 w-4" />
                    {!confirmationResult ? 'Send Code' : 'Verify Code'}
                  </>
                )}
              </Button>
            </div>
          )}

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={handleGoogleLogin}
                className="w-full border border-gray-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
                Google
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Button
              variant="link"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => router.push('/register')}
            >
              Sign up
            </Button>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
