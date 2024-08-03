'use server';

import { revalidatePath } from 'next/cache';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';
import Thread from '../models/thread.model';

interface Params {
  userId: string;
  username: string;
  name: string;
  image?: string;
  bio: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  image,
  bio,
  path,
}: Params): Promise<void> {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        image,
        bio,
        onboarded: true,
      },
      { upsert: true }
    );

    if (path === '/profile/edit') {
      revalidatePath(path);
    }
  } catch (error) {
    console.log(error);
    throw new Error('Error updating user ❌');
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDB();

    const user = await User.findOne({ id: userId });

    return user;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching user ❌');
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    await connectToDB();

    // TODO populate community

    const threads = await User.findOne({ id: userId }).populate({
      path: 'threads',
      model: Thread,
      populate: {
        path: 'children',
        model: Thread,
        populate: {
          path: 'author',
          model: User,
          select: 'name image id',
        },
      },
    });

    return threads;
  } catch (error: any) {
    console.log(error);
    throw new Error('❌', error.message);
  }
}
