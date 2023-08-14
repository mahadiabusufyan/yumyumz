'use client';

import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Input from '@/components/Common/Input';
import Logo from '@/components/Common/Logo';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

type Props = {};

const RegisterPage = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    console.log(data);
    await signUp(data.name, data.email, data.password);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-5 w-full px-3"
    >
      <Heading
        title="Create a free account"
        subtitle="Login to your Account!"
        center
      />
      <Input
        id="name"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email Address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <button type="submit">Submit</button>
      <Button full label="Create account" />
      <div
        className="
      text-neutral-500 text-center mt-4 font-medium"
      >
        <p>
          Already have an account?{' '}
          <span
            onClick={() => router.push('/auth/login')}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Login
          </span>
        </p>
      </div>
    </form>
  );
};

export default RegisterPage;
