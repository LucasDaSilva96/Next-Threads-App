import CommunityCard from '@/components/cards/CommunityCard';
import { fetchCommunities } from '@/lib/actions/community.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Communities_Page() {
  const user = await currentUser();

  const userInfo = await fetchUser(user!.id);

  if (!userInfo?.onboarded) return redirect('/onboarding');

  const result = await fetchCommunities({});

  return (
    <section>
      <h1 className='head-text'>Search</h1>

      {/* Search Bar */}

      <div className='mt-14 flex flex-col gap-9'>
        {result?.communities.length === 0 ? (
          <p className='no-result'>No communities found</p>
        ) : (
          <>
            {result?.communities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
