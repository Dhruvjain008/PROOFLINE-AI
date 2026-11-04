"use client";

import React, { useState } from "react";
import { 
  CheckSquare, 
  Search, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  MessageSquare, 
  Clock, 
  Send, 
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight,
  Filter
} from "lucide-react";
import { ReviewItem, ReviewStatus, ReviewComment, BrandProfile } from "@/types";
import { seededReviewQueue } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface ApprovalsProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onOpenInStudio: (item: ReviewItem) => void;
  onRoleChange?: (role: 'Creator' | 'Brand Manager' | 'Legal Counsel') => void;
  currentBrand?: BrandProfile;
}

export function ReviewApprovalQueue({ 
  currentRole, 
  onOpenInStudio, 
  onRoleChange,
  currentBrand 
}: ApprovalsProps) {
  const [items, setItems] = useState<ReviewItem[]>(seededReviewQueue);
  const [selectedItemId, setSelectedItemId] = useState<string>("rev-101");
  const [statusFilter, setStatusFilter] = useState<'all' | ReviewStatus>('all');
  const [newCommentText, setNewCommentText] = useState("");

  const filteredItems = items.filter(item => {
    if (statusFilter === 'all') return true;
    return item.status === statusFilter;
  });

  const selectedItem = items.find(i => i.id === selectedItemId) || items[0];

  const handleUpdateStatus = (status: ReviewStatus) => {
    setItems(prev => prev.map(item => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          status: status
        };
      }
      return item;
    }));
  };

  const handleAddComment = () => {
    if (!newCommentText.trim()) return;

    const newComment: ReviewComment = {
      id: `comm-${Date.now()}`,
      author: currentRole === 'Legal Counsel' ? 'David Vance' : 'Sarah Chen',
      role: currentRole,
      avatar: currentRole === 'Legal Counsel' ? 'DV' : 'SC',
      message: newCommentText,
      timestamp: "Just now"
    };

    setItems(prev => prev.map(item => {
      if (item.id === selectedItemId) {
        return {
          ...item,
          comments: [...item.comments, newComment]
        };
      }
      return item;
    }));

    setNewCommentText("");
  };

  return (
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="animate-slideUp anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#1D4ED8] border border-[#BFDBFE]">
              Human-in-the-Loop Governance
            </span>
            <span className="text-xs text-[#69778F]">Audit-Trail Enabled</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#121E36]">
            Stage-Gate Review & Sign-Off Queue
          </h1>
          <p className="text-xs text-[#69778F] max-w-xl mt-1">
            Authorized Brand Managers and Legal Counsel review AI pre-flight findings, creator exception notes, and execute formal sign-offs.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7EF] p-1.5 rounded-xl border border-[#E5E8EF] text-xs">
          {(['all', 'in_review', 'pending', 'changes_requested', 'approved', 'exception_granted'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                "px-2.5 py-1 rounded-lg font-semibold transition-all capitalize",
                statusFilter === st
                  ? "bg-[#121E36] text-white shadow-sm"
                  : "text-[#69778F] hover:text-[#121E36]"
              )}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Queue List (4 cols) vs Selected Detail Panel (8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Queue List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#69778F] px-1">
            Campaign Submissions ({filteredItems.length})
          </div>

          <div className="space-y-2.5">
            {filteredItems.map((item, i) => {
              const isSelected = item.id === selectedItemId;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemId(item.id)}
                  className={cn(
                    "animate-slideUp anim-hidden card-lift rounded-xl border p-4 text-xs cursor-pointer transition-all space-y-2.5",
                    i === 0 && "delay-100",
                    i === 1 && "delay-200",
                    i === 2 && "delay-300",
                    i >= 3 && "delay-400",
                    isSelected
                      ? "border-[#4C6EF5] bg-white shadow-md ring-1 ring-[#4C6EF5]"
                      : "border-[#E5E8EF] bg-white hover:border-slate-300 shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-700">
                      {item.channel}
                    </span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                      item.status === 'approved' 
                        ? 'bg-emerald-50 text-emerald-800' 
                        : item.status === 'in_review'
                          ? 'bg-blue-50 text-blue-800'
                          : item.status === 'exception_granted'
                            ? 'bg-purple-50 text-purple-800'
                            : 'bg-amber-50 text-amber-800'
                    )}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#121E36] line-clamp-1 text-sm">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between text-[11px] text-[#69778F] pt-1 border-t border-[#E5E8EF]">
                    <span>By: {item.creator.name}</span>
                    <span className="font-semibold text-[#121E36]">Score: {item.complianceScore}/100</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Review Detail Panel */}
        {selectedItem && (
          <div className="animate-fadeIn lg:col-span-7 rounded-xl border border-[#E5E8EF] bg-white p-6 shadow-sm space-y-6">
            
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-[#E5E8EF] pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#4C6EF5] tracking-wider block mb-1">
                  Submission ID: {selectedItem.id} • {selectedItem.channel}
                </span>
                <h2 className="text-lg font-bold text-[#121E36]">
                  {selectedItem.title}
                </h2>
                <p className="text-xs text-[#69778F] mt-0.5">
                  Submitted by {selectedItem.creator.name} ({selectedItem.creator.role}) • {selectedItem.submittedAt}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-semibold text-[#69778F] block">Compliance Index</span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold inline-block mt-0.5",
                  selectedItem.complianceScore >= 85 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                )}>
                  {selectedItem.complianceScore} / 100
                </span>
              </div>
            </div>

            {/* Content Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#69778F]">
                Submitted Copy Preview
              </span>
              <div className="rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] p-4 text-xs leading-relaxed text-[#121E36] font-medium">
                {selectedItem.draftContent}
              </div>
            </div>

            {/* Findings Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#69778F]">
                  Pre-Flight Audit Findings ({selectedItem.findings.length})
                </span>
                <button
                  onClick={() => onOpenInStudio(selectedItem)}
                  className="font-semibold text-[#4C6EF5] hover:underline flex items-center gap-1"
                >
                  <span>Open in Diff Studio</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {selectedItem.findings.length === 0 ? (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 font-semibold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Zero compliance violations detected. Content is verified against Northstar v3.2 standards.</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {selectedItem.findings.slice(0, 3).map((f) => (
                    <div key={f.id} className="rounded-lg border border-[#E5E8EF] p-2.5 text-xs flex items-center justify-between bg-white">
                      <div>
                        <strong className="text-red-700 font-mono text-[11px] block">{f.ruleCode}</strong>
                        <span className="text-[#121E36]">{f.ruleName}</span>
                      </div>
                      <span className="text-[10px] bg-slate-100 text-[#69778F] px-2 py-0.5 rounded uppercase font-bold">
                        {f.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviewer Comment Thread */}
            <div className="space-y-3 pt-2 border-t border-[#E5E8EF]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#69778F]">
                Reviewer Collaboration History
              </span>

              <div className="space-y-2.5 max-h-48 overflow-y-auto">
                {selectedItem.comments.map((comm) => (
                  <div key={comm.id} className="rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] p-3 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded-full bg-[#121E36] text-white flex items-center justify-center font-bold text-[9px]">
                          {comm.avatar}
                        </span>
                        <span className="font-bold text-[#121E36]">{comm.author}</span>
                        <span className="text-[10px] text-[#69778F]">({comm.role})</span>
                      </div>
                      <span className="text-[10px] text-[#69778F]">{comm.timestamp}</span>
                    </div>
                    <p className="text-[#121E36] pl-7">{comm.message}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder={`Add feedback as ${currentRole}...`}
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 p-2 rounded-lg border border-[#E5E8EF] text-xs text-[#121E36] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5]"
                />
                <button
                  onClick={handleAddComment}
                  className="rounded-lg bg-[#121E36] p-2 text-white hover:bg-[#1E2D4A]"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Stage-Gate Human Decision Actions (Role-Adaptive) */}
            <div className="pt-4 border-t border-[#E5E8EF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#69778F]">Active Role:</span>
                <span className={cn(
                  "px-2 py-0.5 rounded text-[11px] font-bold border",
                  currentRole === 'Creator' ? "bg-teal-50 text-teal-800 border-teal-200" :
                  currentRole === 'Brand Manager' ? "bg-blue-50 text-blue-800 border-blue-200" :
                  "bg-amber-50 text-amber-900 border-amber-200"
                )}>
                  {currentRole === 'Creator' && "✏️ Content Creator"}
                  {currentRole === 'Brand Manager' && "🛡️ Brand Manager (Approver)"}
                  {currentRole === 'Legal Counsel' && "⚖️ Legal & Compliance (Sign-Off)"}
                </span>
              </div>

              {currentRole === 'Creator' ? (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                    🔒 Self-approval restricted: Policy prevents creators from approving own campaigns.
                  </span>
                  <button
                    onClick={() => onRoleChange?.('Brand Manager')}
                    className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#4C6EF5] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#3b5bdb]"
                  >
                    <span>Switch Role to Brand Manager to Approve →</span>
                  </button>
                  <button
                    onClick={() => onOpenInStudio(selectedItem)}
                    className="rounded-lg border border-[#E5E8EF] bg-white px-3 py-1.5 text-xs font-semibold text-[#121E36] hover:bg-slate-50"
                  >
                    Edit in Studio
                  </button>
                </div>
              ) : currentRole === 'Legal Counsel' ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus('changes_requested')}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Request Legal Revisions
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('approved')}
                    className="btn-scan rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 flex items-center gap-1.5"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#FFF1C1]" />
                    <span>Execute Fiduciary Legal Sign-Off</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpdateStatus('changes_requested')}
                    className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Request Revisions
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('exception_granted')}
                    className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-100"
                  >
                    Grant Exception
                  </button>
                  <button
                    onClick={() => handleUpdateStatus('approved')}
                    className="btn-scan rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700"
                  >
                    Approve for Syndication
                  </button>
                </div>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
