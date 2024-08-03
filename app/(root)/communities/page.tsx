import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Communities_Page() {
  const user = auth();

  if (!user) return redirect('/sign-in');

  return (
    <section>
      <h1 className='head-text'>Communities</h1>
    </section>
  );
}
