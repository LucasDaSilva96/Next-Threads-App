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
import { Textarea } from '@/components/ui/textarea';
import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.action';
import { useOrganization } from '@clerk/nextjs';

export default function PostThread({ userId }: { userId: string }) {
  const form = useForm({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: '',
      accountId: userId,
    },
  });

  const pathname = usePathname();

  const { organization } = useOrganization();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof ThreadValidation>) => {
    console.log(organization);
    try {
      await createThread({
        text: data.thread,
        author: userId,
        communityId: organization ? organization.id : null,
        path: pathname,
      });

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-10 flex flex-col justify-start gap-6'
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Thread
              </FormLabel>
              <FormControl className='no-focus boder border-dark-4 bg-dark-3 text-slate-50'>
                <Textarea rows={10} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='bg-primary-500 transition-colors will-change-auto ease-linear hover:text-slate-50'
        >
          Post Thread
        </Button>
      </form>
    </Form>
  );
}
