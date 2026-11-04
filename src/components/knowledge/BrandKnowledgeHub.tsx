"use client";

import React, { useState } from "react";
import { 
  BookMarked, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Plus, 
  ExternalLink,
  ShieldCheck,
  Palette,
  FileCheck,
  Ban,
  Tag,
  Building2,
  Sparkles
} from "lucide-react";
import { northstarBrand } from "@/data/mockData";
import { BrandColor, ApprovedFact, ProhibitedTerm } from "@/types";
import { cn } from "@/lib/utils";

export function BrandKnowledgeHub() {
  const [activeTab, setActiveTab] = useState<'facts' | 'voice' | 'terminology' | 'palette' | 'documents'>('facts');
  const [searchQuery, setSearchQuery] = useState("");
  const [facts, setFacts] = useState<ApprovedFact[]>(northstarBrand.facts);
  const [newFactModalOpen, setNewFactModalOpen] = useState(false);
  const [newClaim, setNewClaim] = useState("");
  const [newFigure, setNewFigure] = useState("");
  const [newSource, setNewSource] = useState("");

  const filteredFacts = facts.filter(f => 
    f.claim.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.approvedFigure.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.sourceDoc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProhibited = northstarBrand.prohibitedTerms.filter(p =>
    p.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.replacement.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFact = () => {
    if (!newClaim || !newFigure) return;
    const newEntry: ApprovedFact = {
      id: `fact-${Date.now()}`,
      claim: newClaim,
      approvedFigure: newFigure,
      sourceDoc: newSource || "Internal Financial Ledger v2",
      pageRef: "Schedule 1",
      verifiedDate: "Today",
      category: "Financials"
    };
    setFacts([newEntry, ...facts]);
    setNewClaim("");
    setNewFigure("");
    setNewSource("");
    setNewFactModalOpen(false);
  };

  return (
    <div className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <div className="animate-slideUp anim-hidden rounded-2xl border border-[#E5E8EF] bg-white p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="rounded bg-[#EFF6FF] px-2 py-0.5 text-xs font-bold text-[#1D4ED8] border border-[#BFDBFE]">
              Active Brand Vault
            </span>
            <span className="text-xs text-[#69778F]">Policy Engine v3.2</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#121E36]">
            {northstarBrand.name} — Brand Knowledge Hub
          </h1>
          <p className="text-xs text-[#69778F] max-w-xl mt-1">
            The definitive single source of truth for guidelines, audited factsheets, prohibited terminology, and certified visual assets.
          </p>
        </div>

        <button
          onClick={() => setNewFactModalOpen(true)}
          className="btn-scan flex items-center gap-2 rounded-lg bg-[#121E36] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1E2D4A]"
        >
          <Plus className="h-4 w-4 text-[#FFF1C1]" />
          <span>Add Approved Fact</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="animate-slideUp anim-hidden delay-100 flex items-center gap-2 border-b border-[#E5E8EF] pb-3 overflow-x-auto">
        {[
          { id: 'facts', label: 'Approved Fact-Vault (RAG)', icon: FileCheck, badge: `${facts.length}` },
          { id: 'voice', label: 'Tone & Voice Attributes', icon: Sparkles, badge: '3 Pillars' },
          { id: 'terminology', label: 'Prohibited Vocabulary', icon: Ban, badge: `${northstarBrand.prohibitedTerms.length}` },
          { id: 'palette', label: 'Visual Palette & WCAG', icon: Palette, badge: `${northstarBrand.colors.length}` },
          { id: 'documents', label: 'Guideline Manuals (PDF)', icon: BookMarked, badge: `${northstarBrand.guidelines.length}` }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap",
                isActive
                  ? "bg-[#121E36] text-white shadow-sm"
                  : "text-[#69778F] hover:bg-slate-100 hover:text-[#121E36]"
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", isActive ? "text-[#FFF1C1]" : "text-[#69778F]")} />
              <span>{tab.label}</span>
              <span className={cn(
                "px-1.5 py-0.2 rounded-full text-[10px]",
                isActive ? "bg-white/20 text-white" : "bg-slate-200 text-[#69778F]"
              )}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Approved Fact-Vault (The Killer Feature) */}
      {activeTab === 'facts' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#69778F]" />
              <input
                type="text"
                placeholder="Search verified claims, source documents, or metrics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#E5E8EF] bg-white text-xs text-[#121E36] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5]"
              />
            </div>
            <div className="text-xs text-[#69778F]">
              Deterministic Cross-Reference: <strong className="text-emerald-700">100% Zero-Hallucination</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFacts.map((fact, i) => (
              <div 
                key={fact.id}
                className={cn(
                  "animate-slideUp anim-hidden card-lift rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-3 hover:border-[#4C6EF5] transition-all",
                  i === 0 && "delay-100",
                  i === 1 && "delay-200",
                  i === 2 && "delay-300",
                  i === 3 && "delay-400",
                  i >= 4 && "delay-500"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {fact.category}
                  </span>
                  <span className="text-[11px] text-[#69778F] font-mono">
                    Verified: {fact.verifiedDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-[#69778F] mb-1">
                    {fact.claim}
                  </h3>
                  <div className="text-base font-bold text-[#121E36]">
                    "{fact.approvedFigure}"
                  </div>
                </div>

                <div className="rounded-lg bg-[#FAF7EF] border border-[#E5E8EF] p-2.5 text-xs text-[#121E36] space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#69778F]">Approved Source Document:</span>
                    <span className="font-semibold text-[#4C6EF5]">{fact.pageRef}</span>
                  </div>
                  <div className="font-medium truncate">
                    📄 {fact.sourceDoc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Tone & Voice Attributes */}
      {activeTab === 'voice' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {northstarBrand.voiceAttributes.map((voice, i) => (
            <div 
              key={voice.name} 
              className={cn(
                "animate-slideUp anim-hidden card-lift rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4",
                i === 0 && "delay-100",
                i === 1 && "delay-200",
                i === 2 && "delay-300"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#50BEB8]" />
                <h3 className="text-sm font-bold text-[#121E36]">{voice.name}</h3>
              </div>
              <p className="text-xs text-[#69778F] leading-relaxed">
                {voice.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#E5E8EF] text-xs">
                <div className="rounded-lg bg-emerald-50/60 border border-emerald-200 p-2.5 text-emerald-950">
                  <span className="font-bold text-[10px] uppercase text-emerald-800 block mb-0.5">
                    ✓ Recommended Phrasing (Do):
                  </span>
                  <p className="text-[11px]">"{voice.exampleDo}"</p>
                </div>
                <div className="rounded-lg bg-red-50/60 border border-red-200 p-2.5 text-red-950">
                  <span className="font-bold text-[10px] uppercase text-red-800 block mb-0.5">
                    ✗ Off-Brand Phrasing (Don't):
                  </span>
                  <p className="text-[11px]">"{voice.exampleDont}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: Prohibited Vocabulary */}
      {activeTab === 'terminology' && (
        <div className="rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-[#69778F]">
            <span className="font-bold text-[#121E36]">Blacklisted Terms & Phrases ({filteredProhibited.length})</span>
            <span>Deterministic Regex Blacklist Engine Active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E5E8EF] text-[#69778F]">
                  <th className="py-2.5 font-semibold">Prohibited Term</th>
                  <th className="py-2.5 font-semibold">Severity</th>
                  <th className="py-2.5 font-semibold">Approved Alternative</th>
                  <th className="py-2.5 font-semibold">Compliance Rationale</th>
                  <th className="py-2.5 font-semibold">Rule Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E8EF]">
                {filteredProhibited.map((item) => (
                  <tr key={item.term} className="hover:bg-[#FAF7EF] transition-colors">
                    <td className="py-3 font-bold text-red-700">
                      "{item.term}"
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.severity === 'critical' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3 font-semibold text-emerald-700">
                      "{item.replacement}"
                    </td>
                    <td className="py-3 text-[#69778F] max-w-xs">
                      {item.rationale}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#4C6EF5]">
                      {item.ruleRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: Visual Palette & WCAG Swatches */}
      {activeTab === 'palette' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {northstarBrand.colors.map((color, i) => (
            <div 
              key={color.hex} 
              className={cn(
                "animate-slideUp anim-hidden card-lift rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-3",
                i === 0 && "delay-100",
                i === 1 && "delay-200",
                i === 2 && "delay-300",
                i >= 3 && "delay-400"
              )}
            >
              <div 
                className="h-28 w-full rounded-lg border border-black/10 shadow-inner flex items-end p-3"
                style={{ backgroundColor: color.hex }}
              >
                <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-black/40 text-white">
                  {color.hex}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#121E36]">{color.name}</h3>
                  <span className="text-xs text-[#69778F]">{color.role} Palette</span>
                </div>
                <span className="rounded bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                  WCAG AA PASS
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Guideline Manuals */}
      {activeTab === 'documents' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {northstarBrand.guidelines.map((doc, i) => (
            <div 
              key={doc.id} 
              className={cn(
                "animate-slideUp anim-hidden card-lift rounded-xl border border-[#E5E8EF] bg-white p-5 shadow-sm space-y-4",
                i === 0 && "delay-100",
                i === 1 && "delay-200",
                i === 2 && "delay-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#4C6EF5]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#121E36] leading-snug">{doc.title}</h3>
                  <span className="text-[11px] text-[#69778F]">{doc.version} • {doc.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#FAF7EF] p-2.5 rounded-lg border border-[#E5E8EF]">
                <div>
                  <span className="text-[#69778F] block">Indexed Rules:</span>
                  <strong className="text-[#121E36]">{doc.rulesCount} active clauses</strong>
                </div>
                <div>
                  <span className="text-[#69778F] block">File Size:</span>
                  <strong className="text-[#121E36]">{doc.fileSize}</strong>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E5E8EF] text-xs">
                <span className="text-[11px] text-[#69778F]">Updated {doc.lastUpdated}</span>
                <span className="text-emerald-600 font-semibold text-[11px]">Vector Ingested ✓</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add Approved Fact */}
      {newFactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl space-y-4 border border-[#E5E8EF]">
            <h3 className="text-sm font-bold text-[#121E36]">Add Audited Claim to Fact-Vault</h3>
            <p className="text-xs text-[#69778F]">
              Any draft mentioning this topic will be automatically validated against this verified statement.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#121E36] block mb-1">Claim Subject / Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Total Active Institutional Portfolios"
                  value={newClaim}
                  onChange={(e) => setNewClaim(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E5E8EF] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121E36] block mb-1">Approved Exact Metric / Statement</label>
                <input
                  type="text"
                  placeholder="e.g. 42,800+ Portfolios ($14.2B AUM)"
                  value={newFigure}
                  onChange={(e) => setNewFigure(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E5E8EF] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#121E36] block mb-1">Audited Source Document Reference</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 2024 Audit Statement (KPMG), Page 14"
                  value={newSource}
                  onChange={(e) => setNewSource(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#E5E8EF] focus:outline-none focus:ring-1 focus:ring-[#4C6EF5]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E8EF]">
              <button
                onClick={() => setNewFactModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#69778F] hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFact}
                className="px-4 py-1.5 rounded-lg bg-[#121E36] text-xs font-semibold text-white hover:bg-[#1E2D4A]"
              >
                Save & Ingest Claim
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
