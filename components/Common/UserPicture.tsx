'use client';

import React from 'react';
import Image from 'next/image';

type UserPictureProps = {
  className?: string;
  src: string | null | undefined;
};

const UserPicture: React.FC<UserPictureProps> = ({ className, src }) => {
  return (
    <Image
      className="rounded-full object-cover border"
      height="40"
      width="40"
      alt="User Picture"
      src={src || '/assets/img/user.jpg'}
    />
  );
};

export default UserPicture;
