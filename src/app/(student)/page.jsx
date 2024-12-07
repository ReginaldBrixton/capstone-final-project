import { redirect } from 'next/navigation';

export default async function StudentRootPage() {
  return redirect('/home');
}
