"use client";

import React from "react";
import { 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  FileText, 
  BookMarked,
  ArrowRight,
  ShieldAlert,
  Zap,
  Users,
  CheckSquare
} from "lucide-react";
import { mockGovernanceMetrics, seededReviewQueue } from "@/data/mockData";

interface DashboardProps {
  onNavigateToStudio: () => void;
  onNavigateToApprovals: () => void;
  onNavigateToKnowledge: () => void;
  onNavigateToInsights: () => void;
}

export function Dashboard({ 
  onNavigateToStudio, 
  onNavigateToApprovals, 
  onNavigateToKnowledge, 
  onNavigateToInsights 
}: DashboardProps) {
  const metrics = mockGovernanceMetrics;

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-7xl mx-auto w-full">

      {/* ─── Welcome & Hero Banner ─── */}
      <div className="animate-slideUp anim-hidden rounded-2xl border border-[#E5E8EF] bg-[#FFFFFF] p-5 md:p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-md bg-[#EFF6FF] px-2.5 py-1 text-xs font-bold text-[#1D4ED8] border border-[#BFDBFE]">
              Enterprise Pre-Flight Gate
            </span>
            <span className="text-xs font-semibold text-[#69778F]">
              Active: Northstar Financial (v3.2 Policy)
            </span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-[#121E36]">
            Brand Governance Dashboard
          </h1>
          <p className="text-xs text-[#69778F] max-w-xl leading-relaxed">
            Proofline intercepts outgoing marketing copy, financial claims, and visual banners before publication — validating every assertion against approved facts and SEC/FCA compliance rules.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onNavigateToKnowledge}
            className="card-lift flex items-center gap-2 rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] px-4 py-2.5 text-xs font-semibold text-[#121E36] hover:border-[#4C6EF5] transition-all"
          >
            <BookMarked className="h-4 w-4 text-[#4C6EF5]" />
            <span>Brand Knowledge Hub</span>
          </button>
          <button
            onClick={onNavigateToStudio}
            className="btn-scan flex items-center gap-2 rounded-lg bg-[#121E36] px-5 py-2.5 text-xs font-semibold text-white shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-[#FFF1C1]" />
            <span>Launch Review Studio</span>
          </button>
        </div>
      </div>

      {/* ─── Judge Walkthrough Banner ─── */}
      <div className="animate-slideUp anim-hidden delay-100 rounded-xl border border-blue-200 bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] p-4 flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="h-7 w-7 rounded-lg bg-[#4C6EF5] flex items-center justify-center">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-bold text-[#1E3A8A]">Judge Walkthrough — 60-Second Demo</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#1E40AF]">
          <span className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-blue-200 font-semibold">
            <span className="h-5 w-5 rounded-full bg-[#4C6EF5] text-white text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
            Launch Review Studio
          </span>
          <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
          <span className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-blue-200 font-semibold">
            <span className="h-5 w-5 rounded-full bg-[#50BEB8] text-white text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
            Run Pre-Flight Scan
          </span>
          <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
          <span className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-blue-200 font-semibold">
            <span className="h-5 w-5 rounded-full bg-[#D99019] text-white text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
            Click Flagged Phrase → Apply Fix
          </span>
          <ArrowRight className="h-3 w-3 text-blue-400 shrink-0" />
          <span className="flex items-center gap-1.5 bg-white/70 rounded-lg px-2.5 py-1.5 border border-blue-200 font-semibold">
            <span className="h-5 w-5 rounded-full bg-[#C94C4C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
            Submit → Stage-Gate Approval
          </span>
        </div>
        <button
          onClick={onNavigateToStudio}
          className="ml-auto shrink-0 flex items-center gap-1.5 rounded-lg bg-[#4C6EF5] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#3B5EE5] transition-colors"
        >
          <span>Start Demo</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>

      {/* ─── Overview Metrics Cards (staggered) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div 
          onClick={onNavigateToApprovals}
          className="animate-slideUp anim-hidden delay-200 card-lift rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-4 shadow-sm hover:border-[#4C6EF5] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#69778F] text-xs font-medium mb-3">
            <span>Pending Approvals</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-[#4C6EF5] group-hover:bg-[#4C6EF5] group-hover:text-white transition-colors">
              <Clock className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#121E36]">3</span>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
              Needs Sign-Off
            </span>
          </div>
          <p className="text-[11px] text-[#69778F] mt-2 flex items-center gap-1 group-hover:text-[#4C6EF5] transition-colors">
            <span>View Stage-Gate queue</span>
            <ArrowRight className="h-3 w-3" />
          </p>
        </div>

        {/* Metric 2 */}
        <div className="animate-slideUp anim-hidden delay-300 card-lift rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-xs font-medium mb-3">
            <span>Average Compliance Index</span>
            <span className="p-1.5 rounded-lg bg-teal-50 text-[#50BEB8]">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#121E36]">{metrics.complianceRate}%</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
              +4.2% this week
            </span>
          </div>
          <p className="text-[11px] text-[#69778F] mt-2">
            Across {metrics.totalReviews} published campaigns
          </p>
        </div>

        {/* Metric 3 */}
        <div className="animate-slideUp anim-hidden delay-400 card-lift rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-xs font-medium mb-3">
            <span>Risks Prevented</span>
            <span className="p-1.5 rounded-lg bg-red-50 text-[#C94C4C]">
              <ShieldAlert className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#121E36]">{metrics.flaggedIssues}</span>
            <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
              Pre-Publication
            </span>
          </div>
          <p className="text-[11px] text-[#69778F] mt-2">
            Zero hallucinated claims in public
          </p>
        </div>

        {/* Metric 4 */}
        <div className="animate-slideUp anim-hidden delay-500 card-lift rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-4 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-xs font-medium mb-3">
            <span>Review Turnaround</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-[#50BEB8]">
              <CheckCircle2 className="h-4 w-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#121E36]">{metrics.avgTurnaroundMinutes}m</span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
              Down from 3 days
            </span>
          </div>
          <p className="text-[11px] text-[#69778F] mt-2">
            78% acceleration in cycle speed
          </p>
        </div>
      </div>

      {/* ─── Middle Row: Compliance Trend + Active Risk Intercepts ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Compliance Trend Chart (7 cols) */}
        <div className="animate-slideUp anim-hidden delay-300 lg:col-span-7 rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#121E36]">Weekly Pre-Flight Compliance Trend</h2>
              <p className="text-[11px] text-[#69778F]">Average compliance score of scanned campaigns per day</p>
            </div>
            <button 
              onClick={onNavigateToInsights}
              className="text-xs font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Friction Radar</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Animated Bar Chart */}
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-1 relative">
            {/* Target line */}
            <div className="absolute bottom-[40%] left-0 right-0 border-t border-dashed border-[#E5E8EF] flex items-center">
              <span className="text-[9px] font-semibold text-[#69778F] bg-white pr-1 leading-none">80% target</span>
            </div>

            {metrics.weeklyTrend.map((item, i) => {
              const barHeight = Math.max(8, (item.complianceScore - 50) * 2);
              const isAboveTarget = item.complianceScore >= 80;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group cursor-default">
                  <span className="text-[10px] font-bold text-[#69778F] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.complianceScore}%
                  </span>
                  <div 
                    className="w-full max-w-[36px] rounded-t-md group-hover:opacity-80 transition-all"
                    style={{ 
                      height: `${barHeight}%`,
                      backgroundColor: isAboveTarget ? '#121E36' : '#D99019',
                      animationDelay: `${i * 80}ms`
                    }}
                  />
                  <span className="text-xs font-semibold text-[#121E36]">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#69778F] pt-1 border-t border-[#E5E8EF]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-[#121E36] inline-block" />Above Target</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-3 rounded-sm bg-[#D99019] inline-block" />Below 80%</span>
            </div>
            <span className="text-emerald-700 font-semibold">7-Day Average: 87.1%</span>
          </div>
        </div>

        {/* Active Pre-Flight Risk Intercepts (5 cols) */}
        <div className="animate-slideUp anim-hidden delay-400 lg:col-span-5 rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-5 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E5E8EF] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-red-100 text-red-700">
                  <ShieldAlert className="h-3.5 w-3.5" />
                </span>
                <h2 className="text-sm font-bold text-[#121E36]">Active Pre-Flight Intercepts</h2>
              </div>
              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulseRing" />
                Live Gate
              </span>
            </div>
            
            <p className="text-[11px] text-[#69778F] mb-3">
              High-severity violations caught in the working campaign:
            </p>

            <div className="space-y-2">
              <div className="card-lift rounded-lg border border-red-200 bg-red-50/50 p-2.5 text-xs cursor-pointer" onClick={onNavigateToStudio}>
                <div className="flex items-center justify-between font-bold text-red-900 mb-0.5">
                  <span>SEC Rule 206(4)-1 Violation</span>
                  <span className="text-[10px] font-mono text-red-700 bg-red-100 px-1 rounded">CRITICAL</span>
                </div>
                <p className="text-[11px] text-red-950 font-medium">
                  &ldquo;guaranteed 18% annual returns&rdquo; — Promising fixed returns is prohibited by federal law.
                </p>
              </div>

              <div className="card-lift rounded-lg border border-red-200 bg-red-50/50 p-2.5 text-xs cursor-pointer" onClick={onNavigateToStudio}>
                <div className="flex items-center justify-between font-bold text-red-900 mb-0.5">
                  <span>Unsupported Factual Claim</span>
                  <span className="text-[10px] font-mono text-red-700 bg-red-100 px-1 rounded">FACT-MISMATCH</span>
                </div>
                <p className="text-[11px] text-red-950 font-medium">
                  Draft claims &ldquo;$25B AUM&rdquo; vs KPMG Audited figure of <strong>$14.2B USD</strong>.
                </p>
              </div>

              <div className="card-lift rounded-lg border border-amber-200 bg-amber-50/50 p-2.5 text-xs cursor-pointer" onClick={onNavigateToStudio}>
                <div className="flex items-center justify-between font-bold text-amber-900 mb-0.5">
                  <span>WCAG 2.1 Contrast Failure</span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1 rounded">WARNING</span>
                </div>
                <p className="text-[11px] text-amber-950 font-medium">
                  Banner contrast ratio 2.9:1 (fails 4.5:1 AA) with off-brand #8B5CF6 purple.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToStudio}
            className="btn-scan w-full flex items-center justify-center gap-2 rounded-lg bg-[#121E36] py-2.5 text-xs font-semibold text-white shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFF1C1]" />
            <span>Harmonize Draft in Review Studio</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ─── Northstar Brand Assets Quick Reference ─── */}
      <div className="animate-slideUp anim-hidden delay-400 rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-[#121E36]">Northstar Brand Assets</h2>
            <p className="text-[11px] text-[#69778F]">Active approved design kit — WCAG AA certified</p>
          </div>
          <button
            onClick={onNavigateToKnowledge}
            className="text-xs font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1"
          >
            <span>Manage</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Color Swatches */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#69778F] mb-2">Primary Swatches (WCAG AA Certified)</div>
            <div className="flex gap-2">
              {[
                { hex: '#121E36', name: 'Deep Navy' },
                { hex: '#4C6EF5', name: 'Royal Blue' },
                { hex: '#50BEB8', name: 'Growth Teal' },
                { hex: '#FAF7EF', name: 'Soft Ivory', border: true },
                { hex: '#FFF1C1', name: 'Warm Cream', border: true },
              ].map(c => (
                <div key={c.hex} className="card-lift flex flex-col items-center gap-1 cursor-default" title={c.name}>
                  <div
                    className={`h-9 w-9 rounded-lg shadow-sm ${c.border ? 'border border-[#E5E8EF]' : ''}`}
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-[9px] font-mono text-[#69778F]">{c.hex}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fact-Vault Summary */}
          <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#121E36]">Audited Fact-Vault</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                5 Claims Loaded
              </span>
            </div>
            <p className="text-[11px] text-[#69778F] leading-snug">
              Latest: &ldquo;$14.2B AUM verified by KPMG Q3 2024 Audit Statement&rdquo;
            </p>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-[#69778F]">
              <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
              <span>All 5 facts verified against source documents</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Recent Campaigns Table ─── */}
      <div className="animate-slideUp anim-hidden delay-500 rounded-xl border border-[#E5E8EF] bg-[#FFFFFF] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#121E36]">Recent Content Approvals</h2>
            <p className="text-[11px] text-[#69778F]">Pre-flight inspection results across marketing channels</p>
          </div>
          <button 
            onClick={onNavigateToApprovals}
            className="text-xs font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1"
          >
            <span>View All Approvals</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E5E8EF] text-[#69778F]">
                <th className="py-2.5 font-semibold">Campaign Title</th>
                <th className="py-2.5 font-semibold">Channel</th>
                <th className="py-2.5 font-semibold">Creator</th>
                <th className="py-2.5 font-semibold">Compliance Index</th>
                <th className="py-2.5 font-semibold">Review Status</th>
                <th className="py-2.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E8EF]">
              {seededReviewQueue.map((item) => (
                <tr key={item.id} className="table-row-hover">
                  <td className="py-3 font-semibold text-[#121E36] max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-3 text-[#69778F]">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                      {item.channel}
                    </span>
                  </td>
                  <td className="py-3 text-[#121E36]">
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 rounded-full bg-[#121E36] text-white text-[9px] font-bold flex items-center justify-center shrink-0">
                        {item.creator.avatar}
                      </div>
                      <span>{item.creator.name}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${item.complianceScore}%`,
                            backgroundColor: item.complianceScore >= 85 ? '#50BEB8' : '#D99019'
                          }}
                        />
                      </div>
                      <span className={`font-bold text-[11px] ${item.complianceScore >= 85 ? 'text-emerald-700' : 'text-amber-700'}`}>
                        {item.complianceScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'approved' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : item.status === 'in_review'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : item.status === 'exception_granted'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={onNavigateToStudio}
                      className="btn-scan rounded bg-[#121E36] px-2.5 py-1 text-[11px] font-semibold text-white"
                    >
                      Open Studio
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
