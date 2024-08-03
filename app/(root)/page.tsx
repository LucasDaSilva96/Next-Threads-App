import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/thread.action';
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

  const result = await fetchPosts(1, 30);

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>
      <section className='mt-9 flex flex-col gap-10'>
        {result.posts.length === 0 && (
          <p className='no-result'>No Threads found</p>
        )}

        <>
          {result.posts.map((post, i) => (
            <ThreadCard
              key={i.toString()}
              id={post._id}
              currentUserId={user?.id || ''}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.communityId}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
        </>
      </section>
    </>
  );
}
