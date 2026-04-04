import { useRef, useState } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AdminAuthLayout from "../../../components/auth/admin/AuthLayout";
import { verifyOTP } from "../../../hooks/UseAuthApi";

const AdminVerifyOTPPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email: string = (location.state as any)?.email || "";

  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const otp = digits.join("");
  const isComplete = otp.length === 6 && digits.every((d) => /^\d$/.test(d));

  const { mutate, isPending } = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => {
      setServerSuccess("Email verified successfully!");
      setTimeout(() => navigate("/admin/login"), 1500);
    },
    onError: (error: any) => {
      const msg = error?.response?.data?.message || "Invalid or expired OTP.";
      setServerError(msg);
    },
  });

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const updated = [...digits];
    updated[index] = value.slice(-1);
    setDigits(updated);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const updated = Array(6).fill("");
    pasted.split("").forEach((char, i) => (updated[i] = char));
    setDigits(updated);
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    if (!email) {
      setServerError("Email not found. Please restart the flow.");
      return;
    }
    setServerError("");
    mutate({ email, otp });
  };

  return (
    <AdminAuthLayout>
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-Customgreen flex items-center justify-center">
            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <path d="M40 6L10 18v20c0 17.5 13 33 30 37.5C57 71 70 55.5 70 38V18L40 6z" fill="#29B6F6" />
            <path d="M40 6L10 18v20c0 17.5 13 33 30 37.5V6z" fill="#4FC3F7" />
            <path d="M28 40l9 9 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          </div>
        </div>

        {/* Header */}
        <div className="mb-2 text-center">
          <h1 className="text-xl font-bold text-gray-900">Verify OTP</h1>
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          A 6-digit code was sent to{" "}
          <span className="text-teal-600 font-medium">{email || "your email"}</span>
        </p>

        {/* 6-digit OTP inputs */}
        <div className="flex justify-center gap-2 mb-6">
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="w-10 h-12 text-center text-lg font-bold rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
            />
          ))}
        </div>

        {serverError && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {serverError}
          </p>
        )}
        {serverSuccess && (
          <p className="text-sm text-CustomGreen bg-CustomGreen/10 border border-CustomGreen/20 rounded-lg px-3 py-2 mb-4">
            {serverSuccess}
          </p>
        )}

        <button
          type="button"
          disabled={isPending || !isComplete}
          onClick={handleSubmit}
          className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition text-sm"
        >
          {isPending ? "Verifying…" : "VERIFY OTP"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          Didn't receive a code?{" "}
          <button type="button" className="text-CustomGreen font-medium hover:underline">
            Resend
          </button>
        </p>
      </div>
    </AdminAuthLayout>
  );
};

export default AdminVerifyOTPPage;