'use client';

import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Input from '@/components/Common/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useFormik } from 'formik';
import { LoginFormSchema } from '@/yupSchemas/LoginForm';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginFormSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          await signIn(values.email, values.password);
          router.push('/');
        } finally {
          setLoading(false);
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-5 w-full px-3"
    >
      <Heading title="Welcome Back" subtitle="Login to your Account!" center />
      <Input
        id="email"
        name="email"
        label="Email Address"
        disabled={loading}
        value={values.email}
        error={errors.email && touched.email}
        errorText={errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Input
        id="password"
        name="password"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        disabled={loading}
        value={values.password}
        error={errors.password && touched.password}
        errorText={errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
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
