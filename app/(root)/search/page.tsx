import UserCard from '@/components/cards/UserCard';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Search_Page() {
  const user = await currentUser();

  const userInfo = await fetchUser(user!.id);

  if (!userInfo?.onboarded) return redirect('/onboarding');

  const result = await fetchUsers({
    userId: user!.id,
    searchString: '',
    pageNumber: 1,
    pageSize: 25,
    sortBy: 'desc',
  });

  return (
    <section>
      <h1 className='head-text'>Search</h1>

      {/* Search Bar */}

      <div className='mt-14 flex flex-col gap-9'>
        {result?.users.length === 0 ? (
          <p className='no-result'>No users found</p>
        ) : (
          <>
            {result?.users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                image={user.image}
                personType='User'
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
