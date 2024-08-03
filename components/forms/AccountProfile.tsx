'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserValidation } from '@/lib/validations/user';
import * as z from 'zod';
import Image from 'next/image';
import { isBase64Image } from '@/lib/utils';
import { useUploadThing } from '@/lib/uploadThing';
import { updateUser } from '@/lib/actions/user.actions';
import { usePathname, useRouter } from 'next/navigation';

interface AccountProfileProps {
  user: {
    id: string;
    username: string;
    name: string;
    bio: string;
    image?: string;
  };
  btnTitle: string;
}

export default function AccountProfile({
  user,
  btnTitle,
}: AccountProfileProps) {
  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image,
      username: user?.username || ' ',
      name: user?.name || ' ',
      bio: user?.bio || ' ',
    },
  });

  const { startUpload } = useUploadThing('media');

  const router = useRouter();
  const pathName = usePathname();

  const [file, setFile] = React.useState<File[]>([]);

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();
    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFile(Array.from(e.target.files));

      if (!file.type.includes('image')) return;

      fileReader.onload = async (e) => {
        const imageDataUrl = e.target?.result?.toString() || '';

        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob || '');

    if (hasImageChanged) {
      const imgRes = await startUpload(file);

      if (imgRes && imgRes[0]?.url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await updateUser({
      userId: user.id,
      username: values.username,
      name: values.name,
      image: values.profile_photo!,
      bio: values.bio,
      path: pathName,
    });

    if (pathName === '/profile/edit') {
      router.back();
    } else {
      router.push('/');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col justify-start gap-6'
      >
        <FormField
          control={form.control}
          name='profile_photo'
          render={({ field }) => (
            <FormItem className='flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {field.value ? (
                  <Image
                    src={field.value}
                    alt='profile photo'
                    height={96}
                    width={96}
                    priority
                    className='rounded-full object-contain'
                  />
                ) : (
                  <Image
                    src='/assets/profile.svg'
                    alt='profile photo'
                    height={24}
                    width={24}
                    className='object-contain'
                  />
                )}
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input
                  type='file'
                  accept='image/*'
                  placeholder='Upload a photo'
                  className='account-form_image-input'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/*  */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className='flex-1 text-base font-semibold text-gray-200'>
                <Input
                  type='text'
                  autoComplete='name'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  */}
        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                User name
              </FormLabel>
              <FormControl className='flex-1 text-base font-semibold text-gray-200'>
                <Input
                  type='text'
                  autoComplete='username'
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*  */}
        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem className='flex flex-col gap-2 w-full'>
              <FormLabel className='text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className='flex-1 text-base font-semibold text-gray-200'>
                <Textarea
                  rows={8}
                  className='account-form_input no-focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='bg-primary-500 transition-transform will-change-transform ease-linear hover:scale-[1.01] hover:text-white duration-300'
        >
          {btnTitle}
        </Button>
      </form>
    </Form>
  );
}
