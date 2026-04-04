import { useRef, useState } from "react";
import type { KeyboardEvent, ClipboardEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "../../../components/auth/customer/AuthLayout";
import { verifyOTP } from "../../../hooks/UseAuthApi";

const VerifyOTPPage = () => {
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
      setTimeout(() => navigate("/login"), 1500);
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
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
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
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleSubmit = () => {
    if (!isComplete) return;
    if (!email) { setServerError("Email not found. Please restart the flow."); return; }
    setServerError("");
    mutate({ email, otp });
  };

  return (
    <AuthLayout>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-7 shadow-lg">
        {/* Shield + checkmark icon */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
            <path d="M40 6L10 18v20c0 17.5 13 33 30 37.5C57 71 70 55.5 70 38V18L40 6z" fill="#29B6F6" />
            <path d="M40 6L10 18v20c0 17.5 13 33 30 37.5V6z" fill="#4FC3F7" />
            <path d="M28 40l9 9 16-16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Header */}
        <div className="mb-1 text-center">
          <h1 className="text-lg font-semibold text-gray-800">Verify OTP</h1>
        </div>
        <p className="text-center text-sm text-gray-500 mb-6">
          OTP send to{" "}
          <span className="text-CustomGreen font-medium">{email || "your email"}</span>
        </p>

        {/* 6-digit OTP inputs */}
        <div className="flex justify-center gap-2 mb-5">
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
              className="w-10 h-11 text-center text-base font-bold rounded-md border border-gray-200 focus:border-[#02B290] focus:ring-2 focus:ring-[#02B290]/10 outline-none transition bg-white text-gray-800"
            />
          ))}
        </div>

        {serverError && (
          <p className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            {serverError}
          </p>
        )}
        {serverSuccess && (
          <p className="text-xs text-CustomGreen bg-CustomGreen/5 border border-CustomGreen/20 rounded-lg px-3 py-2 mb-4">
            {serverSuccess}
          </p>
        )}

        <button
          type="button"
          disabled={isPending || !isComplete}
          onClick={handleSubmit}
          className="w-full bg-CustomGreen hover:bg-CustomGreenHover disabled:opacity-50 text-white font-semibold py-2.5 rounded-md transition text-sm tracking-wide"
        >
          {isPending ? "Verifying…" : "VERIFY OTP"}
        </button>
      </div>
    </AuthLayout>
  );
};

export default VerifyOTPPage;