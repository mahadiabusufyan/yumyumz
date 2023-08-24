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
      className="rounded-full object-cover border max-h-10 max-w-10 h-10 w-10"
      height={500}
      width={500}
      alt="User Picture"
      src={src || '/assets/img/user.jpg'}
    />
  );
};

export default UserPicture;
