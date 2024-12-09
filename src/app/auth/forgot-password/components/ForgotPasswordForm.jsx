import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { resetPassword } from '../actions';
import styles from '../Forget-password.module.scss';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`${styles.submitButton} ${pending ? styles.submitting : ''}`}
      disabled={pending}
    >
      {pending ? 'Sending...' : 'Reset Password'}
    </button>
  );
}

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const formRef = useRef(null);

  async function handleSubmit(formData) {
    const result = await resetPassword(null, formData);
    setMessage(result);
  }

  return (
    <form ref={formRef} action={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <label htmlFor="email" className={styles.label}>
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
          placeholder="Enter your email"
        />
      </div>
      <SubmitButton />
      {message && (
        <div className={`${styles.message} ${message.success ? styles.success : styles.error}`}>
          {message.message}
        </div>
      )}
    </form>
  );
}
