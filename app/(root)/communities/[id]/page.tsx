import React from 'react';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server';

import { communityTabs } from '@/constants';
import ProfileHeader from '@/components/shared/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { fetchCommunityDetails } from '@/lib/actions/community.action';
import UserCard from '@/components/cards/UserCard';

export default async function Community_Page({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section className='text-slate-50'>
      <ProfileHeader
        accountId={communityDetails.id}
        authUserId={user?.id}
        name={communityDetails.name}
        username={communityDetails.username}
        image={communityDetails.image}
        bio={communityDetails.bio}
        type='Community'
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {communityTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value}>
                <Image src={tab.icon} alt={tab.label} height={24} width={24} />
                <p className='max-sm:hidden'>{tab.label}</p>
                {tab.label === 'Threads' && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {communityDetails?.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={'threads'} className='w-full text-light-1'>
            <ThreadsTab
              currentUserId={user?.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>

          <TabsContent value={'members'} className='w-full text-light-1'>
            <section className='mt-9 flex flex-col gap-10'>
              {communityDetails?.members.map((member: any) => (
                <UserCard
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  username={member.username}
                  image={member.image}
                  personType='User'
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value='requests' className='w-full text-light-1'>
            {/* @ts-ignore */}
            <ThreadsTab
              currentUserId={user!.id}
              accountId={communityDetails._id}
              accountType='Community'
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
