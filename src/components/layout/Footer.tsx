"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, FileText, Scale, X, ExternalLink, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [modalType, setModalType] = useState<'privacy' | 'terms' | 'regulatory' | null>(null);

  return (
    <>
      <footer className="border-t border-[#E5E8EF] bg-white/90 py-3 px-4 md:px-6 mt-12 text-xs text-[#69778F]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          
          {/* Left: Branding & Status */}
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <div className="flex items-center gap-1 font-bold text-[#121E36]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#50BEB8]" />
              <span>Proofline AI</span>
            </div>
            <span className="text-slate-300">|</span>
            <span>Team FALCON (Dhruv Jain) • CodeNexus India 2026</span>
            <span className="hidden md:inline-flex items-center gap-1 rounded bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SOC-2 Aligned
            </span>
          </div>

          {/* Right: Policy & Legal Modals */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium">
            <button
              onClick={() => setModalType('privacy')}
              className="hover:text-[#121E36] hover:underline flex items-center gap-1 transition-colors"
            >
              <Lock className="h-3 w-3 text-[#4C6EF5]" />
              <span>Privacy Policy</span>
            </button>
            <span className="text-slate-200">•</span>
            <button
              onClick={() => setModalType('terms')}
              className="hover:text-[#121E36] hover:underline flex items-center gap-1 transition-colors"
            >
              <FileText className="h-3 w-3 text-[#50BEB8]" />
              <span>Terms of Service</span>
            </button>
            <span className="text-slate-200">•</span>
            <button
              onClick={() => setModalType('regulatory')}
              className="hover:text-[#121E36] hover:underline flex items-center gap-1 transition-colors"
            >
              <Scale className="h-3 w-3 text-[#D99019]" />
              <span>SEC Rule 206(4)-1 Governance</span>
            </button>
          </div>

        </div>
      </footer>

      {/* ─── Modal Dialogs ─── */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl border border-[#E5E8EF] max-h-[85vh] overflow-y-auto space-y-4">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E5E8EF] pb-3">
              <div className="flex items-center gap-2 font-bold text-sm text-[#121E36]">
                {modalType === 'privacy' && <Lock className="h-4 w-4 text-[#4C6EF5]" />}
                {modalType === 'terms' && <FileText className="h-4 w-4 text-[#50BEB8]" />}
                {modalType === 'regulatory' && <Scale className="h-4 w-4 text-[#D99019]" />}
                <span>
                  {modalType === 'privacy' && "Proofline Enterprise Privacy Policy"}
                  {modalType === 'terms' && "Terms of Service & Brand Governance Charter"}
                  {modalType === 'regulatory' && "SEC Rule 206(4)-1 & Regulatory Architecture"}
                </span>
              </div>
              <button
                onClick={() => setModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content: Privacy */}
            {modalType === 'privacy' && (
              <div className="space-y-3 text-xs text-[#121E36] leading-relaxed">
                <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-[11px] text-blue-900 font-medium">
                  🔒 <strong>Zero-Training Data Sovereignty:</strong> Customer marketing drafts, brand books, and factual figures processed in Proofline are never stored, logged into public AI training datasets, or shared across multi-tenant boundaries.
                </div>
                <h4 className="font-bold text-[#121E36]">1. Transient In-Memory Processing</h4>
                <p className="text-[#69778F]">All draft text submissions, regex evaluations, and factual comparisons take place inside isolated memory sessions. Transient text representations are purged immediately after evaluation report compilation.</p>

                <h4 className="font-bold text-[#121E36]">2. Audited Fact-Vault Isolation</h4>
                <p className="text-[#69778F]">Each enterprise organization maintains dedicated cryptographic boundaries for uploaded guidelines, auditor financial statements (e.g. KPMG Q3 statements), and compliance documents.</p>

                <h4 className="font-bold text-[#121E36]">3. Compliance & Retention</h4>
                <p className="text-[#69778F]">Proofline operates in compliance with SOC-2 Type II standards, GDPR Article 28 data processor protocols, and SEC Rule 17a-4 electronic record retention rules for legal audit trails.</p>
              </div>
            )}

            {/* Content: Terms */}
            {modalType === 'terms' && (
              <div className="space-y-3 text-xs text-[#121E36] leading-relaxed">
                <div className="rounded-lg bg-teal-50 border border-teal-200 p-3 text-[11px] text-teal-900 font-medium">
                  ⚖️ <strong>Human-in-the-Loop Fiduciary Charter:</strong> Proofline is an advisory copilot. AI assists and cites approved rules, but human brand managers and legal counsel retain sole authority to approve or syndicate publications.
                </div>
                <h4 className="font-bold text-[#121E36]">1. Permitted Use in Enterprise Governance</h4>
                <p className="text-[#69778F]">Proofline provides pre-flight scanning to detect unverified claims, off-brand vocabulary, and visual accessibility non-compliance. It is intended to augment existing enterprise risk governance teams.</p>

                <h4 className="font-bold text-[#121E36]">2. Exception Audit Trail</h4>
                <p className="text-[#69778F]">When creators or managers override an AI compliance flag, an immutable, timestamped record documenting the human justification is retained for audit inspections.</p>
              </div>
            )}

            {/* Content: Regulatory */}
            {modalType === 'regulatory' && (
              <div className="space-y-3 text-xs text-[#121E36] leading-relaxed">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-[11px] text-amber-900 font-medium">
                  🛡️ <strong>Regulatory Guardrails Active:</strong> Engineered to satisfy the United States Securities and Exchange Commission (SEC) Investment Adviser Marketing Rule (Rule 206(4)-1) and UK FCA Consumer Duty.
                </div>
                <h4 className="font-bold text-[#121E36]">SEC Rule 206(4)-1 Compliance</h4>
                <p className="text-[#69778F]">Prohibits any advertisement containing untrue statements of material fact, unsubstantiated claims, or misleading performance projections. Proofline's deterministic regex specifically blacklists promissory return wording.</p>

                <h4 className="font-bold text-[#121E36]">W3C WCAG 2.1 AA Accessibility</h4>
                <p className="text-[#69778F]">Campaign graphics are evaluated for relative luminance contrast. Marketing headers must achieve minimum 4.5:1 text-to-background contrast to satisfy digital accessibility laws (ADA Title III).</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end pt-3 border-t border-[#E5E8EF]">
              <button
                onClick={() => setModalType(null)}
                className="btn-scan px-4 py-2 rounded-xl bg-[#121E36] text-xs font-bold text-white"
              >
                Understood & Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
