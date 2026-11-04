"use client";

import React from "react";
import { 
  LayoutDashboard, 
  ScanSearch, 
  BookMarked, 
  CheckSquare, 
  BarChart3, 
  Sparkles,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavTab = 'dashboard' | 'studio' | 'knowledge' | 'approvals' | 'insights';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingReviewsCount: number;
  unresolvedIssuesCount: number;
}

export function Sidebar({ activeTab, onTabChange, pendingReviewsCount, unresolvedIssuesCount }: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'studio' as NavTab,
      label: 'Review Studio',
      icon: ScanSearch,
      badge: unresolvedIssuesCount > 0 ? `${unresolvedIssuesCount} Risks` : null,
      badgeColor: 'bg-red-100 text-red-800 border border-red-200'
    },
    {
      id: 'knowledge' as NavTab,
      label: 'Brand Knowledge Hub',
      icon: BookMarked,
      badge: '5 Facts',
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'approvals' as NavTab,
      label: 'Stage-Gate Approvals',
      icon: CheckSquare,
      badge: pendingReviewsCount > 0 ? `${pendingReviewsCount} Pending` : null,
      badgeColor: 'bg-[#4C6EF5] text-white'
    },
    {
      id: 'insights' as NavTab,
      label: 'Friction & Audit',
      icon: BarChart3,
      badge: 'Radar',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-200'
    }
  ];

  return (
    <aside className="w-64 shrink-0 border-r border-[#E5E8EF] bg-[#FFFFFF] flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      {/* Navigation Links */}
      <div className="space-y-5">
        <div>
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#69778F]">
            Governance Workflow
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left",
                    isActive
                      ? "bg-[#121E36] text-[#FFFFFF] shadow-sm"
                      : "text-[#121E36] hover:bg-[#FAF7EF] hover:text-[#121E36]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#FFF1C1]" : "text-[#69778F]")} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ml-1",
                      item.badgeColor || (isActive ? "bg-white/20 text-white" : "bg-slate-100 text-[#69778F]")
                    )}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Brand Guide Quick Policy Badge */}
        <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-[#121E36]">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#50BEB8]" />
              <span>Northstar v3.2</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
              Active
            </span>
          </div>
          <p className="text-[11px] text-[#69778F] leading-snug">
            Fiduciary SEC Rule 206(4)-1 & Fact-Vault RAG active.
          </p>
          <div className="flex items-center justify-between border-t border-[#E5E8EF] pt-2 text-[10px] text-[#121E36]">
            <span>Fact-Vault: <strong className="text-emerald-700">Audited</strong></span>
            <span>WCAG: <strong className="text-[#4C6EF5]">2.1 AA</strong></span>
          </div>
        </div>
      </div>

      {/* Footer Info for Hackathon Judges */}
      <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-3 text-xs text-[#1E40AF] mt-4">
        <div className="flex items-center gap-1.5 font-bold mb-1">
          <Info className="h-3.5 w-3.5 text-[#4C6EF5]" />
          <span>Judge Walkthrough</span>
        </div>
        <p className="text-[11px] text-[#2563EB] leading-relaxed">
          Open <strong>Review Studio</strong> to inspect the live pre-flight scanner on our planted risky campaign with 1-click intent-preserving rewrites.
        </p>
      </div>
    </aside>
  );
}
