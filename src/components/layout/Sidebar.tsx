"use client";

import React from "react";
import { 
  LayoutDashboard, 
  ScanSearch, 
  BookMarked, 
  CheckSquare, 
  BarChart3, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

import { BrandProfile } from "@/types";

export type NavTab = 'dashboard' | 'studio' | 'knowledge' | 'approvals' | 'insights';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingReviewsCount: number;
  unresolvedIssuesCount: number;
  currentBrand?: BrandProfile;
  currentRole?: 'Creator' | 'Brand Manager' | 'Legal Counsel';
}

export function Sidebar({ 
  activeTab, 
  onTabChange, 
  pendingReviewsCount, 
  unresolvedIssuesCount,
  currentBrand,
  currentRole = 'Creator'
}: SidebarProps) {
  const brandName = currentBrand?.name || "Northstar Financial";
  const isApex = brandName.includes("Apex");
  const isCloud = brandName.includes("CloudScale");

  const brandVersion = isApex ? "Apex Health v2.1" : isCloud ? "CloudScale v5.0" : "Northstar v3.2";
  const policyLabel = isApex 
    ? "FDA 21 CFR Part 11 & Clinical Fact-Vault live." 
    : isCloud 
      ? "SOC-2 Type II & SLA Fact-Vault live." 
      : "SEC Rule 206(4)-1 & Fact-Vault live.";
  const auditProof = isApex ? "Audited (FDA)" : isCloud ? "Audited (SLA)" : "Audited (KPMG)";

  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: currentRole === 'Brand Manager' ? 'Overview' : null
    },
    {
      id: 'studio' as NavTab,
      label: 'Review Studio',
      icon: ScanSearch,
      badge: currentRole === 'Creator' ? 'Hero Tool' : `${unresolvedIssuesCount} Risks`,
      badgeColor: currentRole === 'Creator' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-800 border border-red-200'
    },
    {
      id: 'knowledge' as NavTab,
      label: 'Brand Knowledge Hub',
      icon: BookMarked,
      badge: `${currentBrand?.facts.length || 5} Facts`,
      badgeColor: 'bg-blue-50 text-blue-700 border border-blue-200'
    },
    {
      id: 'approvals' as NavTab,
      label: 'Stage-Gate Approvals',
      icon: CheckSquare,
      badge: currentRole === 'Creator' ? '🔒 Submit' : `${pendingReviewsCount} Pending`,
      badgeColor: currentRole === 'Creator' ? 'bg-slate-100 text-slate-700 border border-slate-300' : 'bg-[#4C6EF5] text-white'
    },
    {
      id: 'insights' as NavTab,
      label: 'Friction & Audit',
      icon: BarChart3,
      badge: currentRole === 'Legal Counsel' ? 'Certificates' : 'Radar',
      badgeColor: 'bg-amber-100 text-amber-900 border border-amber-200'
    }
  ];

  return (
    <aside className="w-60 shrink-0 border-r border-[#E5E8EF] bg-[#FFFFFF] flex flex-col justify-between p-3.5 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      {/* Navigation Links */}
      <div className="space-y-4">
        <div>
          <div className="px-2.5 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#69778F]">
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
                    "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold transition-all text-left",
                    isActive
                      ? "bg-[#121E36] text-[#FFFFFF] shadow-sm"
                      : "text-[#121E36] hover:bg-[#FAF7EF] hover:text-[#121E36]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-[#FFF1C1]" : "text-[#69778F]")} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={cn(
                      "px-1.5 py-0.2 rounded-full text-[9px] font-bold shrink-0 ml-1",
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
      </div>

      {/* Brand Guide Dynamic Client Policy Status */}
      <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-3 text-xs space-y-1.5">
        <div className="flex items-center justify-between font-bold text-[#121E36]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#50BEB8]" />
            <span className="text-xs truncate max-w-[130px]">{brandVersion}</span>
          </div>
          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono font-bold">
            Active
          </span>
        </div>
        <p className="text-[10px] text-[#69778F] leading-tight">
          {policyLabel}
        </p>
        <div className="flex items-center justify-between border-t border-[#E5E8EF] pt-1.5 text-[10px] text-[#121E36]">
          <span>Vault: <strong className="text-emerald-700">{auditProof}</strong></span>
          <span>WCAG: <strong className="text-[#4C6EF5]">2.1 AA</strong></span>
        </div>
      </div>
    </aside>
  );
}
