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
  Check
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
    <div className="flex-1 p-4 md:p-5 space-y-4 max-w-7xl mx-auto w-full">

      {/* ─── Compact Command Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#E5E8EF] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-[#121E36]">
              Brand Governance Dashboard
            </h1>
            <span className="rounded-md bg-[#EFF6FF] px-2 py-0.5 text-[10px] font-bold text-[#1D4ED8] border border-[#BFDBFE]">
              Enterprise Pre-Flight Gate
            </span>
          </div>
          <p className="text-xs text-[#69778F] mt-0.5">
            Intercepting marketing claims, copy, and visual banners prior to syndication
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNavigateToKnowledge}
            className="card-lift flex items-center gap-1.5 rounded-lg border border-[#E5E8EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#121E36] hover:border-[#4C6EF5] transition-all"
          >
            <BookMarked className="h-3.5 w-3.5 text-[#4C6EF5]" />
            <span>Brand Vault</span>
          </button>
          <button
            onClick={onNavigateToStudio}
            className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#121E36] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#FFF1C1]" />
            <span>Launch Studio Demo</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* ─── Executive Metrics Cards (Visible Above the Fold) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Metric 1 */}
        <div 
          onClick={onNavigateToApprovals}
          className="card-lift rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-sm hover:border-[#4C6EF5] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[#69778F] text-[11px] font-medium mb-1.5">
            <span>Pending Approvals</span>
            <span className="p-1 rounded bg-blue-50 text-[#4C6EF5] group-hover:bg-[#4C6EF5] group-hover:text-white transition-colors">
              <Clock className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-[#121E36]">3</span>
            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded">
              Needs Sign-Off
            </span>
          </div>
          <p className="text-[10px] text-[#69778F] mt-1.5 flex items-center gap-1 group-hover:text-[#4C6EF5]">
            <span>View Stage-Gate queue</span>
            <ArrowRight className="h-2.5 w-2.5" />
          </p>
        </div>

        {/* Metric 2 */}
        <div className="card-lift rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-[11px] font-medium mb-1.5">
            <span>Compliance Index</span>
            <span className="p-1 rounded bg-teal-50 text-[#50BEB8]">
              <TrendingUp className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-[#121E36]">{metrics.complianceRate}%</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
              +4.2% this week
            </span>
          </div>
          <p className="text-[10px] text-[#69778F] mt-1.5">
            Across {metrics.totalReviews} verified campaigns
          </p>
        </div>

        {/* Metric 3 */}
        <div className="card-lift rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-[11px] font-medium mb-1.5">
            <span>Risks Intercepted</span>
            <span className="p-1 rounded bg-red-50 text-[#C94C4C]">
              <ShieldAlert className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-[#121E36]">{metrics.flaggedIssues}</span>
            <span className="text-[10px] font-semibold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.2 rounded">
              Pre-Publication
            </span>
          </div>
          <p className="text-[10px] text-[#69778F] mt-1.5">
            Zero hallucinated claims leaked
          </p>
        </div>

        {/* Metric 4 */}
        <div className="card-lift rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-sm">
          <div className="flex items-center justify-between text-[#69778F] text-[11px] font-medium mb-1.5">
            <span>Review Turnaround</span>
            <span className="p-1 rounded bg-emerald-50 text-[#50BEB8]">
              <CheckCircle2 className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl md:text-2xl font-bold text-[#121E36]">{metrics.avgTurnaroundMinutes}m</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
              Down from 3 days
            </span>
          </div>
          <p className="text-[10px] text-[#69778F] mt-1.5">
            78% acceleration in cycle speed
          </p>
        </div>
      </div>

      {/* ─── Middle Section: Trend Chart & Active Risk Intercepts ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Compliance Trend Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#121E36]">Weekly Pre-Flight Compliance Trend</h2>
              <p className="text-[10px] text-[#69778F]">Average compliance score of scanned campaigns per day</p>
            </div>
            <button 
              onClick={onNavigateToInsights}
              className="text-[11px] font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1 transition-colors"
            >
              <span>Friction Radar</span>
              <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          {/* Clean Bar Chart */}
          <div className="h-36 flex items-end justify-between gap-2 pt-2 px-1 relative">
            {/* Target line */}
            <div className="absolute bottom-[40%] left-0 right-0 border-t border-dashed border-[#E5E8EF] flex items-center">
              <span className="text-[8px] font-semibold text-[#69778F] bg-white pr-1 leading-none">80% Target</span>
            </div>

            {metrics.weeklyTrend.map((item, i) => {
              const barHeight = Math.max(10, (item.complianceScore - 50) * 2);
              const isAboveTarget = item.complianceScore >= 80;
              return (
                <div key={item.day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group cursor-default">
                  <span className="text-[9px] font-bold text-[#69778F] opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.complianceScore}%
                  </span>
                  <div 
                    className="w-full max-w-[32px] rounded-t group-hover:opacity-80 transition-all"
                    style={{ 
                      height: `${barHeight}%`,
                      backgroundColor: isAboveTarget ? '#121E36' : '#D99019'
                    }}
                  />
                  <span className="text-[10px] font-semibold text-[#121E36]">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#69778F] pt-1 border-t border-[#E5E8EF]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="h-1.5 w-2.5 rounded-sm bg-[#121E36] inline-block" />Above Target</span>
              <span className="flex items-center gap-1"><span className="h-1.5 w-2.5 rounded-sm bg-[#D99019] inline-block" />Below 80%</span>
            </div>
            <span className="text-emerald-700 font-semibold">7-Day Avg: 87.1%</span>
          </div>
        </div>

        {/* Active Pre-Flight Risk Alerts (5 cols) */}
        <div className="lg:col-span-5 rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#E5E8EF] pb-2 mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="p-1 rounded bg-red-100 text-red-700">
                  <ShieldAlert className="h-3 w-3" />
                </span>
                <h2 className="text-xs font-bold text-[#121E36]">Active Pre-Flight Intercepts</h2>
              </div>
              <span className="text-[9px] font-bold text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                Live Gate
              </span>
            </div>

            <div className="space-y-1.5">
              <div 
                className="card-lift rounded-lg border border-red-200 bg-red-50/50 p-2 text-xs cursor-pointer"
                onClick={onNavigateToStudio}
              >
                <div className="flex items-center justify-between font-bold text-red-900 text-[11px] mb-0.5">
                  <span>SEC Rule 206(4)-1 Violation</span>
                  <span className="text-[9px] font-mono text-red-700 bg-red-100 px-1 rounded">CRITICAL</span>
                </div>
                <p className="text-[10px] text-red-950 font-medium">
                  &ldquo;guaranteed 18% annual returns&rdquo; — Fixed return claims are prohibited by federal law.
                </p>
              </div>

              <div 
                className="card-lift rounded-lg border border-red-200 bg-red-50/50 p-2 text-xs cursor-pointer"
                onClick={onNavigateToStudio}
              >
                <div className="flex items-center justify-between font-bold text-red-900 text-[11px] mb-0.5">
                  <span>Fact-Vault Scale Mismatch</span>
                  <span className="text-[9px] font-mono text-red-700 bg-red-100 px-1 rounded">AUM MISMATCH</span>
                </div>
                <p className="text-[10px] text-red-950 font-medium">
                  Draft claims &ldquo;$25B AUM&rdquo; vs KPMG Audited figure of <strong>$14.2B USD</strong>.
                </p>
              </div>

              <div 
                className="card-lift rounded-lg border border-amber-200 bg-amber-50/50 p-2 text-xs cursor-pointer"
                onClick={onNavigateToStudio}
              >
                <div className="flex items-center justify-between font-bold text-amber-900 text-[11px] mb-0.5">
                  <span>WCAG 2.1 AA Contrast Failure</span>
                  <span className="text-[9px] font-mono text-amber-700 bg-amber-100 px-1 rounded">WARNING</span>
                </div>
                <p className="text-[10px] text-amber-950 font-medium">
                  Banner contrast ratio 2.9:1 (fails 4.5:1 AA) with off-brand #8B5CF6 purple.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToStudio}
            className="btn-scan w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#121E36] py-2 text-[11px] font-semibold text-white shadow-sm mt-2"
          >
            <Sparkles className="h-3 w-3 text-[#FFF1C1]" />
            <span>Harmonize Draft in Review Studio</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* ─── Bottom Section: Recent Campaigns Table + Brand Swatches ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Recent Content Approvals Table (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-bold text-[#121E36]">Recent Content Approvals</h2>
              <p className="text-[10px] text-[#69778F]">Pre-flight inspection results across channels</p>
            </div>
            <button 
              onClick={onNavigateToApprovals}
              className="text-[11px] font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-2.5 w-2.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E8EF] text-[#69778F] text-[10px]">
                  <th className="py-2 font-semibold">Campaign</th>
                  <th className="py-2 font-semibold">Channel</th>
                  <th className="py-2 font-semibold">Creator</th>
                  <th className="py-2 font-semibold">Score</th>
                  <th className="py-2 font-semibold">Status</th>
                  <th className="py-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E8EF] text-[11px]">
                {seededReviewQueue.map((item) => (
                  <tr key={item.id} className="table-row-hover">
                    <td className="py-2.5 font-semibold text-[#121E36] max-w-[180px] truncate">
                      {item.title}
                    </td>
                    <td className="py-2.5 text-[#69778F]">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-700">
                        {item.channel}
                      </span>
                    </td>
                    <td className="py-2.5 text-[#121E36]">
                      <div className="flex items-center gap-1.5">
                        <div className="h-5 w-5 rounded-full bg-[#121E36] text-white text-[8px] font-bold flex items-center justify-center shrink-0">
                          {item.creator.avatar}
                        </div>
                        <span className="truncate max-w-[90px]">{item.creator.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                        item.complianceScore >= 85 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {item.complianceScore}/100
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
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
                    <td className="py-2.5 text-right">
                      <button
                        onClick={onNavigateToStudio}
                        className="btn-scan rounded bg-[#121E36] px-2 py-0.5 text-[10px] font-semibold text-white"
                      >
                        Studio
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand Assets Swatch Kit (4 cols) */}
        <div className="lg:col-span-4 rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-bold text-[#121E36]">Northstar Brand Assets</h2>
              <button
                onClick={onNavigateToKnowledge}
                className="text-[10px] font-semibold text-[#4C6EF5] hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[9px] font-bold uppercase text-[#69778F] mb-1.5">Approved Swatches (WCAG AA)</div>
                <div className="flex gap-1.5">
                  {[
                    { hex: '#121E36', name: 'Navy' },
                    { hex: '#4C6EF5', name: 'Blue' },
                    { hex: '#50BEB8', name: 'Teal' },
                    { hex: '#FAF7EF', name: 'Ivory', border: true },
                    { hex: '#FFF1C1', name: 'Cream', border: true },
                  ].map(c => (
                    <div key={c.hex} className="flex flex-col items-center gap-0.5 cursor-default" title={c.name}>
                      <div
                        className={`h-7 w-7 rounded-md shadow-xs ${c.border ? 'border border-[#E5E8EF]' : ''}`}
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="text-[8px] font-mono text-[#69778F]">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fact-Vault Summary */}
              <div className="rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] p-2.5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-[#121E36]">Audited Fact-Vault</span>
                  <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                    5 Verified Claims
                  </span>
                </div>
                <p className="text-[10px] text-[#69778F] leading-tight">
                  KPMG Q3 Audit: &ldquo;$14.2B USD in active custodial AUM&rdquo;
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToKnowledge}
            className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-[#E5E8EF] py-1.5 text-[10px] font-semibold text-[#121E36] hover:bg-slate-50 transition-colors"
          >
            <BookMarked className="h-3 w-3 text-[#4C6EF5]" />
            <span>Open Brand Knowledge Hub</span>
          </button>
        </div>

      </div>

    </div>
  );
}
