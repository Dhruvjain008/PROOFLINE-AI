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
  ShieldCheck,
  RefreshCw, 
  MessageSquarePlus, 
  Zap, 
  Eye,
  PenTool,
  Layers,
  ArrowRight
} from "lucide-react";
import { Finding, RewriteOption, ReviewItem, BrandProfile } from "@/types";
import { 
  sampleCampaignPresets, 
  scanDynamicContent, 
  CampaignPreset,
  northstarBrand 
} from "@/data/mockData";
import { cn, getSeverityBadgeClass, getCategoryBadgeClass } from "@/lib/utils";

interface StudioProps {
  currentRole: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  onSubmitForApproval: (updatedItem: Partial<ReviewItem>) => void;
  currentBrand?: BrandProfile;
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

export function ContentReviewStudio({ currentRole, onSubmitForApproval, currentBrand = northstarBrand }: StudioProps) {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("preset-1");
  const [draftText, setDraftText] = useState(sampleCampaignPresets[0].content);
  const [originalDraft, setOriginalDraft] = useState(sampleCampaignPresets[0].content);

  // Synchronize draft when brand changes
  useEffect(() => {
    if (currentBrand) {
      if (currentBrand.name.includes("Apex")) {
        const apexDraft = "At Apex Health Technologies, our clinical sequencing platform guarantees a 100% cure rate with over 500,000 patient cohorts and miracle genomic treatment protocols.";
        setDraftText(apexDraft);
        setOriginalDraft(apexDraft);
        setSelectedPresetId('custom');
        setHasScanned(false);
      } else if (currentBrand.name.includes("CloudScale")) {
        const cloudDraft = "CloudScale Systems guarantees 100% unbreakable cloud security and zero latency downtime across any global mission-critical infrastructure.";
        setDraftText(cloudDraft);
        setOriginalDraft(cloudDraft);
        setSelectedPresetId('custom');
        setHasScanned(false);
      }
    }
  }, [currentBrand?.name]);
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

  const activePreset = sampleCampaignPresets.find(p => p.id === selectedPresetId) || null;

  const resolvedCount = findings.filter(f => f.status === 'applied' || f.status === 'overridden').length;
  const totalFindings = findings.length;
  const complianceScore = totalFindings === 0
    ? (hasScanned ? 98 : 55)
    : Math.min(100, Math.round(55 + (resolvedCount / totalFindings) * 43));

  const selectedFinding = findings.find(f => f.id === selectedFindingId) || findings[0] || null;

  // ─── Switch Preset / Custom Draft ───
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    setFindings([]);
    setSelectedFindingId(null);
    setHasScanned(false);
    setIsSubmitted(false);
    setSelectedBannerMode('risky');

    if (presetId === 'custom') {
      const customStarter = "At Northstar Financial, our innovative platform delivers guaranteed 20% annual returns with over $50 Billion AUM and foolproof downside protection.";
      setDraftText(customStarter);
      setOriginalDraft(customStarter);
    } else {
      const preset = sampleCampaignPresets.find(p => p.id === presetId);
      if (preset) {
        setDraftText(preset.content);
        setOriginalDraft(preset.content);
      }
    }
  };

  // ─── Run Pre-Flight Scan ───
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

        // Determine which findings to display
        let targetFindings: Finding[] = [];
        if (selectedPresetId === 'custom') {
          targetFindings = scanDynamicContent(draftText, selectedBannerMode === 'compliant');
        } else {
          const preset = sampleCampaignPresets.find(p => p.id === selectedPresetId);
          targetFindings = preset ? preset.initialFindings : sampleCampaignPresets[0].initialFindings;
        }

        const initializedFindings = targetFindings.map(f => ({ ...f, status: 'unresolved' as const }));
        initializedFindings.forEach((finding, i) => {
          setTimeout(() => {
            setFindings(prev => [...prev, finding]);
            if (i === 0) setSelectedFindingId(finding.id);
          }, i * 140);
        });
      }
    }, 280);
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

  // ─── Undo Fix ───
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
    handleSelectPreset(selectedPresetId);
  };

  // ─── Score Calculation ───
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (complianceScore / 100) * circumference;
  const scoreColor = complianceScore >= 85 ? '#50BEB8' : complianceScore >= 70 ? '#D99019' : '#C94C4C';

  // ─── Dynamic Inline Text Highlighting ───
  const renderInteractiveText = () => {
    if (!findings || findings.length === 0) {
      return <p className="leading-relaxed">{draftText}</p>;
    }

    const matches: { start: number; end: number; finding: Finding }[] = [];
    findings.forEach(f => {
      if (!f.targetText) return;
      const idx = draftText.indexOf(f.targetText);
      if (idx !== -1) {
        matches.push({ start: idx, end: idx + f.targetText.length, finding: f });
      }
    });

    matches.sort((a, b) => a.start - b.start);

    const cleanMatches: typeof matches = [];
    let lastEnd = 0;
    for (const m of matches) {
      if (m.start >= lastEnd) {
        cleanMatches.push(m);
        lastEnd = m.end;
      }
    }

    if (cleanMatches.length === 0) {
      return <p className="leading-relaxed">{draftText}</p>;
    }

    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    cleanMatches.forEach((m, i) => {
      if (m.start > cursor) {
        nodes.push(draftText.slice(cursor, m.start));
      }

      const f = m.finding;
      const isSelected = selectedFindingId === f.id;
      const isApplied = f.status === 'applied';

      const badgeClass = f.severity === 'critical' 
        ? 'flagged-critical' 
        : f.severity === 'warning' 
          ? 'flagged-warning' 
          : 'flagged-suggestion';

      nodes.push(
        <button
          key={`match-${f.id}-${i}`}
          onClick={() => setSelectedFindingId(f.id)}
          className={cn(
            badgeClass,
            "font-semibold rounded inline-block mx-0.5",
            isSelected && "selected",
            isApplied && "flagged-applied"
          )}
          title={`Click to inspect ${f.category} issue`}
        >
          {draftText.slice(m.start, m.end)}
        </button>
      );

      cursor = m.end;
    });

    if (cursor < draftText.length) {
      nodes.push(draftText.slice(cursor));
    }

    return <p className="leading-relaxed">{nodes}</p>;
  };

  return (
    <div className="flex-1 p-3.5 md:p-5 space-y-3.5 max-w-7xl mx-auto w-full">

      {/* ─── Studio Toolbar & Preset Switcher ─── */}
      <div className="rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-xs space-y-2.5">
        
        {/* Row 1: Studio Title & Action Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E8EF] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#4C6EF5]">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-[#121E36]">Content Review Studio</h1>
                <span className="text-[10px] bg-[#FAF7EF] border border-[#E5E8EF] px-1.5 py-0.2 rounded font-mono text-[#69778F]">
                  Pre-Flight Intercept
                </span>
              </div>
              <p className="text-[10px] text-[#69778F]">Deterministic Regex • Fact-Vault RAG • W3C WCAG 2.1 AA Analysis</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleReset} 
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#E5E8EF] text-xs font-medium text-[#69778F] hover:text-[#121E36] hover:bg-slate-50 transition-colors"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="btn-scan flex items-center gap-1.5 rounded-lg bg-[#4C6EF5] px-4 py-1.5 text-xs font-bold text-white shadow-sm disabled:opacity-60 disabled:cursor-not-allowed shrink-0 whitespace-nowrap"
            >
              <Zap className={cn("h-3.5 w-3.5", isScanning && "animate-spin")} />
              <span>{isScanning ? "Scanning..." : hasScanned ? "Re-Scan Draft" : "Run Pre-Flight Scan"}</span>
            </button>
          </div>
        </div>

        {/* Row 2: Preset Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
          <span className="text-[10px] font-bold text-[#69778F] uppercase tracking-wider mr-1">
            Campaign Samples:
          </span>
          {sampleCampaignPresets.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5",
                selectedPresetId === preset.id
                  ? "bg-[#121E36] text-white shadow-xs"
                  : "bg-[#FAF7EF] text-[#69778F] hover:bg-slate-100 hover:text-[#121E36] border border-[#E5E8EF]"
              )}
            >
              <span>{preset.name}</span>
              <span className={cn("text-[9px] px-1.5 py-0.2 rounded font-bold", preset.badgeColor)}>
                {preset.badge}
              </span>
            </button>
          ))}
          <button
            onClick={() => handleSelectPreset('custom')}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 border",
              selectedPresetId === 'custom'
                ? "bg-[#121E36] text-white border-[#121E36] shadow-xs"
                : "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200"
            )}
          >
            <PenTool className="h-3 w-3" />
            <span>✍️ Custom Draft (Test Any Copy)</span>
          </button>
        </div>

      </div>

      {/* ─── Cinematic Scan Progress Tracker ─── */}
      {isScanning && (
        <div className="animate-scaleIn rounded-xl border border-[#BFDBFE] bg-gradient-to-r from-[#EFF6FF] to-[#F0FDFA] p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="animate-pulseRing h-6 w-6 rounded-full bg-[#4C6EF5] flex items-center justify-center">
                <Zap className="h-3 w-3 text-white" />
              </div>
              <span className="text-xs font-bold text-[#1E40AF]">Pre-Flight Scan Running...</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#4C6EF5]">{scanPct}%</span>
          </div>
          <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-gradient-to-r from-[#4C6EF5] to-[#50BEB8] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${scanPct}%` }}
            />
          </div>
          <div className="text-[11px] text-[#2563EB] font-medium animate-fadeIn" key={scanStageIdx}>
            {SCAN_STAGES[scanStageIdx]?.label}
          </div>
        </div>
      )}

      {/* ─── Scan Complete Header Summary ─── */}
      {hasScanned && !isScanning && findings.length > 0 && (
        <div className="animate-bounceIn rounded-xl border border-[#E5E8EF] bg-white p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-center">
              <svg width="60" height="60" viewBox="0 0 100 100" className="animate-scoreCount">
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
                <text x="50" y="55" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#121E36">{complianceScore}</text>
              </svg>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#121E36]">Pre-Flight Scan Complete</h3>
              <p className="text-[11px] text-[#69778F]">
                <span className="font-bold text-red-600">{findings.filter(f=>f.severity==='critical').length} Critical</span> &nbsp;•&nbsp;
                <span className="font-bold text-amber-600">{findings.filter(f=>f.severity==='warning').length} Warnings</span> &nbsp;•&nbsp;
                <span className="font-bold text-blue-600">{findings.filter(f=>f.severity==='suggestion').length} Suggestions</span>
              </p>
              <p className="text-[10px] text-[#69778F] mt-0.5">
                {resolvedCount} of {totalFindings} resolved • Compliance Index: <strong style={{color: scoreColor}}>{complianceScore}/100</strong>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[10px]">
            <span className="rounded bg-emerald-50 border border-emerald-200 px-2 py-1 text-emerald-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>Fact-Vault Verified</span>
            </span>
            <span className="rounded bg-purple-50 border border-purple-200 px-2 py-1 text-purple-800 font-semibold flex items-center gap-1">
              <Eye className="h-3 w-3" />
              <span>WCAG 2.1 AA Checked</span>
            </span>
            <span className="rounded bg-blue-50 border border-blue-200 px-2 py-1 text-blue-800 font-semibold flex items-center gap-1">
              <Zap className="h-3 w-3" />
              <span>Deterministic Gate</span>
            </span>
          </div>
        </div>
      )}

      {/* ─── Clean Zero-Issue Result ─── */}
      {hasScanned && !isScanning && findings.length === 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-center space-y-2">
          <div className="mx-auto h-8 w-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <h3 className="text-sm font-bold text-emerald-900">Zero Compliance Violations Detected!</h3>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Your draft complies with all approved Northstar factsheets, SEC Rule 206(4)-1 non-promissory standards, and WCAG accessibility guidelines.
          </p>
        </div>
      )}

      {/* ─── Interactive Staged Draft Sandbox (Before Scan) ─── */}
      {!hasScanned && !isScanning && (
        <div className="rounded-xl border border-[#E5E8EF] bg-white p-4 md:p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5E8EF] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#4C6EF5]">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-xs font-bold text-[#121E36]">
                  {selectedPresetId === 'custom' 
                    ? "Custom Copy Sandbox (Test Any Campaign Text)" 
                    : `Loaded Campaign: ${activePreset?.name || "Pre-Flight Draft"}`}
                </h2>
                <p className="text-[10px] text-[#69778F]">
                  {selectedPresetId === 'custom' 
                    ? "Type, paste, or inject test claims below to trigger deterministic pre-flight compliance checking." 
                    : "Inspect and edit draft content prior to launching the multi-layer compliance gate."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[#FAF7EF] border border-[#E5E8EF] px-2 py-1 text-[10px] text-[#69778F] font-mono">
                {draftText.length} chars • {draftText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>

          {/* Quick Triggers for Custom Test */}
          {selectedPresetId === 'custom' && (
            <div className="rounded-lg bg-[#FAF7EF] p-2.5 border border-[#E5E8EF] space-y-1.5">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-[#121E36] flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[#4C6EF5]" />
                  1-Click Test Triggers (Click to inject risky claims):
                </span>
                <button
                  type="button"
                  onClick={() => setDraftText("")}
                  className="text-[#69778F] hover:text-red-600 transition-colors font-medium"
                >
                  Clear Draft
                </button>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {currentBrand.name.includes("Apex") ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Guaranteed 100% cure rate in all clinical trials.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-red-50 text-red-700 border border-red-200 text-[10px] font-medium transition-colors"
                    >
                      + 100% Cure Rate (FDA Prohibition)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "A miracle therapeutic regimen for advanced oncology.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium transition-colors"
                    >
                      + Miracle Treatment (Sensationalist Jargon)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Validated across 500,000 patient cohorts.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-medium transition-colors"
                    >
                      + 500k Cohort (Fact-Vault Mismatch)
                    </button>
                  </>
                ) : currentBrand.name.includes("CloudScale") ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Guaranteed 100% unbreakable cloud infrastructure.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-red-50 text-red-700 border border-red-200 text-[10px] font-medium transition-colors"
                    >
                      + 100% Unbreakable (SOC-2 Breach)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Revolutionary AI engine with zero downtime.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium transition-colors"
                    >
                      + Tech Hype Superlative (Voice Violation)
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "We deliver guaranteed 20% annualized returns.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-red-50 text-red-700 border border-red-200 text-[10px] font-medium transition-colors"
                    >
                      + Guaranteed 20% Returns (SEC Promissory)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Now managing over $50 Billion in client AUM.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium transition-colors"
                    >
                      + $50B AUM Claim (Fact-Vault Mismatch)
                    </button>
                    <button
                      type="button"
                      onClick={() => setDraftText(prev => (prev ? prev + " " : "") + "Invest with 100% foolproof downside protection.")}
                      className="px-2 py-0.5 rounded bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-medium transition-colors"
                    >
                      + Foolproof Downside Protection (FINRA 2210)
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Editable Draft Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#121E36]">
              <span>Staged Copy (Ready for Pre-Flight Evaluation)</span>
              <span className="text-[10px] text-[#69778F] font-normal">Editable</span>
            </div>
            <textarea
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              placeholder="Type or paste any marketing copy, headline, or disclosure here to inspect..."
              rows={4}
              className="w-full p-3 rounded-lg border border-[#E5E8EF] bg-slate-50/50 text-xs text-[#121E36] font-sans leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4C6EF5] transition-all resize-y"
            />
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E5E8EF]">
            <div className="flex items-center gap-2 text-[11px] text-[#69778F]">
              <ShieldCheck className="h-4 w-4 text-[#50BEB8]" />
              <span>
                Evaluating against <strong>SEC Rule 206(4)-1</strong>, <strong>Fact-Vault</strong>, and <strong>WCAG 2.1 AA</strong>
              </span>
            </div>

            <button
              onClick={handleRunScan}
              disabled={isScanning || !draftText.trim()}
              className="btn-scan inline-flex items-center justify-center gap-2 rounded-xl bg-[#4C6EF5] hover:bg-[#3b5bdb] px-6 py-2.5 text-xs font-bold text-white shadow-md transition-all disabled:opacity-50 shrink-0 whitespace-nowrap"
            >
              <Zap className="h-4 w-4" />
              <span>Run Pre-Flight Scan →</span>
            </button>
          </div>
        </div>
      )}

      {/* ─── Main Review Layout ─── */}
      {hasScanned && !isScanning && findings.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">

          {/* LEFT: Draft Editor + Views (7 cols) */}
          <div className="lg:col-span-7 space-y-3">

            {/* Tab Switcher */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-1 bg-[#FAF7EF] p-1 rounded-lg border border-[#E5E8EF]">
                {(['editor', 'diff', 'visual'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-all",
                      activeTab === tab
                        ? "bg-[#121E36] text-white shadow-xs"
                        : "text-[#69778F] hover:text-[#121E36]"
                    )}
                  >
                    {tab === 'editor' && <FileText className="h-3 w-3" />}
                    {tab === 'diff' && <Eye className="h-3 w-3" />}
                    {tab === 'visual' && <ImageIcon className="h-3 w-3" />}
                    <span>{tab === 'editor' ? 'Draft + Highlights' : tab === 'diff' ? 'Side-by-Side Diff' : 'Visual & WCAG'}</span>
                  </button>
                ))}
              </div>
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-[11px] font-bold border",
                complianceScore >= 85 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
              )}>
                Compliance: {complianceScore}/100
              </span>
            </div>

            {/* ─── EDITOR TAB ─── */}
            {activeTab === 'editor' && (
              <div className="animate-fadeIn rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#69778F]">
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3 text-[#4C6EF5]" />
                    <span>Interactive Copy Inspection</span>
                  </div>
                  <span>Click underlined phrases to inspect findings</span>
                </div>

                {/* Dynamic Inline Highlights */}
                <div className="rounded-lg border border-[#E5E8EF] bg-[#FAF7EF] p-3 text-xs leading-loose text-[#121E36] font-medium min-h-[90px]">
                  {renderInteractiveText()}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-2 text-[10px] text-[#69778F]">
                  <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-red-100 border-b-2 border-red-500" />Critical</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-amber-100 border-b-2 border-amber-500" />Warning</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-blue-100 border-b border-blue-500" />Suggestion</span>
                  <span className="flex items-center gap-1"><span className="h-1.5 w-4 rounded bg-teal-100 border-b-2 border-teal-500" />Applied ✓</span>
                </div>

                {/* Working Draft Textarea */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#121E36]">
                    <span>Working Draft (Editable — updates as fixes apply)</span>
                    <span className="text-[10px] text-[#69778F] font-normal">{draftText.split(" ").filter(Boolean).length} words</span>
                  </div>
                  <textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    className="w-full h-20 p-2.5 rounded-lg border border-[#E5E8EF] bg-white text-xs text-[#121E36] font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#4C6EF5] resize-none"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2 border-t border-[#E5E8EF]">
                  <span className="text-[11px] text-[#69778F]">
                    {resolvedCount}/{totalFindings} issues resolved
                  </span>
                  <button
                    onClick={() => { onSubmitForApproval({ draftContent: draftText, complianceScore }); setIsSubmitted(true); }}
                    disabled={isSubmitted}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold text-white shadow-xs transition-all",
                      isSubmitted ? "bg-[#50BEB8] cursor-default" : "btn-scan bg-[#121E36]"
                    )}
                  >
                    {isSubmitted ? <><Check className="h-3 w-3" /><span>Submitted ✓</span></> : <><Send className="h-3 w-3" /><span>Submit for Sign-Off</span></>}
                  </button>
                </div>
              </div>
            )}

            {/* ─── DIFF TAB ─── */}
            {activeTab === 'diff' && (
              <div className="animate-fadeIn rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-xs space-y-3">
                <p className="text-[11px] text-[#69778F]">Git-style comparison between original draft and harmonized copy.</p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg border border-red-200 bg-red-50/40 p-3 space-y-1">
                    <span className="text-[10px] font-bold text-red-900 block border-b border-red-200 pb-1">Original Draft</span>
                    <p className="text-red-950/80 leading-relaxed text-[11px]">{originalDraft}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-900 block border-b border-emerald-200 pb-1">Harmonized Draft</span>
                    <p className="text-emerald-950 font-medium leading-relaxed text-[11px]">{draftText}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── VISUAL TAB ─── */}
            {activeTab === 'visual' && (
              <div className="animate-fadeIn rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#121E36]">Visual Palette & Contrast Analysis</span>
                  <span className="text-[10px] text-[#69778F]">W3C WCAG 2.1 AA relative luminance math</span>
                </div>

                {/* Banner Mockup */}
                <div
                  className="rounded-xl overflow-hidden p-6 min-h-[140px] flex flex-col justify-between transition-all duration-500 shadow-inner"
                  style={{ backgroundColor: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-wider uppercase text-[#FFF1C1]">Northstar Financial</span>
                    <span className="text-[9px] rounded px-1.5 py-0.5 bg-black/40 font-mono text-white">
                      {selectedBannerMode === 'risky' ? 'OFF-BRAND: #8B5CF6 (Purple)' : 'COMPLIANT: #121E36 (Approved Navy)'}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-white mb-0.5">
                      Institutional Stewardship & Fiduciary Wealth
                    </h3>
                    <p className="text-[11px] text-white/80">Dual SEC & FCA Regulated Investment Advisor</p>
                  </div>
                </div>

                {/* Contrast Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {[
                    { label: "Detected HEX", value: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36', pass: selectedBannerMode !== 'risky', dot: selectedBannerMode === 'risky' ? '#8B5CF6' : '#121E36' },
                    { label: "WCAG Contrast", value: selectedBannerMode === 'risky' ? '2.9:1 FAIL' : '6.8:1 PASS', pass: selectedBannerMode !== 'risky', dot: null },
                    { label: "Palette Match", value: selectedBannerMode === 'risky' ? '42% Warning' : '98% Approved', pass: selectedBannerMode !== 'risky', dot: null }
                  ].map(m => (
                    <div key={m.label} className={cn("rounded-lg border p-2 text-xs", m.pass ? "border-emerald-200 bg-emerald-50/50" : "border-red-200 bg-red-50/50")}>
                      <div className={cn("text-[10px] font-medium mb-0.5", m.pass ? "text-emerald-700" : "text-red-700")}>{m.label}</div>
                      <div className="flex items-center gap-1.5 font-bold text-[#121E36] text-[11px]">
                        {m.dot && <span className="h-2.5 w-2.5 rounded-full border border-black/20 shrink-0" style={{ backgroundColor: m.dot }} />}
                        <span>{m.value}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedBannerMode(p => p === 'risky' ? 'compliant' : 'risky')}
                  className="w-full btn-scan flex items-center justify-center gap-1.5 rounded-lg bg-[#4C6EF5] py-2 text-xs font-bold text-white shadow-xs"
                >
                  {selectedBannerMode === 'risky'
                    ? '1-Click Harmonize Banner to Approved Navy (#121E36) →'
                    : '← Revert to Original Off-Brand Banner (Demo)'}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT: Evidence & Findings Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-3">

            {/* Findings Chips */}
            <div className="rounded-xl border border-[#E5E8EF] bg-white p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-[#69778F] text-[10px]">Findings ({findings.length})</span>
                <span className="text-[10px] text-[#69778F]">{findings.filter(f=>f.severity==='critical').length}C · {findings.filter(f=>f.severity==='warning').length}W · {findings.filter(f=>f.severity==='suggestion').length}S</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {findings.map((f, idx) => {
                  const isSelected = f.id === selectedFindingId;
                  const isResolved = f.status === 'applied' || f.status === 'overridden';
                  return (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFindingId(f.id)}
                      className={cn(
                        "px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition-all",
                        isSelected ? "bg-[#121E36] text-white shadow-xs" :
                        isResolved ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        getSeverityBadgeClass(f.severity)
                      )}
                    >
                      #{idx + 1} {f.category.toUpperCase()}
                      {isResolved && <Check className="h-2.5 w-2.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4-Part Evidence Card */}
            {selectedFinding && (
              <div key={selectedFinding.id} className="animate-slideInLeft rounded-xl border border-[#E5E8EF] bg-white p-4 shadow-xs space-y-3 text-xs">
                {/* Header */}
                <div className="space-y-1 pb-2 border-b border-[#E5E8EF]">
                  <div className="flex items-center justify-between">
                    <span className={cn("px-1.5 py-0.2 rounded text-[9px] font-bold uppercase", getSeverityBadgeClass(selectedFinding.severity))}>
                      {selectedFinding.severity}
                    </span>
                    <span className={cn("px-1.5 py-0.2 rounded text-[9px] font-bold", getCategoryBadgeClass(selectedFinding.category))}>
                      {selectedFinding.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-bold text-[#121E36] leading-snug">{selectedFinding.ruleName}</h3>
                  <span className="text-[10px] font-mono text-[#69778F] block">{selectedFinding.ruleCode}</span>
                </div>

                {/* 1. WHAT */}
                <div className="rounded-lg bg-red-50/70 border border-red-200 p-2.5 text-red-950">
                  <span className="block text-[9px] font-bold text-red-700 uppercase tracking-wider mb-0.5">① What is Wrong:</span>
                  <span className="font-semibold italic text-[11px]">&ldquo;{selectedFinding.targetText}&rdquo;</span>
                </div>

                {/* 2. WHY */}
                <div className="text-[#121E36] leading-relaxed text-[11px]">
                  <span className="block text-[9px] font-bold text-[#69778F] uppercase tracking-wider mb-0.5">② Why It Matters:</span>
                  <p>{selectedFinding.explanation}</p>
                </div>

                {/* 3. EVIDENCE SOURCE */}
                <div className="rounded-lg border border-blue-200 bg-[#EFF6FF] p-2.5 space-y-1">
                  <div className="flex items-center gap-1 font-bold text-[#1E40AF] text-[10px]">
                    <BookOpen className="h-3 w-3 text-[#4C6EF5]" />
                    <span>③ Approved Evidence Citation</span>
                  </div>
                  <div className="text-[10px] text-[#1E3A8A]"><strong>Source:</strong> {selectedFinding.evidenceSource.docName}</div>
                  <div className="text-[10px] text-[#1E3A8A]"><strong>Ref:</strong> {selectedFinding.evidenceSource.pageRef}</div>
                  {selectedFinding.evidenceSource.verifiedFact && (
                    <div className="text-[10px] rounded bg-white/80 p-1.5 border border-blue-200 text-blue-900 font-medium">
                      ✓ Fact-Vault: &ldquo;{selectedFinding.evidenceSource.verifiedFact}&rdquo;
                    </div>
                  )}
                </div>

                {/* 4. REWRITES */}
                {selectedFinding.suggestions.length > 0 && (
                  <div className="space-y-1.5 pt-1.5 border-t border-[#E5E8EF]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#121E36]">
                      <span>④ Intent-Preserving Rewrites:</span>
                      <span className="text-[#50BEB8]">1-Click Apply</span>
                    </div>
                    {selectedFinding.suggestions.map((sug) => {
                      const isApplied = selectedFinding.appliedRewriteId === sug.id;
                      return (
                        <div key={sug.id} className={cn("rounded-lg border p-2 transition-all", isApplied ? "border-emerald-300 bg-emerald-50/60" : "border-[#E5E8EF] bg-[#FAF7EF] hover:border-[#4C6EF5]")}>
                          <div className="flex items-center justify-between mb-0.5">
                            <span className="text-[9px] font-bold text-[#4C6EF5] uppercase">{sug.label}</span>
                            {isApplied ? (
                              <button onClick={() => handleUndo(selectedFinding.id)} className="flex items-center gap-0.5 text-[9px] font-semibold text-[#69778F] hover:text-red-600">
                                <RotateCcw className="h-2.5 w-2.5" /><span>Undo</span>
                              </button>
                            ) : (
                              <button onClick={() => handleApplySuggestion(selectedFinding.id, sug)} className="flex items-center gap-0.5 rounded bg-[#121E36] px-1.5 py-0.5 text-[9px] font-bold text-white hover:bg-[#1E2D4A]">
                                <Check className="h-2.5 w-2.5 text-[#FFF1C1]" /><span>Apply Fix</span>
                              </button>
                            )}
                          </div>
                          <p className="font-semibold text-[#121E36] text-[11px]">&ldquo;{sug.text}&rdquo;</p>
                          <p className="text-[10px] text-[#69778F]">{sug.explanation}</p>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Exception Trigger */}
                <div className="pt-1 border-t border-[#E5E8EF]">
                  {selectedFinding.status === 'overridden' ? (
                    <div className="rounded bg-amber-50 border border-amber-200 p-2 text-amber-900 text-[10px]">
                      <strong>Exception Documented:</strong> &ldquo;{selectedFinding.exceptionNote}&rdquo;
                    </div>
                  ) : (
                    <button onClick={() => openException(selectedFinding.id)} className="flex items-center gap-1 text-[11px] text-[#69778F] hover:text-[#121E36]">
                      <MessageSquarePlus className="h-3 w-3 text-[#D99019]" />
                      <span>Request Creative Exception...</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="animate-scaleIn w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl space-y-3 border border-[#E5E8EF]">
            <div className="flex items-center gap-2 font-bold text-xs text-[#121E36]">
              <ShieldAlert className="h-4 w-4 text-[#D99019]" />
              <span>Request Creative Exception / Manager Override</span>
            </div>
            <p className="text-[11px] text-[#69778F]">
              Provide justification for rule <strong>{findings.find(f=>f.id===exceptionTargetId)?.ruleCode}</strong>. This logs an immutable audit trail for the Brand Manager to review.
            </p>
            <textarea
              value={exceptionNote}
              onChange={(e) => setExceptionNote(e.target.value)}
              placeholder="e.g. Exception justified for live keynote conference teaser context..."
              className="w-full h-20 p-2.5 rounded-lg border border-[#E5E8EF] text-xs text-[#121E36] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5] resize-none"
            />
            <div className="flex justify-end gap-2 pt-1">
              <button onClick={() => setExceptionModalOpen(false)} className="px-3 py-1 rounded-lg text-xs font-semibold text-[#69778F] hover:bg-slate-100">Cancel</button>
              <button onClick={handleSaveException} className="btn-scan px-3.5 py-1 rounded-lg bg-[#D99019] text-xs font-bold text-white shadow-xs">Submit Exception</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
