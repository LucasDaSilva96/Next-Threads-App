import { fetchUserPosts } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import React from 'react';
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.action';

interface ThreadsTabProps {
  currentUserId?: string;
  accountId: string;
  accountType: string;
}

export default async function ThreadsTab({
  accountId,
  accountType,
  currentUserId,
}: ThreadsTabProps) {
  let results: any = null;

  if (accountType === 'User') {
    results = await fetchUserPosts(accountId);
  } else {
    results = await fetchCommunityPosts(accountId);
  }

  if (!results) redirect('/');

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {results.threads.map((thread: any, i: number) => (
        <ThreadCard
          key={i.toString()}
          id={thread._id}
          currentUserId={currentUserId!}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === 'User'
              ? { name: results.name, image: results.image, id: results.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={thread.communityId} // TODO
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
