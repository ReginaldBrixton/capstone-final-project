'use server';

import { revalidatePath } from 'next/cache';

export async function resetPassword(prevState, formData) {
  const email = formData.get('email');

  // Here you would typically:
  // 1. Validate the email
  // 2. Check if the email exists in your database
  // 3. Generate a password reset token
  // 4. Send an email with the reset link

  // For this example, we'll just simulate the process
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

  if (email === 'error@example.com') {
    return { success: false, message: 'An error occurred. Please try again.' };
  }

  revalidatePath('/forgot-password');
  return {
    success: true,
    message: 'If an account exists for this email, you will receive password reset instructions.',
  };
}
