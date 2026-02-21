"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Mail, Bug } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export function AuthModal() {
  const { showAuthModal, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    const host = window.location.hostname;
    setIsLocalhost(host === "localhost" || host === "127.0.0.1");
  }, []);

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-[420px] max-w-[90vw] bg-[var(--bg-card)] rounded-[20px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Content */}
        <div className="px-[32px] pt-[32px] pb-[28px] flex flex-col items-center">
          {/* Logo */}
          <div className="mb-[20px]">
            <div className="w-[48px] h-[48px] rounded-[12px] bg-[var(--accent-green)]/15 flex items-center justify-center">
              <Image
                src="/logo-icon.png"
                alt="PlayPickoff"
                width={28}
                height={28}
                className="rounded"
              />
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-[family-name:var(--font-display)] font-bold text-[22px] tracking-[-0.5px] text-[var(--text-primary)] mb-[6px]">
            Welcome to PlayPickoff
          </h1>
          <p className="text-[13.5px] text-[var(--text-subtle)] mb-[24px]">
            Use your <span className="font-semibold text-[var(--text-primary)]">email</span> to sign in or create an account
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[14px]">
            {/* Email field */}
            <div className="flex flex-col gap-[6px]">
              <label className="text-[12px] font-medium text-[var(--text-primary)] tracking-[-0.2px]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type your email..."
                className="w-full h-[42px] px-[14px] bg-[var(--bg-card-header)] border border-[var(--bg-divider)] rounded-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-[var(--accent-green)] transition-colors"
              />
            </div>

            {/* Password field */}
            {mode === "login" && (
              <div className="flex flex-col gap-[6px]">
                <label className="text-[12px] font-medium text-[var(--text-primary)] tracking-[-0.2px]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type your password..."
                  className="w-full h-[42px] px-[14px] bg-[var(--bg-card-header)] border border-[var(--bg-divider)] rounded-[10px] text-[13.5px] text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] outline-none focus:border-[var(--accent-green)] transition-colors"
                />
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full h-[42px] bg-[var(--accent-green)] hover:bg-[var(--accent-green-hover)] rounded-[10px] flex items-center justify-center gap-[8px] transition-colors mt-[2px]"
            >
              <Mail size={15} className="text-white" />
              <span className="font-semibold text-[13.5px] tracking-[-0.3px] text-white">
                Continue with email
              </span>
            </button>

            {/* Forgot password */}
            {mode === "login" && (
              <button
                type="button"
                className="text-[13px] font-medium text-[var(--text-primary)] underline underline-offset-2 decoration-[var(--text-disabled)] hover:decoration-[var(--text-primary)] transition-colors"
              >
                Forgot password?
              </button>
            )}
          </form>

          {/* Divider */}
          <div className="w-full flex items-center gap-[12px] my-[18px]">
            <div className="flex-1 h-px bg-[var(--bg-divider)]" />
            <span className="text-[12px] text-[var(--text-disabled)]">or</span>
            <div className="flex-1 h-px bg-[var(--bg-divider)]" />
          </div>

          {/* Social buttons */}
          <div className="w-full flex flex-col gap-[10px]">
            <button
              onClick={login}
              className="w-full h-[42px] bg-[var(--bg-card-header)] border border-[var(--bg-divider)] rounded-[10px] flex items-center justify-center gap-[10px] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4" />
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853" />
                <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05" />
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335" />
              </svg>
              <span className="font-medium text-[13.5px] tracking-[-0.3px] text-[var(--text-primary)]">
                Continue with Google
              </span>
            </button>

            <button
              onClick={login}
              className="w-full h-[42px] bg-[var(--bg-card-header)] border border-[var(--bg-divider)] rounded-[10px] flex items-center justify-center gap-[10px] hover:bg-[var(--bg-hover)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.24 4.244a4.67 4.67 0 0 1-1.34.367 2.34 2.34 0 0 0 1.027-1.29 4.68 4.68 0 0 1-1.482.566A2.336 2.336 0 0 0 9.31 5.756a6.625 6.625 0 0 1-4.81-2.44 2.336 2.336 0 0 0 .722 3.116 2.32 2.32 0 0 1-1.058-.292v.03a2.335 2.335 0 0 0 1.872 2.288 2.34 2.34 0 0 1-1.054.04 2.337 2.337 0 0 0 2.18 1.62A4.685 4.685 0 0 1 3.6 11.61a6.6 6.6 0 0 0 3.575 1.048c4.29 0 6.635-3.554 6.635-6.635 0-.101-.002-.202-.007-.302A4.74 4.74 0 0 0 15.24 4.244Z" fill="var(--text-primary)"/>
              </svg>
              <span className="font-medium text-[13.5px] tracking-[-0.3px] text-[var(--text-primary)]">
                Continue with X
              </span>
            </button>
          </div>

          {/* Toggle mode */}
          <p className="text-[12.5px] text-[var(--text-disabled)] mt-[18px]">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="font-semibold text-[var(--accent-green)] hover:text-[var(--accent-green-hover)] transition-colors"
            >
              {mode === "login" ? "Sign up" : "Sign in"}
            </button>
          </p>

          {/* Terms */}
          <p className="text-[11px] text-[var(--text-disabled)] text-center mt-[12px] leading-[16px]">
            By signing up you understand and agree with our{" "}
            <span className="underline underline-offset-2 cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="underline underline-offset-2 cursor-pointer">Privacy Policy</span>
          </p>

          {/* Debug bypass - localhost only */}
          {isLocalhost && (
            <button
              onClick={login}
              className="mt-[16px] flex items-center gap-[6px] px-[12px] py-[6px] rounded-[8px] border border-dashed border-[var(--accent-yellow)]/40 hover:bg-[var(--accent-yellow)]/10 transition-colors"
            >
              <Bug size={13} className="text-[var(--accent-yellow)]" />
              <span className="text-[11px] font-medium text-[var(--accent-yellow)]">
                Skip Auth (Debug)
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
