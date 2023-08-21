'use client';

import Button from '@/components/Common/Button';
import Heading from '@/components/Common/Heading';
import Input from '@/components/Common/Input';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { useFormik } from 'formik';
import { RegisterFormSchema } from '@/yupSchemas/RegisterForm';
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: RegisterFormSchema,
      onSubmit: async (values, action) => {
        setLoading(true);
        try {
          const signInMethods = await fetchSignInMethodsForEmail(
            auth,
            values.email
          );
          if (signInMethods.length > 0) {
            // toast({
            //   title: 'Email already exists.',
            //   description: 'Email already exists. Please use a different email.',
            //   variant: 'destructive',
            // });
            setLoading(false);
            return;
          }
          await signUp(
            values.firstName,
            values.lastName,
            values.email,
            values.password
          );
          router.push('/');
        } finally {
          setLoading(false);
        }
      },
    });

  if (user) {
    router.push('/');
    return null;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-5 w-full px-3"
    >
      <Heading
        title="Create a free account"
        subtitle="Login to your Account!"
        center
      />
      <div className="grid grid-cols-2 gap-3">
        {' '}
        <Input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          label="First Name"
          value={values.firstName}
          error={errors.firstName && touched.firstName}
          errorText={errors.firstName}
          onBlur={handleBlur}
          onChange={handleChange}
        />{' '}
        <Input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="lastName"
          label="Last Name"
          value={values.lastName}
          error={errors.lastName && touched.lastName}
          errorText={errors.lastName}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </div>
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email Address"
        label="Email Address"
        value={values.email}
        error={errors.email && touched.email}
        errorText={errors.email}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <Input
        id="password"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={values.password}
        placeholder="Password"
        label="Password"
        error={errors.password && touched.password}
        errorText={errors.password}
        onBlur={handleBlur}
        onChange={handleChange}
        disabled={loading}
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
