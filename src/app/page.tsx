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
  const [currentRole, setCurrentRole] = useState<'Creator' | 'Brand Manager' | 'Legal Counsel'>('Creator');
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
          currentBrand={selectedBrand}
          currentRole={currentRole}
        />

        <main className="flex-1 min-w-0 overflow-y-auto flex flex-col justify-between min-h-[calc(100vh-3.5rem)]">
          <div className="p-3 md:p-5 space-y-3.5 flex-1">
            
            {/* Step-by-Step Governance Lifecycle Ribbon & Role Switcher */}
            <div className="rounded-xl border border-[#E5E8EF] bg-white p-3 shadow-2xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E8EF] pb-2 text-xs">
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

                <div className="text-[11px] text-[#69778F]">
                  Governance Lifecycle: <strong className="text-[#121E36]">Step 1 (Draft) → Step 2 (Approve) → Step 3 (Fiduciary Audit)</strong>
                </div>
              </div>

              {/* 3-Step Interactive Persona Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => handleRoleChange('Creator')}
                  className={`p-2 rounded-lg border text-left transition-all flex items-start gap-2 ${
                    currentRole === 'Creator'
                      ? "bg-teal-50/80 border-teal-300 text-teal-950 ring-1 ring-teal-400 shadow-2xs"
                      : "bg-[#FAF7EF] border-[#E5E8EF] text-[#69778F] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">✏️</span>
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>Step 1: Content Creator</span>
                      {currentRole === 'Creator' && <span className="text-[9px] bg-teal-200 text-teal-900 px-1 rounded font-bold">Active Persona</span>}
                    </div>
                    <p className="text-[10px] text-[#69778F]">Drafts copy, runs pre-flight scans, applies 1-click rewrites.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('Brand Manager')}
                  className={`p-2 rounded-lg border text-left transition-all flex items-start gap-2 ${
                    currentRole === 'Brand Manager'
                      ? "bg-blue-50/80 border-blue-300 text-blue-950 ring-1 ring-blue-400 shadow-2xs"
                      : "bg-[#FAF7EF] border-[#E5E8EF] text-[#69778F] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">🛡️</span>
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>Step 2: Brand Manager</span>
                      {currentRole === 'Brand Manager' && <span className="text-[9px] bg-blue-200 text-blue-900 px-1 rounded font-bold">Active Persona</span>}
                    </div>
                    <p className="text-[10px] text-[#69778F]">Reviews stage-gate queue, approves syndication, grants exceptions.</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleChange('Legal Counsel')}
                  className={`p-2 rounded-lg border text-left transition-all flex items-start gap-2 ${
                    currentRole === 'Legal Counsel'
                      ? "bg-amber-50/80 border-amber-300 text-amber-950 ring-1 ring-amber-400 shadow-2xs"
                      : "bg-[#FAF7EF] border-[#E5E8EF] text-[#69778F] hover:bg-slate-50"
                  }`}
                >
                  <span className="text-base leading-none">⚖️</span>
                  <div>
                    <div className="font-bold flex items-center gap-1">
                      <span>Step 3: Legal Counsel</span>
                      {currentRole === 'Legal Counsel' && <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-bold">Active Persona</span>}
                    </div>
                    <p className="text-[10px] text-[#69778F]">Fiduciary audit verification, SEC/FDA certification, audit hashes.</p>
                  </div>
                </button>
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
                currentBrand={selectedBrand}
                onSubmitForApproval={handleStudioSubmit}
              />
            )}

            {activeTab === 'knowledge' && (
              <BrandKnowledgeHub 
                currentBrand={selectedBrand}
                currentRole={currentRole}
                onTestFactInStudio={(fact) => {
                  setActiveTab('studio');
                  showToast(`Loaded "${fact.claim}" into Studio for pre-flight testing!`);
                }}
              />
            )}

            {activeTab === 'approvals' && (
              <ReviewApprovalQueue
                currentRole={currentRole}
                currentBrand={selectedBrand}
                onRoleChange={handleRoleChange}
                onOpenInStudio={handleOpenInStudio}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsAudit 
                currentBrand={selectedBrand}
                currentRole={currentRole}
              />
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
