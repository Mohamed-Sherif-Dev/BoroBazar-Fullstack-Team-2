import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AdminAuthLayout from "../../../components/auth/admin/AuthLayout";
import AdminInputField from "../../../components/auth/admin/InputField";
import { forgotPasswordSchema, type ForgotPasswordSchema } from "../../../lib/Validations";
import { forgotPassword } from "../../../hooks/UseAuthApi";

const AdminForgotPasswordPage = () => {
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
      setSuccessMsg("Reset link sent! Check your inbox.");
      setTimeout(() => {
        navigate("/admin/verify", { state: { email: getValues("email") } });
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
    <AdminAuthLayout>
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
            <img src="/Forget-pass.png" alt="Email Icon" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-gray-900">Forgot Password</h1>
          <p className="text-gray-500 text-sm mt-1 leading-relaxed">
            Enter your registered email address and we'll send you a One-Time Password (OTP) to reset your password.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
          <AdminInputField
            label="Email us"
            type="email"
            placeholder="demo@email.com"
            error={errors.email?.message}
            {...register("email")}
          />

          {serverError && (
            <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {serverError}
            </p>
          )}

          {successMsg && (
            <p className="text-sm text-teal-600 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition text-sm mt-1"
          >
            {isPending ? "Sending…" : "SUBMIT"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Remembered it?{" "}
          <Link to="/admin/login" className="text-CustomGreen font-semibold hover:underline">
            Back to Login
          </Link>
        </p>
      </div>
    </AdminAuthLayout>
  );
};

export default AdminForgotPasswordPage;