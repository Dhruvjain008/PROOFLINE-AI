"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF7EF] flex flex-col items-center justify-center p-6 text-[#121E36]">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E5E8EF] p-8 shadow-sm text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-xl bg-red-50 text-[#C94C4C] flex items-center justify-center">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#121E36]">
          404 — Page Not Found
        </h1>
        <p className="text-xs text-[#69778F] leading-relaxed">
          The requested route is outside the active Proofline Brand Governance domain.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-[#121E36] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#1E2D4A] transition-all"
        >
          <ArrowLeft className="h-4 w-4 text-[#FFF1C1]" />
          <span>Return to Governance Studio</span>
        </Link>
      </div>
    </div>
  );
}
