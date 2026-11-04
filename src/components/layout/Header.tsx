"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  ChevronDown
} from "lucide-react";

interface HeaderProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onRoleChange: (role: 'Creator' | 'Brand Manager' | 'Legal Counsel') => void;
  onNewReviewClick: () => void;
}

export function Header({ currentRole, onRoleChange, onNewReviewClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E8EF] bg-white/95 backdrop-blur-sm px-4 md:px-6 shadow-sm">
      {/* Logo & Brand */}
      <div className="flex items-center gap-3">
        <div className="animate-slideInLeft flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#121E36] text-[#FFF1C1] shadow-md">
            <ShieldCheck className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-[#50BEB8] border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-[#121E36] text-sm md:text-base leading-none">
                Proofline
              </span>
              <span className="hidden md:inline rounded-md bg-[#EFF6FF] px-1.5 py-0.5 text-[10px] font-bold text-[#4C6EF5] border border-[#BFDBFE]">
                AI STUDIO
              </span>
            </div>
            <p className="text-[10px] font-medium text-[#69778F] leading-none mt-0.5 hidden md:block">
              Evidence-First Brand Governance
            </p>
          </div>
        </div>

        <div className="hidden md:flex h-6 w-px bg-[#E5E8EF] mx-1" />

        {/* Active Organization Chip */}
        <div className="hidden md:flex animate-fadeIn delay-200 anim-hidden items-center gap-2 rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] px-3 py-1.5">
          <span className="h-2 w-2 rounded-full bg-[#50BEB8] animate-pulseRing" />
          <span className="text-xs font-semibold text-[#121E36]">Northstar Financial</span>
          <span className="text-[10px] text-[#69778F] font-medium">v3.2 Policy Active</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Demo Mode Badge */}
        <div className="hidden md:flex items-center gap-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] px-2.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#D99019]" />
          <span className="text-[10px] font-bold text-[#B45309]">DEMO MODE — Seeded Sample Data</span>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2 rounded-lg border border-[#E5E8EF] bg-white px-2.5 py-1.5">
          <UserCheck className="h-3.5 w-3.5 text-[#50BEB8] shrink-0" />
          <span className="text-[11px] text-[#69778F] hidden sm:inline">Role:</span>
          <select 
            value={currentRole}
            onChange={(e) => onRoleChange(e.target.value as any)}
            className="text-xs font-semibold text-[#121E36] bg-transparent outline-none cursor-pointer pr-1"
          >
            <option value="Creator">Content Creator</option>
            <option value="Brand Manager">Brand Manager</option>
            <option value="Legal Counsel">Legal & Compliance</option>
          </select>
        </div>

        {/* Primary CTA */}
        <button
          onClick={onNewReviewClick}
          className="btn-scan flex items-center gap-2 rounded-xl bg-[#121E36] px-3 md:px-4 py-2 text-xs font-bold text-white shadow-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#FFF1C1]" />
          <span className="hidden sm:inline">New Pre-Flight Scan</span>
          <span className="sm:hidden">Scan</span>
        </button>
      </div>
    </header>
  );
}
