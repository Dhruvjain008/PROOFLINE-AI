"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  FileCheck2, 
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  Printer
} from "lucide-react";
import { mockGovernanceMetrics, northstarBrand } from "@/data/mockData";
import { cn } from "@/lib/utils";

export function InsightsAudit() {
  const metrics = mockGovernanceMetrics;
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  return (
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="animate-slideUp anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#1D4ED8] border border-[#BFDBFE]">
              Governance Intelligence
            </span>
            <span className="text-xs text-[#69778F]">Audit & Friction Analytics</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#121E36]">
            Guideline Friction & Compliance Audit
          </h1>
          <p className="text-xs text-[#69778F] max-w-xl mt-1">
            Identifies ambiguous brand rules through human override analysis and produces verified enterprise compliance audit certificates.
          </p>
        </div>

        <button
          onClick={() => setShowCertificateModal(true)}
          className="btn-scan flex items-center gap-2 rounded-lg bg-[#121E36] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1E2D4A]"
        >
          <FileCheck2 className="h-4 w-4 text-[#FFF1C1]" />
          <span>Export Compliance Certificate</span>
        </button>
      </div>

      {/* Top 3 High-Impact Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="animate-slideUp anim-hidden delay-100 card-lift rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm">
          <div className="text-xs text-[#69778F] font-semibold mb-1">Total Scanned Artifacts</div>
          <div className="text-2xl font-bold text-[#121E36]">{metrics.totalReviews}</div>
          <p className="text-[11px] text-emerald-600 mt-1">119 approved, 29 revised</p>
        </div>

        <div className="animate-slideUp anim-hidden delay-200 card-lift rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm">
          <div className="text-xs text-[#69778F] font-semibold mb-1">Unsubstantiated Claims Caught</div>
          <div className="text-2xl font-bold text-red-600">38 Claims</div>
          <p className="text-[11px] text-[#69778F] mt-1">Saved from public release by Fact-Vault</p>
        </div>

        <div className="animate-slideUp anim-hidden delay-300 card-lift rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm">
          <div className="text-xs text-[#69778F] font-semibold mb-1">Average Manager Review Speed</div>
          <div className="text-2xl font-bold text-emerald-600">14 Minutes</div>
          <p className="text-[11px] text-[#69778F] mt-1">80% drop from traditional 3-day turnaround</p>
        </div>
      </div>

      {/* THE HERO DIFFERENTIATOR: Guideline Friction & Ambiguity Radar */}
      <div className="animate-slideUp anim-hidden delay-300 rounded-xl border border-[#E5E8EF] bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E8EF] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <h2 className="text-base font-bold text-[#121E36]">
                Guideline Friction Radar (Human Override Analytics)
              </h2>
            </div>
            <p className="text-xs text-[#69778F] mt-1">
              Tracks which rules creators fail most and which rules human managers consistently override — pinpointing ambiguous or outdated guidelines.
            </p>
          </div>

          <span className="rounded bg-[#FFF1C1] px-2.5 py-1 text-[11px] font-bold text-[#121E36] border border-[#FDE68A] self-start sm:self-auto">
            Self-Healing Guidelines
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E8EF] text-[#69778F]">
                <th className="py-2.5 font-semibold">Rule Code & Name</th>
                <th className="py-2.5 font-semibold">Violations Caught</th>
                <th className="py-2.5 font-semibold">Human Override Rate</th>
                <th className="py-2.5 font-semibold">Friction Status</th>
                <th className="py-2.5 font-semibold">Actionable Policy Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8EF]">
              {metrics.frequentlyViolatedRules.map((rule) => {
                const isHighFriction = rule.overrideRatePercent > 50;

                return (
                  <tr key={rule.ruleCode} className="hover:bg-[#FAF7EF] transition-colors">
                    <td className="py-3 font-semibold text-[#121E36]">
                      <span className="font-mono text-[#4C6EF5] block text-[11px]">{rule.ruleCode}</span>
                      <span>{rule.ruleName}</span>
                    </td>
                    <td className="py-3 text-[#121E36] font-bold">
                      {rule.count} scans
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isHighFriction ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${rule.overrideRatePercent}%` }}
                          />
                        </div>
                        <span className={`font-bold ${isHighFriction ? 'text-amber-700' : 'text-emerald-700'}`}>
                          {rule.overrideRatePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isHighFriction ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {isHighFriction ? 'High Ambiguity' : 'Effective Rule'}
                      </span>
                    </td>
                    <td className="py-3 text-[#69778F] max-w-sm text-[11px] leading-relaxed">
                      {rule.recommendation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compliance Audit Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl space-y-6 border border-[#E5E8EF] max-h-[90vh] overflow-y-auto">
            
            {/* Certificate Header */}
            <div className="text-center space-y-2 border-b border-[#E5E8EF] pb-4">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4C6EF5]">
                <ShieldCheck className="h-5 w-5" />
                <span>Proofline Brand Governance System</span>
              </div>
              <h2 className="text-xl font-bold tracking-tight text-[#121E36]">
                Official Enterprise Compliance Certificate
              </h2>
              <p className="text-xs text-[#69778F]">
                Cryptographic Pre-Flight Verification Audit • Issued for Public Distribution
              </p>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs text-[#121E36] bg-[#FAF7EF] p-5 rounded-xl border border-[#E5E8EF]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[#69778F] block text-[11px]">Organization:</span>
                  <strong>Northstar Financial Corp</strong>
                </div>
                <div>
                  <span className="text-[#69778F] block text-[11px]">Audit Timestamp:</span>
                  <strong>November 02, 2026 — 13:45 UTC</strong>
                </div>
                <div>
                  <span className="text-[#69778F] block text-[11px]">Regulatory Standards:</span>
                  <strong>SEC Rule 206(4)-1 & FCA Fiduciary Code</strong>
                </div>
                <div>
                  <span className="text-[#69778F] block text-[11px]">Visual Accessibility:</span>
                  <strong className="text-emerald-700">WCAG 2.1 AA Compliant (6.8:1)</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E8EF] space-y-1">
                <span className="text-[#69778F] text-[11px] block font-semibold">
                  Verified Fact-Vault Attributions:
                </span>
                <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#121E36]">
                  <li>$14.2B AUM verified against KPMG Q3 Independent Statement</li>
                  <li>Dual SEC & FCA Registered Status verified via Form ADV</li>
                  <li>Zero unbacked promotional superlatives in syndication draft</li>
                </ul>
              </div>

              <div className="pt-3 border-t border-[#E5E8EF] flex items-center justify-between">
                <div>
                  <span className="text-[#69778F] text-[10px] block">Authorized Reviewer Sign-Off:</span>
                  <strong className="text-xs">Sarah Chen (Head of Brand Governance)</strong>
                </div>
                <div className="text-right">
                  <span className="text-[#69778F] text-[10px] block">Audit Certificate Hash:</span>
                  <span className="font-mono text-[10px] text-[#4C6EF5]">SHA256: 8f9b2a...3c4e</span>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCertificateModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-[#69778F] hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#121E36] text-xs font-semibold text-white hover:bg-[#1E2D4A]"
              >
                <Printer className="h-3.5 w-3.5 text-[#FFF1C1]" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
