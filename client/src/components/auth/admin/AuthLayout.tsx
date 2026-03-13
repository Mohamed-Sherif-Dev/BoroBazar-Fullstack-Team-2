import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
  activePage?: "login" | "register";
}

const AdminAuthLayout = ({ children, activePage }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[url('/auth-bg.png')] bg-no-repeat bg-cover bg-center opacity-10" />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full px-4 sm:px-6 py-3 flex items-center justify-between">
          <img
            src="/Logo.png"
            alt="BoroBazar Logo"
            className="w-32 sm:w-44 md:w-60 h-8 sm:h-10 object-contain"
          />

          {activePage && (
            <div className="flex items-center rounded-lg border border-gray-200 overflow-hidden">
              <button
                onClick={() => navigate("/admin/login")}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  activePage === "login"
                    ? "bg-[#F5F5F5] text-gray-900"
                    : "bg-white text-gray-400"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin/register")}
                className={`px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium transition-colors ${
                  activePage === "register"
                    ? "bg-[#F5F5F5] text-gray-900"
                    : "bg-white text-gray-400"
                }`}
              >
                Register
              </button>
            </div>
          )}
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-10">
          <div className="w-full max-w-md">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminAuthLayout;