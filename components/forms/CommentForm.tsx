'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { CommentValidation } from '@/lib/validations/thread';
import { addCommentToThread, createThread } from '@/lib/actions/thread.action';
import { Input } from '../ui/input';
import Image from 'next/image';

interface CommentFormProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function CommentForm({
  currentUserId,
  currentUserImg,
  threadId,
}: CommentFormProps) {
  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: '',
    },
  });

  const pathname = usePathname();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof CommentValidation>) => {
    try {
      await addCommentToThread(threadId, data.thread, currentUserId, pathname);

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='comment-form'>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex items-center gap-2 w-full'>
              <FormLabel className='w-12 h-12 relative'>
                <Image
                  src={currentUserImg}
                  alt='Current user'
                  fill
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  {...field}
                  placeholder='Comment...'
                  className='text-slate-50'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
}
