'use client';

import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Input from '@/components/Common/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

type Props = {};

const RegisterPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);
    try {
      console.log(data);
      await signUp(data.name, data.email, data.password);
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    router.push('/');
    return null;
  }

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
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
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
        disabled={loading}
        register={register}
        errors={errors}
        required
      >
        {' '}
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

      <Button
        loading={loading}
        disabled={loading}
        full
        label="Create account"
      />
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
