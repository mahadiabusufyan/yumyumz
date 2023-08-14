import Logo from '@/components/Common/Logo';
import React from 'react';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-screen bg-white flex items-center justify-center">
      <div className="w-full sm:w-[475px] px-5 bg-white h-full md:h-[70vh] rounded-lg flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 w-full px-3">
          <Logo />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
