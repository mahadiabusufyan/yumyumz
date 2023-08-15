'use client';

import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Input from '@/components/Common/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      router.push('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-5 w-full px-3"
    >
      <Heading title="Welcome Back" subtitle="Login to your Account!" center />
      <Input
        id="email"
        label="Email Address"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        disabled={loading}
        register={register}
        errors={errors}
        required
      >
        {showPassword ? (
          <AiFillEyeInvisible
            size={27}
            className="absolute right-3 top-5  cursor-pointer text-gray-400 hover:text-[#de79fb] transition duration-300"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        ) : (
          <AiFillEye
            size={27}
            className="absolute right-3 top-5  cursor-pointer text-gray-400 hover:text-[#de79fb] transition duration-300"
            onClick={() => setShowPassword((prevState) => !prevState)}
          />
        )}
      </Input>
      <Button disabled={loading} loading={loading} full label="Sign in" />
      <div
        className="
      text-neutral-500 text-center mt-4 font-medium"
      >
        <p>
          New here?{' '}
          <span
            onClick={() => router.push('/auth/register')}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            Create an account
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
