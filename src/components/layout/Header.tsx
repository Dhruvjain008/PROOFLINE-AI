"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  UserCheck,
  BookOpen,
  X,
  Zap,
  CheckCircle2,
  Palette,
  Send,
  Eye
} from "lucide-react";

interface HeaderProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onRoleChange: (role: 'Creator' | 'Brand Manager' | 'Legal Counsel') => void;
  onNewReviewClick: () => void;
}

export function Header({ currentRole, onRoleChange, onNewReviewClick }: HeaderProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E5E8EF] bg-white/95 backdrop-blur-sm px-4 md:px-6 shadow-sm">
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#121E36] text-[#FFF1C1] shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#50BEB8] border-2 border-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-[#121E36] text-sm leading-none">
                  Proofline
                </span>
                <span className="rounded bg-[#EFF6FF] px-1 py-0.5 text-[9px] font-bold text-[#4C6EF5] border border-[#BFDBFE]">
                  STUDIO v2.5
                </span>
              </div>
              <p className="text-[9px] text-[#69778F] leading-none mt-0.5 hidden sm:block">
                Evidence-First Brand Governance
              </p>
            </div>
          </div>

          <div className="hidden lg:flex h-5 w-px bg-[#E5E8EF] mx-1" />

          {/* Active Policy Pill */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] px-2.5 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#50BEB8] animate-pulse" />
            <span className="font-semibold text-[#121E36]">Northstar Financial</span>
            <span className="text-[10px] text-[#69778F]">(SEC v3.2 Active)</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Step-by-Step Evaluator Guide Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] px-2.5 py-1.5 text-[11px] font-bold text-[#92400E] shadow-sm transition-all"
            title="Open step-by-step evaluation guide"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#D99019]" />
            <span>How to Use / Guide</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D99019] animate-pulse" />
          </button>

          {/* Role Selector */}
          <div className="flex items-center gap-1.5 rounded-lg border border-[#E5E8EF] bg-white px-2 py-1 text-xs">
            <UserCheck className="h-3.5 w-3.5 text-[#50BEB8] shrink-0" />
            <span className="text-[10px] text-[#69778F] hidden sm:inline">Role:</span>
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
            className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#121E36] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFF1C1]" />
            <span>New Pre-Flight Scan</span>
          </button>
        </div>
      </header>

      {/* ─── Step-by-Step Judge / Evaluator Walkthrough Modal ─── */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E8EF] max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E8EF] pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#4C6EF5]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#121E36]">
                    Proofline AI — Evaluator Quick-Start Guide
                  </h3>
                  <p className="text-[11px] text-[#69778F]">
                    Follow this 60-second end-to-end walkthrough to test all core capabilities
                  </p>
                </div>
              </div>
              <button
                onClick={() => setGuideOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Step-by-Step Cards */}
            <div className="space-y-2.5 text-xs">
              
              <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-[#121E36] text-[#FFF1C1] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-[#121E36] block mb-0.5">Choose a Campaign Preset or Enter Your Own Custom Text</strong>
                  <p className="text-[#69778F] text-[11px] leading-relaxed">
                    In <strong>Review Studio</strong>, pick from <strong>Example 1 (High Risk)</strong>, <strong>Example 2 (AUM Mismatch)</strong>, <strong>Example 3 (Contrast Failure)</strong>, or choose <strong>Custom Draft</strong> to type/paste your own marketing text!
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-[#4C6EF5] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-[#121E36] block mb-0.5">Run the Pre-Flight Scan</strong>
                  <p className="text-[#69778F] text-[11px] leading-relaxed">
                    Click <strong>"Run Pre-Flight Scan"</strong>. Watch the cinematic 7-stage engine verify regex patterns, query the Audited Fact-Vault, and compute mathematical WCAG luminance contrast.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-[#D99019] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-[#121E36] block mb-0.5">Click Flagged Words & Apply 1-Click Intent-Preserving Rewrites</strong>
                  <p className="text-[#69778F] text-[11px] leading-relaxed">
                    Click any underlined phrase (e.g. <em>"guaranteed 18% returns"</em> or <em>"$25B AUM"</em>) to see the <strong>4-Part Evidence Card</strong> citing KPMG audits and SEC rules. Click <strong>"Apply Fix"</strong> to auto-harmonize the working draft!
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-[#50BEB8] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                <div>
                  <strong className="text-[#121E36] block mb-0.5">Harmonize Visual Banner (WCAG 2.1 AA)</strong>
                  <p className="text-[#69778F] text-[11px] leading-relaxed">
                    Switch to the <strong>Visual & WCAG</strong> tab. Click <strong>"1-Click Harmonize Banner"</strong> to automatically transition off-brand purple to approved Deep Navy with legal 6.8:1 contrast.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 flex gap-3 items-start">
                <span className="h-6 w-6 rounded-full bg-[#C94C4C] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                <div>
                  <strong className="text-[#121E36] block mb-0.5">Submit & Sign-Off in Stage-Gate Queue</strong>
                  <p className="text-[#69778F] text-[11px] leading-relaxed">
                    Click <strong>"Submit for Manager Sign-Off"</strong>. Switch roles to <strong>Brand Manager</strong> or <strong>Legal Counsel</strong> in the header and execute the final approval decision!
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5E8EF]">
              <span className="text-[11px] text-[#69778F]">No account or API key required • Zero-latency demo</span>
              <button
                onClick={() => {
                  setGuideOpen(false);
                  onNewReviewClick();
                }}
                className="btn-scan flex items-center gap-2 rounded-xl bg-[#121E36] px-4 py-2 text-xs font-bold text-white shadow-sm"
              >
                <span>Launch Review Studio Demo</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#FFF1C1]" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
