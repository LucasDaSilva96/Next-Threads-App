import AccountProfile from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.actions';
import { UserInfo } from '@/types/user/user.Info';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Onboarding_Page() {
  const user = await currentUser();

  const userInfo = (await fetchUser(user!.id)) as UserInfo;

  if (userInfo?.onboarded) return redirect('/');

  const userData = {
    id: user!.id,
    username: userInfo?.username || user?.username!,
    name: userInfo?.name || user?.firstName || ' ',
    bio: userInfo?.bio || ' ',
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
      <h1 className='head-text'>
        Onboarding
        <p className='mt-3 text-base-regular text-light-2'>
          Complete your profile now to use Threads
        </p>
      </h1>
      <section className='mt-9 bg-dark-2 p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}
