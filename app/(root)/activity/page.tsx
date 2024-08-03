import { fetchUser, getActivity } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Activity_Page() {
  const user = await currentUser();

  if (!user) return redirect('/sign-in');

  const userInfo = await fetchUser(user!.id);

  if (!userInfo?.onboarded) return redirect('/onboarding');

  const activity = await getActivity(userInfo._id);

  return (
    <section>
      <h1 className='head-text'>Activity</h1>

      <section className='mt-10 flex flex-col gap-5'>
        {activity.length > 0 ? (
          <>
            {activity.map((act, i) => (
              <Link key={i} href={`/thread/${act.parentId}`}>
                <article className='activity-card'>
                  <Image
                    src={act.author.image}
                    alt='Profile Picture'
                    width={20}
                    height={20}
                    className='rounded-full object-cover'
                  />
                  <p className='!text-small-regular text-light-1'>
                    <span className='mr-1 text-primary-500'>
                      {act.author.name}
                    </span>
                    replied to your thread
                  </p>
                </article>
              </Link>
            ))}
          </>
        ) : (
          <p className='!text-base-regular text-light-3'>No activity yet</p>
        )}
      </section>
    </section>
  );
}
