'use server';

import { revalidatePath } from 'next/cache';
import Thread from '../models/thread.model';
import User from '../models/user.model';
import { connectToDB } from '../mongoose';

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  author,
  communityId,
  path,
  text,
}: Params) {
  try {
    await connectToDB();

    const thread = await Thread.create({
      text,
      author,
      communityId: communityId || null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: thread._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Error creating thread ❌');
  }
}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
  try {
    await connectToDB();

    // Calculate the skip value depending on the page number
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fetch post that have no parents (Top level posts)
    const postQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({
        createdAt: 'desc',
      })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: 'User' })
      .populate({
        path: 'children',
        populate: {
          path: 'author',
          model: 'User',
          select: '_id name parentId image',
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return {
      posts,
      isNext,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching posts ❌');
  }
}

export async function fetchThreadById(threadId: string) {
  try {
    await connectToDB();

    // TODO populate community
    const thread = await Thread.findById(threadId)
      .populate({ path: 'author', model: User, select: '_id id name image' })
      .populate({
        path: 'children',
        populate: [
          {
            path: 'author',
            model: User,
            select: '_id id name parentId image',
          },
          {
            path: 'children',
            model: Thread,
            populate: {
              path: 'author',
              model: User,
              select: '_id id name parentId image',
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (error: any) {
    console.log(error);
    throw new Error('❌ ', error.message);
  }
}

export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    await connectToDB();

    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error('Thread not found');
    }

    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId,
    });

    const savedCommentThread = await commentThread.save();

    originalThread.children.push(savedCommentThread._id);

    await originalThread.save();
    revalidatePath(path);
  } catch (error: any) {
    console.log(error);
    throw new Error('❌', error.message);
  }
}
