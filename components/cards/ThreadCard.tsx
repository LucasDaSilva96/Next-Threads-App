import { fetchCommunity } from '@/lib/actions/community.action';
import { formatDateString } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ThreadCardProps {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  createdAt: Date | string;
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

export default async function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: ThreadCardProps) {
  return (
    <article
      className={`flex w-full flex-col rounded-xl ${
        isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'
      }`}
    >
      <div className='flex items-start justify-between'>
        <div className='flex w-full flex-1 gap-4'>
          <div className='flex flex-col items-center'>
            <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
              <Image
                fill
                src={author.image}
                alt='Profile image'
                className='cursor-pointer rounded-full object-cover'
              />
            </Link>
            <div className='thread-card_bar' />
          </div>

          <div className='flex w-full flex-col'>
            <Link href={`/profile/${author.id}`} className='w-fit'>
              <h4 className='cursor-pointer text-base-semibold text-light-1'>
                {author.name}
              </h4>
            </Link>
            <p className='mt-2 text-small-regular text-light-2'>{content}</p>

            <div className={`${isComment && 'mb-5'} mt-5 flex-col gap-3`}>
              <div className='flex gap-3.5'>
                <Image
                  src={'/assets/heart-gray.svg'}
                  alt='heart'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />

                <Link href={`/thread/${id}`}>
                  <Image
                    src={'/assets/reply.svg'}
                    alt='replay'
                    width={24}
                    height={24}
                    className='cursor-pointer object-contain'
                  />
                </Link>

                <Image
                  src={'/assets/repost.svg'}
                  alt='repost'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />

                <Image
                  src={'/assets/share.svg'}
                  alt='share'
                  width={24}
                  height={24}
                  className='cursor-pointer object-contain'
                />
              </div>

              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className='mt-1 text-subtle-medium text-gray-1'>
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* TODO: Delete thread */}
        {/* TODO: Show comment logos */}
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className='mt-5 flex items-center'
        >
          <p className='text-subtle-medium text-gray-1'>
            {formatDateString(createdAt as string)} - {community.name} Community
          </p>
          <Image
            src={community.image || '/assets/community.svg'}
            alt={community.name || 'Community image'}
            width={14}
            height={14}
            className='ml-1 rounded-full object-cover'
          />
        </Link>
      )}
    </article>
  );
}
