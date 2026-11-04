"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar, NavTab } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ContentReviewStudio } from "@/components/studio/ContentReviewStudio";
import { BrandKnowledgeHub } from "@/components/knowledge/BrandKnowledgeHub";
import { ReviewApprovalQueue } from "@/components/approvals/ReviewApprovalQueue";
import { InsightsAudit } from "@/components/insights/InsightsAudit";
import { Footer } from "@/components/layout/Footer";
import { ReviewItem } from "@/types";
import { seededReviewQueue, availableBrands, northstarBrand } from "@/data/mockData";
import { Building2, UserCheck, ShieldCheck } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [selectedBrandName, setSelectedBrandName] = useState<string>("Northstar Financial");
  const [currentRole, setCurrentRole] = useState<'Creator' | 'Brand Manager' | 'Legal Counsel'>('Brand Manager');
  const [reviewQueue, setReviewQueue] = useState<ReviewItem[]>(seededReviewQueue);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedBrand = availableBrands.find(b => b.name === selectedBrandName) || northstarBrand;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleRoleChange = (newRole: 'Creator' | 'Brand Manager' | 'Legal Counsel') => {
    setCurrentRole(newRole);
    showToast(`✓ Active Role updated: ${newRole} — Permissions & action gates refreshed!`);
  };

  const handleBrandChange = (newBrandName: string) => {
    setSelectedBrandName(newBrandName);
    showToast(`🏢 Switched client workspace to: ${newBrandName}`);
  };

  const handleStudioSubmit = (updatedItem: Partial<ReviewItem>) => {
    showToast("✓ Campaign successfully submitted to Stage-Gate Review Queue!");
    setActiveTab('approvals');
  };

  const handleOpenInStudio = (item: ReviewItem) => {
    setActiveTab('studio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7EF] text-[#121E36]">
      {/* Sticky Slim Top Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        selectedBrandName={selectedBrandName}
        onBrandChange={handleBrandChange}
        onNewReviewClick={() => setActiveTab('studio')}
      />

      {/* Main Layout Area: Fixed Sidebar + Scrollable Content */}
      <div className="flex-1 flex flex-col md:flex-row w-full">
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingReviewsCount={reviewQueue.filter(r => r.status === 'in_review' || r.status === 'pending').length}
          unresolvedIssuesCount={5}
        />

        <main className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="p-3 md:p-4 space-y-3">
            
            {/* Dynamic Role & Workspace Context Strip */}
            <div className="rounded-xl border border-[#E5E8EF] bg-white px-3.5 py-2 shadow-2xs flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 font-bold text-[#121E36]">
                  <Building2 className="h-3.5 w-3.5 text-[#4C6EF5]" />
                  <span>{selectedBrand.name}</span>
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-[11px] text-[#69778F]">
                  Sector: <strong>{selectedBrand.sector}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#69778F]">Active Permission Mode:</span>
                <span className="rounded-md bg-[#FAF7EF] border border-[#E5E8EF] px-2 py-0.5 text-[11px] font-bold text-[#121E36] flex items-center gap-1">
                  <UserCheck className="h-3 w-3 text-[#50BEB8]" />
                  <span>
                    {currentRole === 'Creator' && "✏️ Creator Mode (Drafting & Pre-Flight Scan)"}
                    {currentRole === 'Brand Manager' && "🛡️ Brand Manager Mode (Full Approval & Policy Gate)"}
                    {currentRole === 'Legal Counsel' && "⚖️ Legal Counsel Mode (Fiduciary Claims Audit Sign-Off)"}
                  </span>
                </span>
              </div>
            </div>

            {/* Active View Component */}
            {activeTab === 'dashboard' && (
              <Dashboard
                onNavigateToStudio={() => setActiveTab('studio')}
                onNavigateToApprovals={() => setActiveTab('approvals')}
                onNavigateToKnowledge={() => setActiveTab('knowledge')}
                onNavigateToInsights={() => setActiveTab('insights')}
              />
            )}

            {activeTab === 'studio' && (
              <ContentReviewStudio
                currentRole={currentRole}
                onSubmitForApproval={handleStudioSubmit}
              />
            )}

            {activeTab === 'knowledge' && (
              <BrandKnowledgeHub 
                currentBrand={selectedBrand}
              />
            )}

            {activeTab === 'approvals' && (
              <ReviewApprovalQueue
                currentRole={currentRole}
                onOpenInStudio={handleOpenInStudio}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsAudit />
            )}
          </div>

          {/* Enterprise Footer with Working Policy Modals */}
          <Footer />
        </main>
      </div>

      {/* Global Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#121E36] px-4 py-3 text-xs font-semibold text-white shadow-2xl border border-white/10 flex items-center gap-2 animate-toastIn max-w-sm">
          <span className="h-2 w-2 rounded-full bg-[#50BEB8] shrink-0 animate-pulseRing" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
