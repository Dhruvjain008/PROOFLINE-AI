"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  RotateCcw, 
  Send, 
  Image as ImageIcon,
  BookOpen, 
  Check, 
  ShieldAlert, 
  RefreshCw,
  MessageSquarePlus,
  Zap,
  Clock,
  CheckSquare,
  Eye
} from "lucide-react";
import { Finding, RewriteOption, ReviewItem } from "@/types";
import { sampleRiskyCampaign, initialFindings } from "@/data/mockData";
import { cn, getSeverityBadgeClass, getCategoryBadgeClass } from "@/lib/utils";

interface StudioProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onSubmitForApproval: (updatedItem: Partial<ReviewItem>) => void;
}

const SCAN_STAGES = [
  { label: "Running deterministic regex blacklist checks...", pct: 15 },
  { label: "Extracting visual HEX palette from banner...", pct: 30 },
  { label: "Computing WCAG 2.1 AA contrast ratio...", pct: 48 },
  { label: "Parsing atomic factual claims from draft...", pct: 62 },
  { label: "Cross-referencing Fact-Vault (RAG similarity search)...", pct: 78 },
  { label: "Evaluating brand tone & voice alignment (Gemini 2.5)...", pct: 90 },
  { label: "Compiling evidence-linked findings report...", pct: 100 },
];

export function ContentReviewStudio({ currentRole, onSubmitForApproval }: StudioProps) {
  const [draftText, setDraftText] = useState(sampleRiskyCampaign.content);
  const [originalDraft] = useState(sampleRiskyCampaign.content);
  const [findings, setFindings] = useState<Finding[]>([]);
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStageIdx, setScanStageIdx] = useState(0);
  const [scanPct, setScanPct] = useState(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [exceptionModalOpen, setExceptionModalOpen] = useState(false);
  const [exceptionNote, setExceptionNote] = useState("");
  const [exceptionTargetId, setExceptionTargetId] = useState<string | null>(null);
  const [selectedBannerMode, setSelectedBannerMode] = useState<'risky' | 'compliant'>('risky');
  const [activeTab, setActiveTab] = useState<'editor' | 'diff' | 'visual'>('editor');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const scanInterval = useRef<NodeJS.Timeout | null>(null);

  const resolvedCount = findings.filter(f => f.status === 'applied' || f.status === 'overridden').length;
  const totalFindings = findings.length;
  const complianceScore = totalFindings === 0
    ? (hasScanned ? 98 : 55)
    : Math.min(100, Math.round(55 + (resolvedCount / totalFindings) * 43));

  const selectedFinding = findings.find(f => f.id === selectedFindingId) || findings[0] || null;

  // ─── Cinematic Scan Animation ───
  const handleRunScan = () => {
    setIsScanning(true);
    setScanStageIdx(0);
    setScanPct(0);
    setFindings([]);
    setSelectedFindingId(null);
    setHasScanned(false);

    let idx = 0;
    scanInterval.current = setInterval(() => {
      if (idx < SCAN_STAGES.length) {
        setScanStageIdx(idx);
        setScanPct(SCAN_STAGES[idx].pct);
        idx++;
      } else {
        clearInterval(scanInterval.current!);
        setIsScanning(false);
        setHasScanned(true);
        // Stagger findings appearance
        const allFindings = initialFindings.map(f => ({ ...f, status: 'unresolved' as const }));
        allFindings.forEach((finding, i) => {
          setTimeout(() => {
            setFindings(prev => [...prev, finding]);
            if (i === 0) setSelectedFindingId(finding.id);
          }, i * 160);
        });
      }
    }, 320);
  };

  useEffect(() => {
    return () => { if (scanInterval.current) clearInterval(scanInterval.current); };
  }, []);

  // ─── Apply Suggestion ───
  const handleApplySuggestion = (findingId: string, suggestion: RewriteOption) => {
    const finding = findings.find(f => f.id === findingId);
    if (!finding) return;
    if (draftText.includes(finding.targetText)) {
      setDraftText(prev => prev.replace(finding.targetText, suggestion.text));
    }
    setFindings(prev => prev.map(f =>
      f.id === findingId ? { ...f, status: 'applied', appliedRewriteId: suggestion.id } : f
    ));
    const nextUnresolved = findings.find(f => f.id !== findingId && f.status === 'unresolved');
    if (nextUnresolved) setSelectedFindingId(nextUnresolved.id);
  };

  // ─── Undo ───
  const handleUndo = (findingId: string) => {
    const finding = findings.find(f => f.id === findingId);
    if (!finding) return;
    const appliedSug = finding.suggestions.find(s => s.id === finding.appliedRewriteId);
    if (appliedSug && draftText.includes(appliedSug.text)) {
      setDraftText(prev => prev.replace(appliedSug.text, finding.targetText));
    }
    setFindings(prev => prev.map(f =>
      f.id === findingId ? { ...f, status: 'unresolved', appliedRewriteId: undefined } : f
    ));
  };

  // ─── Exception Request ───
  const openException = (id: string) => {
    setExceptionTargetId(id);
    setExceptionNote("");
    setExceptionModalOpen(true);
  };

  const handleSaveException = () => {
    if (!exceptionNote.trim() || !exceptionTargetId) return;
    setFindings(prev => prev.map(f =>
      f.id === exceptionTargetId ? { ...f, status: 'overridden', exceptionNote } : f
    ));
    setExceptionModalOpen(false);
  };

  // ─── Reset ───
  const handleReset = () => {
    setDraftText(sampleRiskyCampaign.content);
    setFindings([]);
    setSelectedFindingId(null);
    setHasScanned(false);
    setScanPct(0);
    setScanStageIdx(0);
    setSelectedBannerMode('risky');
    setIsSubmitted(false);
  };

  // ─── Score ring ───
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (complianceScore / 100) * circumference;
  const scoreColor = complianceScore >= 85 ? '#50BEB8' : complianceScore >= 70 ? '#D99019' : '#C94C4C';

  return (
    <div className="flex-1 p-4 md:p-6 space-y-5 max-w-7xl mx-auto w-full">

      {/* ─── Studio Header Card ─── */}
      <div className="animate-slideUp anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-4 md:p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center shrink-0">
            <Sparkles className="h-5 w-5 text-[#4C6EF5]" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-sm md:text-base font-bold text-[#121E36]">Content Review Studio</h1>
              <span className="rounded-lg bg-[#FFF1C1] px-2 py-0.5 text-[10px] font-bold text-[#121E36] border border-[#FDE68A]">
                DEMO MODE — {sampleRiskyCampaign.title}
              </span>
            </div>
            <p className="text-xs text-[#69778F] mt-0.5">
              Deterministic Regex + RAG Fact-Vault + Gemini 2.5 Multimodal Inspection
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button onClick={handleReset} className="flex items-center gap-1.5 rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] px-3 py-2 text-xs font-semibold text-[#121E36] hover:bg-slate-100 transition-colors">
            <RefreshCw className="h-3.5 w-3.5 text-[#69778F]" />
            <span>Reset Demo</span>
          </button>
          <button
            onClick={handleRunScan}
            disabled={isScanning}
            className="btn-scan flex items-center gap-2 rounded-xl bg-[#4C6EF5] px-5 py-2 text-xs font-bold text-white shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <Zap className={cn("h-3.5 w-3.5 text-white", isScanning && "animate-spin")} />
            <span>{isScanning ? "Scanning..." : hasScanned ? "Re-Run Pre-Flight Scan" : "Run Pre-Flight Scan"}</span>
          </button>
        </div>
      </div>

      {/* ─── Cinematic Scan Progress ─── */}
      {isScanning && (
        <div className="animate-scaleIn anim-hidden rounded-2xl border border-[#BFDBFE] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="animate-pulseRing h-7 w-7 rounded-full bg-[#4C6EF5] flex items-center justify-center">
                <Zap className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-xs font-bold text-[#1E40AF]">Pre-Flight Scan Running...</span>
            </div>
            <span className="font-mono text-sm font-bold text-[#4C6EF5]">{scanPct}%</span>
          </div>
          <div className="h-2 w-full bg-blue-100 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-gradient-to-r from-[#4C6EF5] to-[#50BEB8] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${scanPct}%` }}
            />
          </div>
          <div className="text-xs text-[#2563EB] font-medium animate-fadeIn" key={scanStageIdx}>
            {SCAN_STAGES[scanStageIdx]?.label}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] text-[#69778F]">
            <div className="rounded-lg bg-white/60 p-2 text-center">
              <div className="font-bold text-[#121E36]">Fact-Vault</div>
              <div>5 Approved Claims</div>
            </div>
            <div className="rounded-lg bg-white/60 p-2 text-center">
              <div className="font-bold text-[#121E36]">Guideline</div>
              <div>Northstar v3.2 — 38 Rules</div>
            </div>
            <div className="rounded-lg bg-white/60 p-2 text-center">
              <div className="font-bold text-[#121E36]">Visual</div>
              <div>WCAG 2.1 AA Threshold</div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Scan Complete Summary ─── */}
      {hasScanned && !isScanning && findings.length > 0 && (
        <div className="animate-bounceIn anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-4 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <svg width="80" height="80" viewBox="0 0 100 100" className="animate-scoreCount anim-hidden">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#E5E8EF" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={scoreColor}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  transform="rotate(-90 50 50)"
                  className="score-ring transition-all duration-1000"
                />
                <text x="50" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#121E36">{complianceScore}</text>
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#121E36]">Pre-Flight Scan Complete</h3>
              <p className="text-xs text-[#69778F]">
                <span className="font-bold text-red-600">{findings.filter(f=>f.severity==='critical').length} Critical</span> &nbsp;•&nbsp;
                <span className="font-bold text-amber-600">{findings.filter(f=>f.severity==='warning').length} Warnings</span> &nbsp;•&nbsp;
                <span className="font-bold text-blue-600">{findings.filter(f=>f.severity==='suggestion').length} Suggestions</span>
              </p>
              <p className="text-xs text-[#69778F] mt-0.5">
                {resolvedCount} of {totalFindings} resolved • Current Compliance Index: <strong style={{color: scoreColor}}>{complianceScore}/100</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-emerald-800 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Fact-Vault Verified</span>
            </div>
            <div className="rounded-lg bg-purple-50 border border-purple-200 px-2.5 py-1.5 text-purple-800 font-semibold flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              <span>WCAG Checked</span>
            </div>
            <div className="rounded-lg bg-orange-50 border border-orange-200 px-2.5 py-1.5 text-orange-800 font-semibold flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              <span>Gemini 2.5 Tone Analysis</span>
            </div>
          </div>
        </div>
      )}

      {/* ─── Empty State before scan ─── */}
      {!hasScanned && !isScanning && (
        <div className="animate-fadeIn anim-hidden rounded-2xl border-2 border-dashed border-[#E5E8EF] bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center mb-4">
            <Sparkles className="h-7 w-7 text-[#4C6EF5]" />
          </div>
          <h2 className="text-base font-bold text-[#121E36] mb-1">Ready for Pre-Flight Inspection</h2>
          <p className="text-xs text-[#69778F] max-w-sm mx-auto mb-4">
            A risky Northstar Financial campaign draft has been pre-loaded. Click <strong>"Run Pre-Flight Scan"</strong> to trigger multi-layer compliance analysis.
          </p>
          <button
            onClick={handleRunScan}
            className="btn-scan inline-flex items-center gap-2 rounded-xl bg-[#4C6EF5] px-6 py-2.5 text-xs font-bold text-white shadow-md"
          >
            <Zap className="h-4 w-4" />
            <span>Run Pre-Flight Scan →</span>
          </button>
        </div>
      )}

      {/* ─── Main Studio Grid ─── */}
      {hasScanned && !isScanning && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

          {/* LEFT: Draft Editor (7 cols) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Tab Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-1.5 bg-[#FAF7EF] p-1 rounded-xl border border-[#E5E8EF]">
                {(['editor', 'diff', 'visual'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all",
                      activeTab === tab
                        ? "bg-[#121E36] text-white shadow-sm"
                        : "text-[#69778F] hover:text-[#121E36]"
                    )}
                  >
                    {tab === 'editor' && <FileText className="h-3 w-3" />}
                    {tab === 'diff' && <Eye className="h-3 w-3" />}
                    {tab === 'visual' && <ImageIcon className="h-3 w-3" />}
                    <span>{tab === 'editor' ? 'Draft + Highlights' : tab === 'diff' ? 'Side-by-Side Diff' : 'Visual & WCAG'}</span>
                    {tab === 'diff' && resolvedCount > 0 && <span className="h-1.5 w-1.5 rounded-full bg-[#50BEB8]" />}
                  </button>
                ))}
              </div>
              {/* Live Compliance Pill */}
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold border",
                complianceScore >= 85 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
              )}>
                Compliance: {complianceScore} / 100
              </span>
            </div>

            {/* ─── EDITOR TAB ─── */}
            {activeTab === 'editor' && (
              <div className="animate-fadeIn rounded-2xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs text-[#69778F]">
                  <div className="flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-[#4C6EF5]" />
                    <span>LinkedIn Sponsored Post — Interactive Highlights</span>
                  </div>
                  <span className="text-[10px]">Click underlined phrases to inspect findings</span>
                </div>

                {/* Interactive In-line Highlights */}
                <div className="rounded-xl border border-[#E5E8EF] bg-[#FAF7EF] p-4 text-sm leading-loose text-[#121E36] font-medium min-h-[130px]">
                  <p>
                    At Northstar Financial, we are proud to offer a{" "}
                    <button
                      onClick={() => setSelectedFindingId("find-03")}
                      className={cn("flagged-warning font-semibold rounded", selectedFindingId === "find-03" && "selected", findings.find(f=>f.id==="find-03")?.status === 'applied' && "flagged-applied")}
                    >
                      foolproof
                    </button>{" "}
                    wealth strategy delivering{" "}
                    <button
                      onClick={() => setSelectedFindingId("find-01")}
                      className={cn("flagged-critical font-semibold rounded", selectedFindingId === "find-01" && "selected", findings.find(f=>f.id==="find-01")?.status === 'applied' && "flagged-applied")}
                    >
                      guaranteed 18% annual returns
                    </button>{" "}
                    for every investor. With over{" "}
                    <button
                      onClick={() => setSelectedFindingId("find-02")}
                      className={cn("flagged-critical font-semibold rounded", selectedFindingId === "find-02" && "selected", findings.find(f=>f.id==="find-02")?.status === 'applied' && "flagged-applied")}
                    >
                      $25 Billion in active assets under management
                    </button>{" "}
                    and our{" "}
                    <button
                      onClick={() => setSelectedFindingId("find-05")}
                      className={cn("flagged-suggestion font-semibold rounded", selectedFindingId === "find-05" && "selected", findings.find(f=>f.id==="find-05")?.status === 'applied' && "flagged-applied")}
                    >
                      revolutionary AI engine
                    </button>
                    , our portfolios ensure market-beating performance with{" "}
                    <button
                      onClick={() => setSelectedFindingId("find-04")}
                      className={cn("flagged-warning font-semibold rounded", selectedFindingId === "find-04" && "selected", findings.find(f=>f.id==="find-04")?.status === 'applied' && "flagged-applied")}
                    >
                      zero downside risk
                    </button>
                    . Connect with our certified advisors today to secure your financial freedom.
                  </p>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-3 text-[10px] text-[#69778F]">
                  <div className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-red-100 border-b-2 border-red-500" />Critical</div>
                  <div className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-amber-100 border-b-2 border-amber-500" />Warning</div>
                  <div className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-blue-100 border-b border-blue-500" />Suggestion</div>
                  <div className="flex items-center gap-1.5"><span className="h-2 w-5 rounded bg-teal-100 border-b-2 border-teal-500 opacity-70" />Applied ✓</div>
                </div>

                {/* Working Draft Textarea */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#121E36]">
                    <span>Live Working Draft (Editable — updates as fixes apply)</span>
                    <span className="text-[11px] text-[#69778F] font-normal">{draftText.split(" ").length} words</span>
                  </div>
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    className="w-full h-24 p-3 rounded-xl border border-[#E5E8EF] bg-white text-xs text-[#121E36] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/30 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E8EF]">
                  <span className="text-xs text-[#69778F]">
                    {resolvedCount}/{totalFindings} issues resolved
                    {resolvedCount < totalFindings && <span className="text-amber-600 font-semibold ml-1">— fix critical issues first</span>}
                  </span>
                  <button
                    onClick={() => { onSubmitForApproval({ draftContent: draftText, complianceScore }); setIsSubmitted(true); }}
                    disabled={isSubmitted}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold text-white shadow-sm transition-all",
                      isSubmitted ? "bg-[#50BEB8] cursor-default" : complianceScore >= 80 ? "btn-scan bg-[#121E36]" : "btn-scan bg-amber-600"
                    )}
                  >
                    {isSubmitted ? <><Check className="h-3.5 w-3.5" /><span>Submitted ✓</span></> : <><Send className="h-3.5 w-3.5" /><span>Submit for Manager Sign-Off</span></>}
                  </button>
                </div>
              </div>
            )}

            {/* ─── DIFF TAB ─── */}
            {activeTab === 'diff' && (
              <div className="animate-fadeIn rounded-2xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4">
                <p className="text-xs text-[#69778F]">Git-style comparison — apply suggestions to see changes reflected on the right.</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-red-200 bg-red-50/40 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-red-900 border-b border-red-200 pb-1.5 text-[11px]">
                      <span>Original Draft</span>
                      <span className="bg-red-100 px-1.5 py-0.5 rounded text-[10px]">Pre-Scan</span>
                    </div>
                    <p className="text-red-950/80 leading-relaxed">{originalDraft}</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-emerald-900 border-b border-emerald-200 pb-1.5 text-[11px]">
                      <span>Harmonized Draft</span>
                      <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded text-[10px]">Compliant</span>
                    </div>
                    <p className="text-emerald-950 leading-relaxed font-medium">{draftText}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── VISUAL TAB ─── */}
            {activeTab === 'visual' && (
              <div className="animate-fadeIn rounded-2xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4">
                <p className="text-xs text-[#69778F] font-semibold">LinkedIn Banner Inspection (1200×628) — Deterministic Pixel Math</p>
                {/* Banner mockup */}
                <div
                  className="relative rounded-xl overflow-hidden p-8 min-h-[160px] flex flex-col justify-between transition-all duration-700"
                  style={{ backgroundColor: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#FFF1C1]">Northstar Financial</span>
                    <span className="text-[10px] rounded px-2 py-0.5 bg-black/30 font-mono text-white">
                      {selectedBannerMode === 'risky' ? 'RISKY: Off-brand #8B5CF6' : 'COMPLIANT: Approved #121E36'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight mb-1 transition-colors duration-700"
                      style={{ color: selectedBannerMode === 'risky' ? '#A78BFA' : '#FFFFFF' }}
                    >
                      Institutional Stewardship & Global Wealth
                    </h3>
                    <p className="text-xs text-white/80">Dual SEC & FCA Regulated Fiduciary</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Extracted HEX", value: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36', pass: selectedBannerMode !== 'risky', dot: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36' },
                    { label: "WCAG Contrast", value: selectedBannerMode === 'risky' ? '2.9:1 FAIL' : '6.8:1 PASS', pass: selectedBannerMode !== 'risky', dot: null },
                    { label: "Palette Match", value: selectedBannerMode === 'risky' ? '42% Warning' : '98% Approved', pass: selectedBannerMode !== 'risky', dot: null }
                  ].map(m => (
                    <div key={m.label} className={cn("rounded-xl border p-3 text-xs transition-all", m.pass ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50")}>
                      <div className={cn("text-[11px] mb-1 font-medium", m.pass ? "text-emerald-700" : "text-red-700")}>{m.label}</div>
                      <div className="flex items-center gap-1.5 font-bold text-[#121E36]">
                        {m.dot && <span className="h-3 w-3 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: m.dot }} />}
                        <span>{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedBannerMode(p => p === 'risky' ? 'compliant' : 'risky')}
                  className="w-full btn-scan flex items-center justify-center gap-2 rounded-xl bg-[#4C6EF5] py-2.5 text-xs font-bold text-white shadow-sm"
                >
                  {selectedBannerMode === 'risky'
                    ? '1-Click Harmonize Banner to Approved Navy (#121E36) →'
                    : '← Revert to Original Off-Brand Banner (Demo)'}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Evidence & Findings Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">

            {/* Finding Chips */}
            <div className="rounded-2xl border border-[#E5E8EF] bg-white p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#69778F]">Detected Issues ({findings.length})</span>
                <span className="text-[#69778F]">{findings.filter(f=>f.severity==='critical').length}C · {findings.filter(f=>f.severity==='warning').length}W · {findings.filter(f=>f.severity==='suggestion').length}S</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {findings.map((f, idx) => {
                  const isSelected = f.id === selectedFindingId;
                  const isResolved = f.status === 'applied' || f.status === 'overridden';
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFindingId(f.id)}
                      style={{ animationDelay: `${idx * 80}ms` }}
                      className={cn(
                        "animate-findingSlide anim-hidden px-2.5 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 transition-all",
                        isSelected ? "bg-[#121E36] text-white shadow-sm" :
                        isResolved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        getSeverityBadgeClass(f.severity)
                      )}
                    >
                      #{idx + 1} {f.category.toUpperCase()}
                      {isResolved && <Check className="h-3 w-3" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evidence Card */}
            {selectedFinding && (
              <div key={selectedFinding.id} className="animate-slideInLeft anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4">
                {/* Header */}
                <div className="space-y-2 pb-3 border-b border-[#E5E8EF]">
                  <div className="flex items-center justify-between">
                    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold uppercase", getSeverityBadgeClass(selectedFinding.severity))}>
                      {selectedFinding.severity}
                    </span>
                    <span className={cn("px-2 py-0.5 rounded-md text-[10px] font-bold", getCategoryBadgeClass(selectedFinding.category))}>
                      {selectedFinding.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-[#121E36] leading-snug">{selectedFinding.ruleName}</h3>
                  <span className="text-[11px] font-mono text-[#69778F]">{selectedFinding.ruleCode}</span>
                </div>

                {/* 1. WHAT */}
                <div className="rounded-xl bg-red-50/70 border border-red-200 p-3 text-xs text-red-950">
                  <span className="block text-[10px] font-bold text-red-700 uppercase tracking-wider mb-1">① What is Wrong:</span>
                  <span className="font-semibold italic">"{selectedFinding.targetText}"</span>
                </div>

                {/* 2. WHY */}
                <div className="text-xs text-[#121E36] leading-relaxed">
                  <span className="block text-[10px] font-bold text-[#69778F] uppercase tracking-wider mb-1">② Why It Matters:</span>
                  <p>{selectedFinding.explanation}</p>
                </div>

                {/* 3. EVIDENCE SOURCE */}
                <div className="rounded-xl border border-blue-200 bg-[#EFF6FF] p-3 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#1E40AF]">
                    <BookOpen className="h-3.5 w-3.5 text-[#4C6EF5]" />
                    <span>③ Approved Evidence Citation</span>
                  </div>
                  <div className="text-[11px] text-[#1E3A8A]"><strong>Source:</strong> {selectedFinding.evidenceSource.docName}</div>
                  <div className="text-[11px] text-[#1E3A8A]"><strong>Ref:</strong> {selectedFinding.evidenceSource.pageRef}</div>
                  {selectedFinding.evidenceSource.verifiedFact && (
                    <div className="mt-1 text-[11px] rounded-lg bg-white/80 p-2 border border-blue-200 text-blue-900 font-medium">
                      ✓ Fact-Vault: "{selectedFinding.evidenceSource.verifiedFact}"
                    </div>
                  )}
                </div>

                {/* 4. REWRITES */}
                {selectedFinding.suggestions.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#E5E8EF]">
                    <div className="flex items-center justify-between text-[11px] font-bold text-[#121E36]">
                      <span>④ Intent-Preserving Rewrites:</span>
                      <span className="text-[#50BEB8] font-semibold">1-Click Apply</span>
                    </div>
                    {selectedFinding.suggestions.map((sug) => {
                      const isApplied = selectedFinding.appliedRewriteId === sug.id;
                      return (
                        <div key={sug.id} className={cn("rounded-xl border p-3 text-xs transition-all", isApplied ? "border-emerald-300 bg-emerald-50/60" : "border-[#E5E8EF] bg-[#FAF7EF] hover:border-[#4C6EF5]")}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-bold text-[#4C6EF5] uppercase">{sug.label}</span>
                            {isApplied ? (
                              <button onClick={() => handleUndo(selectedFinding.id)} className="flex items-center gap-1 text-[10px] font-semibold text-[#69778F] hover:text-red-600">
                                <RotateCcw className="h-3 w-3" /><span>Undo</span>
                              </button>
                            ) : (
                              <button onClick={() => handleApplySuggestion(selectedFinding.id, sug)} className="flex items-center gap-1 rounded-lg bg-[#121E36] px-2 py-1 text-[10px] font-bold text-white hover:bg-[#1E2D4A]">
                                <Check className="h-3 w-3 text-[#FFF1C1]" /><span>Apply Fix</span>
                              </button>
                            )}
                          </div>
                          <p className="font-semibold text-[#121E36] mb-0.5">"{sug.text}"</p>
                          <p className="text-[11px] text-[#69778F]">{sug.explanation}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Exception Button */}
                <div className="pt-2 border-t border-[#E5E8EF]">
                  {selectedFinding.status === 'overridden' ? (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-amber-900 text-[11px]">
                      <strong>Exception Requested:</strong> "{selectedFinding.exceptionNote}"
                    </div>
                  ) : (
                    <button onClick={() => openException(selectedFinding.id)} className="flex items-center gap-1.5 text-xs text-[#69778F] hover:text-[#121E36] font-medium">
                      <MessageSquarePlus className="h-3.5 w-3.5 text-[#D99019]" />
                      <span>Request Intentional Exception...</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Exception Modal ─── */}
      {exceptionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="animate-scaleIn anim-hidden w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4 border border-[#E5E8EF]">
            <div className="flex items-center gap-2 font-bold text-[#121E36]">
              <ShieldAlert className="h-5 w-5 text-[#D99019]" />
              <span>Request Human Override / Creative Exception</span>
            </div>
            <p className="text-xs text-[#69778F]">
              Describe your creative justification for rule <strong>{findings.find(f=>f.id===exceptionTargetId)?.ruleCode}</strong>. This routes directly to the Brand Manager for final human decision.
            </p>
            <textarea
              value={exceptionNote}
              onChange={(e) => setExceptionNote(e.target.value)}
              placeholder="e.g. Approved exception for Zurich Summit keynote campaign context..."
              className="w-full h-24 p-3 rounded-xl border border-[#E5E8EF] text-xs text-[#121E36] focus:outline-none focus:ring-2 focus:ring-[#4C6EF5]/30 resize-none"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setExceptionModalOpen(false)} className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#69778F] hover:bg-slate-100">Cancel</button>
              <button onClick={handleSaveException} className="btn-scan px-4 py-1.5 rounded-xl bg-[#D99019] text-xs font-bold text-white shadow-sm">Submit Exception</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
