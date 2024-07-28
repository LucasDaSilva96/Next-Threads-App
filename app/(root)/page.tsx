import { UserButton } from '@clerk/nextjs';
import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  // Query DB for user specific information or display assets only to signed in users
  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  // Use `user` to render user details or create UI elements that are only available to signed in users

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
    </>
  );
}
