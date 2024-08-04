import ThreadCard from '@/components/cards/ThreadCard';
import CommentForm from '@/components/forms/CommentForm';
import { fetchThreadById } from '@/lib/actions/thread.action';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Thread_Detail_Page({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return null;
  }

  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (userInfo && userInfo.on === false) return redirect('/onboarding');

  const thread = await fetchThreadById(params.id);

  return (
    <section className='relative'>
      <div>
        <ThreadCard
          key={thread._id.toString()}
          id={thread._id}
          currentUserId={user?.id || ''}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className='mt-7'>
        <CommentForm
          threadId={thread.id}
          currentUserImg={userInfo.image}
          currentUserId={userInfo._id.toString()}
        />
      </div>

      <div className='mt-10'>
        {thread?.children?.map((comment: any, i: number) => (
          <ThreadCard
            key={i.toString()}
            id={comment._id}
            currentUserId={user?.id || ''}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
}
