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
import { seededReviewQueue } from "@/data/mockData";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [currentRole, setCurrentRole] = useState<'Creator' | 'Brand Manager' | 'Legal Counsel'>('Brand Manager');
  const [reviewQueue, setReviewQueue] = useState<ReviewItem[]>(seededReviewQueue);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
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
        onRoleChange={setCurrentRole}
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
          <div className="p-2 md:p-3">
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
              <BrandKnowledgeHub />
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
