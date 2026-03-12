import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AdminAuthLayout from "../../../components/auth/admin/AuthLayout";
import AdminInputField from "../../../components/auth/admin/InputField";
import { loginSchema, type LoginSchema } from "../../../lib/Validations";
import { loginUser } from "../../../hooks/UseAuthApi";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const storage =
        localStorage.getItem("rememberMe") === "true"
          ? localStorage
          : sessionStorage;
      storage.setItem("token", data.token);
      navigate("/admin");
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Invalid email or password.";
      setServerError(msg);
    },
  });

  const onSubmit = (values: LoginSchema) => {
    setServerError("");
    if (values.rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
    mutate({ email: values.email, password: values.password });
  };

  return (
    <AdminAuthLayout activePage="login">
      <div className="w-full">
        {/* Header */}
        <div className="mb-5 sm:mb-6 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
            Welcome Back!
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Sign in with your credentials.
          </p>
        </div>

        {/* Google button */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 sm:py-2.5 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition mb-4 sm:mb-5"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.2 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1L31 33.4C29.1 34.7 26.6 35.5 24 35.5c-5.3 0-9.7-3.3-11.3-8l-6.5 5c3.2 6.5 9.9 11 18 10.5h-.2z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.4 5.5C40.9 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          Sign in with Google
        </button>

        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:gap-4" noValidate>
          <AdminInputField
            label="Email"
            type="email"
            placeholder="demo@email.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <AdminInputField
            label="Password"
            showPasswordToggle
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between text-xs sm:text-sm flex-wrap gap-2">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input
                type="checkbox"
                className="accent-Customgreen w-4 h-4"
                {...register("rememberMe")}
              />
              Remember me
            </label>
            <Link to="/admin/forgot-password" className="text-CustomGreen hover:underline font-medium">
              Forgot Password?
            </Link>
          </div>

          {serverError && (
            <p className="text-xs sm:text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition text-sm mt-1"
          >
            {isPending ? "Signing in…" : "SIGN IN"}
          </button>
        </form>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-5">
          Don't have an account?{" "}
          <Link to="/admin/register" className="text-CustomGreen font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </AdminAuthLayout>
  );
};

export default AdminLoginPage;