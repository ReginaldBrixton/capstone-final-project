'use server';

import { revalidatePath } from 'next/cache';

export async function resetPassword(prevState, formData) {
  const email = formData.get('email');

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'error@example.com') {
    return { success: false, message: 'An error occurred. Please try again.' };
  }

  revalidatePath('/forgot-password');
  return {
    success: true,
    message: 'If an account exists for this email, you will receive password reset instructions.',
  };
}
