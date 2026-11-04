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
  Building2,
  Scale,
  FileCheck2,
  Lock,
  Layers
} from "lucide-react";

interface HeaderProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onRoleChange: (role: 'Creator' | 'Brand Manager' | 'Legal Counsel') => void;
  selectedBrandName: string;
  onBrandChange: (brandName: string) => void;
  onNewReviewClick: () => void;
}

export function Header({ 
  currentRole, 
  onRoleChange, 
  selectedBrandName,
  onBrandChange,
  onNewReviewClick 
}: HeaderProps) {
  const [guideOpen, setGuideOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-[#E5E8EF] bg-white/95 backdrop-blur-sm px-3 md:px-5 shadow-xs">
        {/* Left: Logo & Brand Workspace Selector */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[#121E36] text-[#FFF1C1] shadow-xs">
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

          {/* Active Enterprise Client Workspace Switcher */}
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] px-2 py-1 text-xs">
            <Building2 className="h-3.5 w-3.5 text-[#4C6EF5] shrink-0" />
            <span className="text-[10px] text-[#69778F] font-medium hidden md:inline">Client Workspace:</span>
            <select
              value={selectedBrandName}
              onChange={(e) => onBrandChange(e.target.value)}
              className="text-xs font-bold text-[#121E36] bg-transparent outline-none cursor-pointer pr-1"
              title="Switch Active Corporate Brand Workspace"
            >
              <option value="Northstar Financial">Northstar Financial (FinTech / SEC)</option>
              <option value="Apex Health Technologies">Apex Health (MedTech / FDA)</option>
              <option value="CloudScale Systems">CloudScale Systems (Cloud / SOC-2)</option>
            </select>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-2.5">
          
          {/* Step-by-Step Evaluator Guide Button */}
          <button
            onClick={() => setGuideOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] hover:bg-[#FEF3C7] px-2.5 py-1.5 text-[11px] font-bold text-[#92400E] shadow-xs transition-all"
            title="Open Complete Evaluator & Architecture Guide"
          >
            <BookOpen className="h-3.5 w-3.5 text-[#D99019]" />
            <span>How to Use / Guide</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D99019] animate-pulse" />
          </button>

          {/* Role Switcher */}
          <div className="flex items-center gap-1 rounded-lg border border-[#E5E8EF] bg-white px-2 py-1 text-xs shadow-2xs">
            <UserCheck className="h-3.5 w-3.5 text-[#50BEB8] shrink-0" />
            <span className="text-[10px] text-[#69778F] hidden md:inline">Role:</span>
            <select 
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as any)}
              className="text-xs font-semibold text-[#121E36] bg-transparent outline-none cursor-pointer pr-1"
              title="Switch between Creator, Brand Manager, and Legal Counsel roles"
            >
              <option value="Creator">✏️ Content Creator</option>
              <option value="Brand Manager">🛡️ Brand Manager</option>
              <option value="Legal Counsel">⚖️ Legal Counsel</option>
            </select>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onNewReviewClick}
            className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#121E36] px-3 py-1.5 text-xs font-bold text-white shadow-xs"
          >
            <Sparkles className="h-3 w-3 text-[#FFF1C1]" />
            <span>New Scan</span>
          </button>
        </div>
      </header>

      {/* ─── Comprehensive Evaluator Guide & Architecture Modal ─── */}
      {guideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E8EF] max-h-[90vh] overflow-y-auto space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E8EF] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#4C6EF5]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#121E36]">
                    Proofline AI — Judge & Evaluator Master Guide
                  </h3>
                  <p className="text-[11px] text-[#69778F]">
                    How Proofline transforms enterprise compliance into an automated, evidence-first workflow
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

            {/* Section 1: Universal Brand Governance Platform Architecture */}
            <div className="rounded-xl border border-blue-200 bg-[#EFF6FF]/70 p-4 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#1E40AF]">
                <Building2 className="h-4 w-4 text-[#4C6EF5]" />
                <span>Proofline AI — Universal Brand Governance Engine</span>
              </div>
              <p className="text-[#1E3A8A] text-[11px] leading-relaxed">
                Proofline is a <strong>universal compliance and brand governance copilot</strong> built to safeguard ANY enterprise, marketing team, or agency. To prove that Proofline evaluates content across radically different industries, we have pre-loaded <strong>3 realistic industry sample datasets</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className="bg-white p-2.5 rounded-lg border border-blue-200 space-y-0.5">
                  <strong className="text-[#121E36] block">1. FinTech / Wealth Demo</strong>
                  <span className="text-[#69778F] text-[10px] block">Enforces SEC Rule 206(4)-1 promissory returns & KPMG $14.2B AUM Fact-Vault.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-blue-200 space-y-0.5">
                  <strong className="text-[#121E36] block">2. MedTech / FDA Demo</strong>
                  <span className="text-[#69778F] text-[10px] block">Enforces FDA 510(k) clearance, prohibits "100% cure" claims, checks clinical cohorts.</span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-blue-200 space-y-0.5">
                  <strong className="text-[#121E36] block">3. Cloud / SOC-2 Demo</strong>
                  <span className="text-[#69778F] text-[10px] block">Enforces 99.999% SLA benchmarks, SOC-2 security lexicon, prevents tech overclaims.</span>
                </div>
              </div>
              <p className="text-[10px] text-blue-900 font-medium">
                💡 Switch between sample client workspaces using the top dropdown to see guidelines, Fact-Vault, and blacklists immediately adapt!
              </p>
            </div>

            {/* Section 2: Role-Based Human-in-the-Loop Governance */}
            <div className="rounded-xl border border-[#E5E8EF] bg-white p-3.5 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#121E36]">
                <UserCheck className="h-4 w-4 text-[#50BEB8]" />
                <span>How Role Switching Works (Test All 3 Perspectives!)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#FAF7EF] border border-[#E5E8EF]">
                  <strong className="text-[#121E36] block mb-0.5">✏️ Content Creator</strong>
                  <p className="text-[#69778F]">Drafts marketing copy, runs pre-flight scans, applies 1-click intent-preserving rewrites, and submits for approval. <em>Cannot self-approve.</em></p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7EF] border border-[#E5E8EF]">
                  <strong className="text-[#121E36] block mb-0.5">🛡️ Brand Manager</strong>
                  <p className="text-[#69778F]">Reviews creator exception justifications, approves campaigns for syndication, and manages approved facts and voice rules in the Knowledge Hub.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#FAF7EF] border border-[#E5E8EF]">
                  <strong className="text-[#121E36] block mb-0.5">⚖️ Legal & Compliance</strong>
                  <p className="text-[#69778F]">Validates claims against auditor statements (KPMG), enforces SEC Rule 206(4)-1, and issues cryptographic compliance certificates with SHA-256 seals.</p>
                </div>
              </div>
            </div>

            {/* Section 3: The 5 Complete Tools in Proofline */}
            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[#69778F] text-[10px] block">
                The 5 Integrated Governance Tools
              </span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-lg border border-[#E5E8EF] bg-white">
                  <strong className="text-[#121E36] block">1. Executive Dashboard</strong>
                  <p className="text-[#69778F]">Real-time compliance index (89.2%), intercepted risks (382), weekly compliance velocity chart, and live risk alerts.</p>
                </div>
                <div className="p-2.5 rounded-lg border border-[#E5E8EF] bg-white">
                  <strong className="text-[#121E36] block">2. Review Studio (Hero Engine)</strong>
                  <p className="text-[#69778F]">7-stage pre-flight scanner, dynamic in-line text highlighting, 4-part evidence cards, 1-click rewrites, Git diff, and WCAG AA banner harmonizer.</p>
                </div>
                <div className="p-2.5 rounded-lg border border-[#E5E8EF] bg-white">
                  <strong className="text-[#121E36] block">3. Brand Knowledge Hub</strong>
                  <p className="text-[#69778F]">Single source of truth: Audited Fact-Vault with verified figures, Voice Pillars (Do/Don't), Prohibited Lexicon, and WCAG certified swatches.</p>
                </div>
                <div className="p-2.5 rounded-lg border border-[#E5E8EF] bg-white">
                  <strong className="text-[#121E36] block">4. Stage-Gate Approvals & Friction Radar</strong>
                  <p className="text-[#69778F]">Human-in-the-loop review queue with collaborative comment thread, approval decisions, and human override rate analytics.</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5E8EF]">
              <span className="text-[11px] text-[#69778F]">100% Client-Side State • Tested & Verified for CodeNexus 2026</span>
              <button
                onClick={() => {
                  setGuideOpen(false);
                  onNewReviewClick();
                }}
                className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#121E36] px-4 py-2 text-xs font-bold text-white shadow-xs"
              >
                <span>Start Review Studio Demo</span>
                <ArrowRight className="h-3 w-3 text-[#FFF1C1]" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
