import React from 'react';
import { redirect } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { currentUser } from '@clerk/nextjs/server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { profileTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';

export default async function Profile_Page({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) return redirect('/onboarding');

  return (
    <section className='text-slate-50'>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user?.id}
        name={userInfo.name}
        username={userInfo.username}
        image={userInfo.image}
        bio={userInfo.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value}>
                <Image src={tab.icon} alt={tab.label} height={24} width={24} />
                <p className='max-sm:hidden'>{tab.label}</p>
                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo?.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {profileTabs.map((tab) => (
            <TabsContent
              key={'content-' + tab.label}
              value={tab.value}
              className='w-full text-light-1'
            >
              <ThreadsTab
                currentUserId={user?.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
