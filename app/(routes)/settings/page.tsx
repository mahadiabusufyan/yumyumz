'use client';

import BigLoader from '@/components/Common/BigLoader';
import Button from '@/components/Common/Button';
import Input from '@/components/Common/Input';
import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import useAuth from '@/hooks/useAuth';
import useUpdateUser from '@/hooks/useUpdateUser';
import { db } from '@/lib/firebase';
import { SettingsFormSchema } from '@/yupSchemas/SettingsFormSchema';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useFormik } from 'formik';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BsPen } from 'react-icons/bs';

export type User = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  photoFile?: File | null;
  userId?: string;
};

const SettingsPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const { updateUser } = useUpdateUser();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: '',
  });

  console.log(user?.uid);
  console.log(userData);
  useEffect(() => {
    const usersRef = collection(db, 'users');
    const queryRef = query(usersRef, where('email', '==', user?.email));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        setUserData(userData);
      }
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  useEffect(() => {
    if (userData) {
      setValues({
        firstName: userData?.firstName || '',
        lastName: userData?.lastName || '',
        email: userData?.email || '',
        phoneNumber: userData?.phoneNumber || '',
        userId: userData?.userId || '',
      });
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  const {
    values,
    touched,
    errors,
    setValues,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      phoneNumber: userData?.phoneNumber || '',
      userId: userData?.userId || '',
    },
    enableReinitialize: true,
    validationSchema: SettingsFormSchema,
    onSubmit: async (values, action) => {
      setLoading(true);
      try {
        await updateUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phoneNumber: values.phoneNumber,
          photoFile: photoFile,
          userId: values.userId,
        });
      } catch (error) {
        // console.error('', error);
      }
      setLoading(false);
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPhotoFile(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <Header />
      {loading ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <BigLoader />
        </div>
      ) : (
        <div className="bg-white rounded-md container px-3 lg:px-0">
          <h1 className="text-xl font-extrabold truncate py-3 text-[#013737]">
            Edit details
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start gap-5 w-full"
          >
            <div className="flex flex-col items-start justify-start py-2 relative">
              {photoURL ? (
                <Image
                  src={photoURL}
                  width={1000}
                  height={1000}
                  alt="Selected Photo"
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
              ) : user?.photoURL ? (
                <Image
                  src={user.photoURL || '/assets/img/user.jpg'}
                  width={1000}
                  height={1000}
                  alt="Selected Photo"
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
              ) : (
                <Image
                  width={1000}
                  height={1000}
                  alt="User Picture"
                  src={'/assets/img/user.jpg'}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
              )}
              <label
                htmlFor="photo"
                className="rounded p-1 text-sm cursor-pointer hover:shadow bg-white text-black absolute top-2 left-16 transform hover:scale-105 transition-all duration-300 border"
              >
                <input
                  id="photo"
                  name="photo"
                  className="hidden"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                <BsPen size={15} />
              </label>
            </div>

            <div className="relative w-full flex items-center space-x-2">
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
              />
              <Input
                id="lastName"
                type="text"
                placeholder="Last Name"
                name="lastName"
                label="Last Name"
                value={values.lastName}
                error={errors.lastName && touched.lastName}
                errorText={errors.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>

            <Input
              name="email"
              value={values.email}
              placeholder="Email Address"
              onBlur={handleBlur}
              disabled
              onChange={handleChange}
              label="Email"
              type={'email'}
              id={'email'}
            />

            <Input
              name="phoneNumber"
              value={values.phoneNumber}
              onBlur={handleBlur}
              placeholder="Phone Number"
              onChange={handleChange}
              label="Phone Number"
              type={'tel'}
              id="phoneNumber"
            />

            <Button loading={loading} disabled={loading} label={'Save '} />
          </form>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SettingsPage;
