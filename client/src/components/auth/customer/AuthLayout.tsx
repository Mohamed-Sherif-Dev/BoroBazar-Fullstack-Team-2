import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-CustomGreyBg">
      {/* Decorative circles left */}
      <div className="absolute top-1/2  -translate-x-1/2 -left-10 w-72 h-72 rounded-full   opacity-10 pointer-events-none bg-CustomGreen" />
      {/* <div className="absolute top-1/2 -translate-y-1/2 left-10 w-44 h-44 rounded-full border-[35px] border-[#C8E6E0] opacity-50 pointer-events-none" /> */}

      {/* Decorative circles right */}
      <div className="absolute  top-1/3 -translate-y-1/2 translate-x-1/2 -right-10 w-72 h-72 rounded-full  opacity-10 pointer-events-none bg-CustomGreen" />
      {/* <div className="absolute top-1/2 -translate-y-1/2 right-10 w-44 h-44 rounded-full border-[35px] border-[#C8E6E0] opacity-50 pointer-events-none" /> */}

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;