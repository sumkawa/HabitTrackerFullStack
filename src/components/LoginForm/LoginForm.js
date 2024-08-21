'use client';
import React from 'react';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Disable redirect to handle it manually
    });

    if (result.ok) {
      // Redirect after successful login
      router.push('/dashboard');
    } else {
      // Handle login errors
      console.error('Login failed:', result.error);
    }
  };

  return (
    <form onSubmit={handleLogin} className='space-y-3'>
      <div className='flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8'>
        <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className='w-full'>
          <div>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='email'
            >
              Email
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='email'
                type='email'
                name='email'
                placeholder='Enter your email address'
                required
              />
            </div>
          </div>
          <div className='mt-4'>
            <label
              className='mb-3 mt-5 block text-xs font-medium text-gray-900'
              htmlFor='password'
            >
              Password
            </label>
            <div className='relative'>
              <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                id='password'
                type='password'
                name='password'
                placeholder='Enter password'
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <button className='mt-4 w-full' aria-disabled={isPending}>
          Log in
        </button>
        <div>
          {status === 'loading' ? (
            <p>Loading session...</p>
          ) : !session ? (
            <p>YOU AREN'T LOGGED IN</p>
          ) : (
            <p>logged in :)</p>
          )}
        </div>
        <div
          className='flex h-8 items-end space-x-1'
          aria-live='polite'
          aria-atomic='true'
        >
          {errorMessage && (
            <>
              <p className='text-sm text-red-500'>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
