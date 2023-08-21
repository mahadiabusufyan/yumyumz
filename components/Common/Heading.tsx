'use client';

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={`${center ? 'text-center' : 'text-left'} md:text-start`}>
      <div className="text-lg lg:text-xl font-bold">{title}</div>
      <div className=" text-neutral-600 mt-0.5">{subtitle}</div>
    </div>
  );
};

export default Heading;
