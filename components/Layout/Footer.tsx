import React from 'react';

type Props = {};

function Footer({}: Props) {
  return (
    <div className="w-full flex items-center justify-center py-10 text-sm">
      <p>{new Date().getFullYear()} - Created with ❤️ from Accra, Ghana 🇬🇭</p>
    </div>
  );
}

export default Footer;
