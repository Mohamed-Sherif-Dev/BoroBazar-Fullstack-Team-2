import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../../components/auth/customer/AuthLayout";
import InputField from "../../../components/auth/customer/InputField";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../../../lib/Validations";
import { forgotPassword } from "../../../hooks/UseAuthApi";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      setSuccessMsg("OTP sent! Check your inbox.");
      setTimeout(() => {
        navigate("/verify", { state: { email: getValues("email") } });
      }, 1500);
    },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(msg);
    },
  });

  const onSubmit = (values: ForgotPasswordSchema) => {
    setServerError("");
    setSuccessMsg("");
    mutate(values);
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7 shadow-lg">
        {/* Padlock + question mark icon */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <rect x="12" y="36" width="44" height="32" rx="5" fill="#FFA726" />
            <rect x="12" y="36" width="44" height="17" rx="5" fill="#FB8C00" />
            <path d="M22 36V26a12 12 0 0124 0v10" stroke="#FB8C00" strokeWidth="5" strokeLinecap="round" fill="none"/>
            <circle cx="34" cy="52" r="6" fill="white" />
            <circle cx="56" cy="22" r="14" fill="#29B6F6" />
            <text x="56" y="27" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" fontFamily="sans-serif">?</text>
          </svg>
        </div>

        {/* Header */}
        <div className="mb-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Forgot Password</h1>
        </div>
        <p className="text-center text-xs text-gray-500 mb-5 leading-relaxed">
          Enter your registered email address and we'll send you a One-Time Password (OTP) to reset your password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3" noValidate>
          <InputField
            type="email"
            placeholder="Email Id"
            error={errors.email?.message}
            {...register("email")}
          />

          {serverError && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}
          {successMsg && (
            <p className="text-xs text-CustomGreen bg-CustomGreen/5 border border-[#02B290]/20 rounded-lg px-3 py-2">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-60 text-white font-semibold py-2.5 rounded-md transition text-sm tracking-wide mt-1"
          >
            {isPending ? "Sending…" : "SUBMIT"}
          </button>
        </form>

        <p className="text-center mt-4">
          <Link to="/login" className="text-xs text-gray-500 hover:text-CustomGreen transition-colors">
            ← Back to login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;