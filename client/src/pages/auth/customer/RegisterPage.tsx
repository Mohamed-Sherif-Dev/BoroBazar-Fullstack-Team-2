import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../../components/auth/customer/AuthLayout";
import InputField from "../../../components/auth/customer/InputField";
import { registerSchema, type RegisterSchema } from "../../../lib/Validations";
import { registerUser } from "../../../hooks/UseAuthApi";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { rememberMe: false },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (res) => {
      sessionStorage.setItem("pendingVerifyEmail", res.data.email);
      navigate("/verify", { state: { email: res.data.email } });
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message || "Registration failed. Please try again.";
      setServerError(msg);
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    setServerError("");
    mutate({ name: values.name, email: values.email, password: values.password });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7 shadow-lg">
        {/* Header */}
        <div className="mb-5 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Register with a new account</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
          <InputField
            type="text"
            placeholder="Full Name"
            error={errors.name?.message}
            {...register("name")}
          />
          <InputField
            type="email"
            placeholder="Email Id"
            error={errors.email?.message}
            {...register("email")}
          />
          <InputField
            showPasswordToggle
            placeholder="Password"
            error={errors.password?.message}
            {...register("password")}
          />

          {serverError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition text-sm tracking-wide mt-1"
          >
            {isPending ? "Creating account…" : "REGISTER"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-CustomGreen font-semibold hover:underline">
            Login
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">Or continue with social account</p>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-md py-2 text-xs text-gray-600 hover:bg-gray-50 transition mt-3"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.2 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/>
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4c-7.7 0-14.4 4.4-17.7 10.7z"/>
            <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5.1L31 33.4C29.1 34.7 26.6 35.5 24 35.5c-5.3 0-9.7-3.3-11.3-8l-6.5 5c3.2 6.5 9.9 11 18 10.5h-.2z"/>
            <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.6 4.6-4.8 6l6.4 5.5C40.9 35.8 44 30.3 44 24c0-1.3-.1-2.7-.4-4z"/>
          </svg>
          SIGN UP WITH GOOGLE
        </button>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;