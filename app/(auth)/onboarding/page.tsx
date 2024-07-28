import AccountProfile from '@/components/forms/AccountProfile';
import { currentUser } from '@clerk/nextjs/server';
import { UserInfo } from 'os';
import React from 'react';

export default async function Onboarding_Page() {
  const user = await currentUser();

  const userInfo: UserInfo = {};

  const userData = {
    id: user?.id,
    objectId: user?._id,
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
