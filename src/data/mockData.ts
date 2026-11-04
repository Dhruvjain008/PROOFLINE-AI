import { BrandProfile, ReviewItem, GovernanceMetrics, Finding } from '@/types';

export const northstarBrand: BrandProfile = {
  name: "Northstar Financial",
  sector: "Institutional Wealth & Asset Management",
  tagline: "Principled Stewardship for the Next Generation",
  voiceAttributes: [
    {
      name: "Rigorous & Evidence-Based",
      description: "State facts with exact metric references; never rely on hyperbolic adjectives or unsubstantiated projections.",
      exampleDo: "Our multi-asset fund achieved 8.4% annualized net return over 5 years (source: Q3 Factsheet).",
      exampleDont: "Our revolutionary fund crushed the stock market with jaw-dropping gains."
    },
    {
      name: "Pragmatic Transparency",
      description: "Always disclose associated market risks and fee structures in plain, direct language without legalistic obfuscation.",
      exampleDo: "Capital remains exposed to systematic market volatility; past performance does not guarantee future results.",
      exampleDont: "Our proprietary safety net virtually eliminates market risk for peace of mind."
    },
    {
      name: "Restrained Confidence",
      description: "Authoritative yet humble. Avoid sensationalism, clickbait phrasing, or exclamation-mark-heavy promotional prose.",
      exampleDo: "We invite long-term investors to examine our audited performance ledger.",
      exampleDont: "Don't miss out on this once-in-a-lifetime opportunity to get rich!"
    }
  ],
  colors: [
    { hex: "#121E36", name: "Deep Navy", role: "Primary", isApproved: true },
    { hex: "#4C6EF5", name: "Royal Blue", role: "Secondary", isApproved: true },
    { hex: "#50BEB8", name: "Growth Teal", role: "Accent", isApproved: true },
    { hex: "#FAF7EF", name: "Soft Ivory", role: "Background", isApproved: true },
    { hex: "#FFF1C1", name: "Warm Cream", role: "Accent", isApproved: true }
  ],
  facts: [
    {
      id: "fact-01",
      claim: "Total Assets Under Management (AUM)",
      approvedFigure: "$14.2 Billion USD",
      sourceDoc: "Q3 2024 Independent Auditor's Statement (KPMG)",
      pageRef: "Section 3.2, Page 14",
      verifiedDate: "Oct 15, 2024",
      category: "Financials"
    },
    {
      id: "fact-02",
      claim: "Regulatory Supervision & Fiduciary Status",
      approvedFigure: "Dual-regulated by SEC (US) & FCA (UK) as a Registered Investment Advisor",
      sourceDoc: "Form ADV Part 2A Brochure 2024",
      pageRef: "Item 4, Page 6",
      verifiedDate: "Jan 10, 2024",
      category: "Compliance"
    },
    {
      id: "fact-03",
      claim: "Active Client Base",
      approvedFigure: "42,800+ Institutional & High-Net-Worth Portfolios",
      sourceDoc: "Q3 2024 Custody & Clearing Ledger",
      pageRef: "Schedule B, Page 3",
      verifiedDate: "Sep 30, 2024",
      category: "Scale"
    },
    {
      id: "fact-04",
      claim: "Digital Platform Operational Availability",
      approvedFigure: "99.98% Annual System Uptime",
      sourceDoc: "SOC 2 Type II System Compliance Report",
      pageRef: "Section IV, Page 22",
      verifiedDate: "Aug 12, 2024",
      category: "Scale"
    },
    {
      id: "fact-05",
      claim: "Transparent Advisory Fee Structure",
      approvedFigure: "Flat 0.35% annualized AUM fee with zero hidden trade commissions",
      sourceDoc: "Official Client Agreement & Fee Schedule v4.2",
      pageRef: "Article 7, Page 9",
      verifiedDate: "Jul 01, 2024",
      category: "Financials"
    }
  ],
  prohibitedTerms: [
    {
      term: "guaranteed returns",
      severity: "critical",
      replacement: "target annualized performance",
      rationale: "SEC Rule 206(4)-1 and brand policy strictly forbid promissory financial return claims.",
      ruleRef: "Brand Book Rule 4.1"
    },
    {
      term: "foolproof",
      severity: "warning",
      replacement: "systematic and risk-hedged",
      rationale: "Unprofessional superlative that contradicts our principle of transparent risk disclosure.",
      ruleRef: "Brand Book Rule 2.3"
    },
    {
      term: "market-beating",
      severity: "warning",
      replacement: "benchmarked outperformance",
      rationale: "Promotional hype; regulatory guidelines require documented benchmark comparisons.",
      ruleRef: "Brand Book Rule 3.2"
    },
    {
      term: "revolutionary AI",
      severity: "suggestion",
      replacement: "algorithmic rebalancing models",
      rationale: "Avoid ungrounded AI buzzwords; specify the precise quantitative methodology.",
      ruleRef: "Brand Book Rule 1.6"
    },
    {
      term: "zero downside risk",
      severity: "critical",
      replacement: "hedged capital preservation strategies",
      rationale: "Explicit misrepresentation of investment fundamentals; high legal liability.",
      ruleRef: "Brand Book Rule 4.3"
    }
  ],
  guidelines: [
    {
      id: "doc-01",
      title: "Northstar Global Brand Voice & Editorial Standards",
      version: "v3.2",
      lastUpdated: "October 2024",
      fileSize: "4.2 MB",
      rulesCount: 38,
      category: "Voice & Copy"
    },
    {
      id: "doc-02",
      title: "Regulatory Compliance & Claims Substantiation Guide",
      version: "v4.0",
      lastUpdated: "November 2024",
      fileSize: "2.8 MB",
      rulesCount: 52,
      category: "Legal & Compliance"
    },
    {
      id: "doc-03",
      title: "Digital Visual Identity & WCAG 2.1 Accessibility Guide",
      version: "v2.5",
      lastUpdated: "September 2024",
      fileSize: "8.1 MB",
      rulesCount: 24,
      category: "Visual & Accessibility"
    }
  ]
};

export const apexHealthBrand: BrandProfile = {
  name: "Apex Health Technologies",
  sector: "Digital Diagnostics & Precision Genomics",
  tagline: "Clinical Rigor for Human Longevity",
  voiceAttributes: [
    {
      name: "Empirical & Peer-Reviewed",
      description: "All therapeutic claims must cite double-blind, peer-reviewed clinical studies. No anecdotal hype.",
      exampleDo: "Clinical trial Phase III demonstrated 94.2% diagnostic concordance across 12,000 patient cohorts.",
      exampleDont: "Our miracle breakthrough cures diseases overnight with magical precision."
    },
    {
      name: "Patient-First Compassion",
      description: "Communicate complex biomedical data with empathy and transparent contraindication disclosures.",
      exampleDo: "Consult with a board-certified physician to evaluate individual genomic markers.",
      exampleDont: "Skip your doctor's visit and let our automated AI diagnose you instantly."
    }
  ],
  colors: [
    { hex: "#064E3B", name: "Deep Forest", role: "Primary", isApproved: true },
    { hex: "#0D9488", name: "Clinical Teal", role: "Secondary", isApproved: true },
    { hex: "#10B981", name: "Vitality Green", role: "Accent", isApproved: true },
    { hex: "#F0FDF4", name: "Soft Mint", role: "Background", isApproved: true },
    { hex: "#FEF3C7", name: "Warm Amber", role: "Accent", isApproved: true }
  ],
  facts: [
    {
      id: "apex-01",
      claim: "FDA 510(k) Clearance Status",
      approvedFigure: "Cleared under FDA 510(k) K231849 for Automated Cellular Morphometry",
      sourceDoc: "FDA Center for Devices & Radiological Health Letter",
      pageRef: "Clearance Letter, Section 2",
      verifiedDate: "Jan 18, 2024",
      category: "Compliance"
    },
    {
      id: "apex-02",
      claim: "Clinical Trial Cohort Size",
      approvedFigure: "148,000 Validated Patient Samples across 18 Medical Centers",
      sourceDoc: "Lancet Oncology Multi-Center Trial Publication",
      pageRef: "Volume 402, Page 881",
      verifiedDate: "May 2024",
      category: "Scale"
    }
  ],
  prohibitedTerms: [
    {
      term: "100% cure rate",
      severity: "critical",
      replacement: "statistically significant therapeutic response",
      rationale: "Absolute therapeutic guarantees breach FDA and FTC medical advertising statutes.",
      ruleRef: "Medical Advertising Code Rule 1.1"
    },
    {
      term: "miracle treatment",
      severity: "critical",
      replacement: "evidence-based therapeutic regimen",
      rationale: "Sensationalist biomedical claims incur severe FDA warning letters.",
      ruleRef: "Brand Guideline Rule 2.4"
    }
  ],
  guidelines: [
    {
      id: "apex-doc-01",
      title: "Apex Clinical Advertising & FDA Regulatory Code",
      version: "v2.1",
      lastUpdated: "January 2024",
      fileSize: "5.4 MB",
      rulesCount: 46,
      category: "Regulatory & Clinical"
    }
  ]
};

export const cloudScaleBrand: BrandProfile = {
  name: "CloudScale Systems",
  sector: "Enterprise Cloud Infrastructure & Distributed Edge",
  tagline: "Resilient Computing for Global Enterprises",
  voiceAttributes: [
    {
      name: "Engineering Precision",
      description: "State operational SLAs, millisecond latency figures, and ISO standards with exact benchmarks.",
      exampleDo: "Our multi-region control plane achieved 99.999% SLA availability across 42 availability zones.",
      exampleDont: "Our insane server speeds will melt your competitors' faces off."
    }
  ],
  colors: [
    { hex: "#0F172A", name: "Midnight Slate", role: "Primary", isApproved: true },
    { hex: "#4F46E5", name: "Electric Indigo", role: "Secondary", isApproved: true },
    { hex: "#0EA5E9", name: "Sky Cyan", role: "Accent", isApproved: true },
    { hex: "#F8FAFC", name: "Clean Slate", role: "Background", isApproved: true }
  ],
  facts: [
    {
      id: "cs-01",
      claim: "Annual Platform SLA Availability",
      approvedFigure: "99.999% Guaranteed High-Availability SLA",
      sourceDoc: "Master Enterprise Service Level Agreement (SLA v5.0)",
      pageRef: "Exhibit B, Page 4",
      verifiedDate: "Feb 01, 2024",
      category: "Scale"
    },
    {
      id: "cs-02",
      claim: "Information Security Certifications",
      approvedFigure: "SOC-2 Type II, ISO/IEC 27001:2022, and FedRAMP Moderate Authorized",
      sourceDoc: "Ernst & Young SOC-2 Type II Audit Report",
      pageRef: "Executive Summary, Page 2",
      verifiedDate: "Sep 15, 2024",
      category: "Compliance"
    }
  ],
  prohibitedTerms: [
    {
      term: "unhackable",
      severity: "critical",
      replacement: "defense-in-depth zero-trust security architecture",
      rationale: "Absolute security guarantees are factually inaccurate and create unlimited corporate liability.",
      ruleRef: "Security Policy Rule 6.2"
    }
  ],
  guidelines: [
    {
      id: "cs-doc-01",
      title: "CloudScale Technical Editorial & Security Governance",
      version: "v3.0",
      lastUpdated: "March 2024",
      fileSize: "3.6 MB",
      rulesCount: 30,
      category: "Technical & Security"
    }
  ]
};

export const availableBrands: BrandProfile[] = [
  northstarBrand,
  apexHealthBrand,
  cloudScaleBrand
];

export interface CampaignPreset {
  id: string;
  name: string;
  badge: string;
  badgeColor: string;
  channel: "LinkedIn" | "Press Release" | "Twitter/X" | "Email Newsletter";
  title: string;
  content: string;
  initialFindings: Finding[];
  bannerHex: string;
  contrastRatio: number;
}

export const sampleCampaignPresets: CampaignPreset[] = [
  {
    id: "preset-1",
    name: "Example 1: High-Yield Social Ad",
    badge: "5 Critical Risks",
    badgeColor: "bg-red-50 text-red-700 border-red-200",
    channel: "LinkedIn",
    title: "Q4 High-Yield Growth Accelerator Post",
    content: `At Northstar Financial, we are proud to offer a foolproof wealth strategy delivering guaranteed 18% annual returns for every investor. With over $25 Billion in active assets under management and our revolutionary AI engine, our portfolios ensure market-beating performance with zero downside risk. Connect with our certified advisors today to secure your financial freedom.`,
    bannerHex: "#8B5CF6",
    contrastRatio: 2.9,
    initialFindings: [
      {
        id: "find-01",
        category: "claim",
        severity: "critical",
        targetText: "guaranteed 18% annual returns",
        ruleCode: "RULE-SEC-4.1",
        ruleName: "Prohibition of Promised Investment Returns",
        explanation: "Explicitly promising fixed percentage yields breaches SEC Rule 206(4)-1 and Northstar Fiduciary Governance. All projections must be characterized as non-guaranteed targets.",
        evidenceSource: {
          docName: "Regulatory Compliance & Claims Guide v4.0",
          section: "Securities Advertising",
          pageRef: "Clause 3.1, Page 12",
          verifiedFact: "No investment return may be characterized as guaranteed under federal securities law."
        },
        suggestions: [
          {
            id: "sug-01a",
            text: "target long-term yield strategies aligned with your risk tolerance",
            label: "Authoritative & Compliant",
            explanation: "Replaces promissory yield with compliant fiduciary objective framing."
          },
          {
            id: "sug-01b",
            text: "disciplined wealth management built for sustainable compounding",
            label: "Direct & Crisp",
            explanation: "Maintains high value proposition while eliminating regulatory exposure."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-02",
        category: "claim",
        severity: "critical",
        targetText: "$25 Billion in active assets under management",
        ruleCode: "FACT-MISMATCH-1.2",
        ruleName: "Unsupported AUM Metrics Mismatch",
        explanation: "Draft asserts $25B in AUM. Official approved audit records confirm total firm AUM as $14.2 Billion USD. Overstating scale damages organizational credibility and creates regulatory risk.",
        evidenceSource: {
          docName: "Q3 2024 Independent Auditor's Statement (KPMG)",
          section: "Executive Financial Summary",
          pageRef: "Section 3.2, Page 14",
          verifiedFact: "Approved AUM figure is $14.2 Billion USD (audited as of Oct 2024)."
        },
        suggestions: [
          {
            id: "sug-02a",
            text: "$14.2 Billion in audited assets under stewardship",
            label: "Authoritative & Compliant",
            explanation: "Cites the exact verified metric from KPMG audit."
          },
          {
            id: "sug-02b",
            text: "over $14 Billion in institutional and private client assets",
            label: "Direct & Crisp",
            explanation: "Clean, punchy phrasing matching the approved figure."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-03",
        category: "terminology",
        severity: "warning",
        targetText: "foolproof",
        ruleCode: "RULE-VOICE-2.3",
        ruleName: "Prohibited Unprofessional Jargon",
        explanation: "'Foolproof' is blacklisted in the Northstar Brand Voice Lexicon. It suggests colloquial overconfidence and contradicts our principle of rigorous risk disclosure.",
        evidenceSource: {
          docName: "Northstar Global Brand Voice Standards v3.2",
          section: "Prohibited Vocabulary Index",
          pageRef: "Appendix B, Page 41",
          verifiedFact: "Listed in Tier 1 Prohibited Slang & Superlatives."
        },
        suggestions: [
          {
            id: "sug-03a",
            text: "systematic and resilient",
            label: "Direct & Crisp",
            explanation: "Substitutes sensationalism with institutional rigor."
          },
          {
            id: "sug-03b",
            text: "disciplined and risk-hedged",
            label: "Authoritative & Compliant",
            explanation: "Highlights portfolio risk management without promising infallibility."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-04",
        category: "tone",
        severity: "warning",
        targetText: "zero downside risk",
        ruleCode: "RULE-SEC-4.4",
        ruleName: "Omission of Material Investment Risk",
        explanation: "Claiming 'zero downside risk' is legally misleading under consumer protection regulations. All market-linked strategies carry inherent capital risk that must be acknowledged.",
        evidenceSource: {
          docName: "Form ADV Part 2A Brochure 2024",
          section: "Risk Disclosures",
          pageRef: "Item 8, Page 17",
          verifiedFact: "Mandatory disclaimer: Capital preservation strategies do not eliminate risk of loss."
        },
        suggestions: [
          {
            id: "sug-04a",
            text: "deliberate capital-preservation strategies",
            label: "Authoritative & Compliant",
            explanation: "Frames safety as an active management methodology, not an absolute guarantee."
          },
          {
            id: "sug-04b",
            text: "hedged downside mitigation",
            label: "Direct & Crisp",
            explanation: "Professional financial nomenclature communicating proactive risk control."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-05",
        category: "terminology",
        severity: "suggestion",
        targetText: "revolutionary AI engine",
        ruleCode: "RULE-VOICE-1.6",
        ruleName: "Vague Tech Hype Superlative",
        explanation: "Brand guidelines advise avoiding generic tech buzzwords. Specify quantitative algorithmic modeling rather than sensationalist 'revolutionary AI' rhetoric.",
        evidenceSource: {
          docName: "Northstar Global Brand Voice Standards v3.2",
          section: "Technology & Quantitative Methodologies",
          pageRef: "Section 4.1, Page 22",
          verifiedFact: "Prefers 'algorithmic rebalancing' or 'quantitative models'."
        },
        suggestions: [
          {
            id: "sug-05a",
            text: "quantitative rebalancing algorithms",
            label: "Authoritative & Compliant",
            explanation: "Specific, credible engineering terminology."
          },
          {
            id: "sug-05b",
            text: "proprietary analytical models",
            label: "Conversational & Safe",
            explanation: "Understated and professional."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-06",
        category: "visual",
        severity: "warning",
        targetText: "Attached Banner: Dominant Color #8B5CF6",
        ruleCode: "RULE-VISUAL-1.4",
        ruleName: "Off-Brand Color Palette Usage",
        explanation: "Extracted dominant banner color (#8B5CF6 Purple) is not part of the approved Northstar visual brand swatch palette (Primary Navy #121E36, Royal Blue #4C6EF5, Teal #50BEB8).",
        evidenceSource: {
          docName: "Digital Visual Identity Guide v2.5",
          section: "Color Systems & Digital Swatches",
          pageRef: "Section 2, Page 8",
          verifiedFact: "Approved digital accents are strictly #4C6EF5 and #50BEB8."
        },
        suggestions: [
          {
            id: "sug-06a",
            text: "Replace #8B5CF6 with approved Royal Blue (#4C6EF5)",
            label: "Direct & Crisp",
            explanation: "Re-aligns visual banner to corporate brand guidelines."
          }
        ],
        status: "unresolved"
      },
      {
        id: "find-07",
        category: "accessibility",
        severity: "warning",
        targetText: "Banner Text Contrast Ratio: 2.9:1",
        ruleCode: "RULE-WCAG-2.1",
        ruleName: "WCAG 2.1 AA Contrast Failure",
        explanation: "Header text on the promotional banner exhibits a contrast ratio of 2.9:1 against background. WCAG 2.1 AA requires minimum 4.5:1 for standard digital marketing text.",
        evidenceSource: {
          docName: "Digital Visual Identity & Accessibility Guide v2.5",
          section: "WCAG Accessibility Compliance",
          pageRef: "Section 5.3, Page 19",
          verifiedFact: "Minimum contrast requirement: 4.5:1 for standard text, 3.0:1 for large display text."
        },
        suggestions: [
          {
            id: "sug-07a",
            text: "Increase background overlay opacity to achieve 5.8:1 contrast ratio",
            label: "Authoritative & Compliant",
            explanation: "Automatically achieves WCAG AA compliance."
          }
        ],
        status: "unresolved"
      }
    ]
  },
  {
    id: "preset-2",
    name: "Example 2: Press Release (AUM Mismatch)",
    badge: "Factual Audit Breach",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    channel: "Press Release",
    title: "Global Wealth Custody Expansion Release",
    content: `Northstar Financial today announced international expansion of its proprietary wealth strategies across Europe. Backed by over $30 Billion in managed capital and our foolproof safety ledger, we guarantee market-beating performance for institutional sovereign wealth clients without regulatory delay.`,
    bannerHex: "#D946EF",
    contrastRatio: 2.4,
    initialFindings: [
      {
        id: "p2-find-01",
        category: "claim",
        severity: "critical",
        targetText: "$30 Billion in managed capital",
        ruleCode: "FACT-MISMATCH-1.2",
        ruleName: "Hallucinated / Unaudited Scale Metric",
        explanation: "Draft asserts $30B in managed capital. Northstar's officially audited AUM is $14.2 Billion USD (KPMG Q3 2024 Audit Statement). Misrepresenting custodial scale violates regulatory disclosure rules.",
        evidenceSource: {
          docName: "Q3 2024 Independent Auditor's Statement (KPMG)",
          section: "Executive Financial Summary",
          pageRef: "Section 3.2, Page 14",
          verifiedFact: "Approved AUM figure is $14.2 Billion USD."
        },
        suggestions: [
          {
            id: "p2-sug-01",
            text: "$14.2 Billion in verified assets under management",
            label: "Audited & Verified",
            explanation: "Replaces ungrounded scale metric with verified KPMG audit figure."
          }
        ],
        status: "unresolved"
      },
      {
        id: "p2-find-02",
        category: "claim",
        severity: "critical",
        targetText: "guarantee market-beating performance",
        ruleCode: "RULE-SEC-4.1",
        ruleName: "Promissory Return Language Violation",
        explanation: "Fiduciary regulations strictly prohibit promising guaranteed market-beating returns in public syndication copy.",
        evidenceSource: {
          docName: "Regulatory Compliance & Claims Guide v4.0",
          section: "Securities Advertising",
          pageRef: "Clause 3.1, Page 12",
          verifiedFact: "No investment return may be characterized as guaranteed under federal securities law."
        },
        suggestions: [
          {
            id: "p2-sug-02",
            text: "pursue benchmarked outperformance through disciplined stewardship",
            label: "Compliant & Fiduciary",
            explanation: "Aligns with SEC Rule 206(4)-1 standards."
          }
        ],
        status: "unresolved"
      },
      {
        id: "p2-find-03",
        category: "terminology",
        severity: "warning",
        targetText: "foolproof",
        ruleCode: "RULE-VOICE-2.3",
        ruleName: "Prohibited Unprofessional Jargon",
        explanation: "'Foolproof' is blacklisted in brand voice standards as sensationalist slang.",
        evidenceSource: {
          docName: "Northstar Global Brand Voice Standards v3.2",
          section: "Prohibited Vocabulary Index",
          pageRef: "Appendix B, Page 41",
          verifiedFact: "Tier 1 Prohibited Slang."
        },
        suggestions: [
          {
            id: "p2-sug-03",
            text: "rigorously audited",
            label: "Institutional Tone",
            explanation: "Reflects corporate fiduciary integrity."
          }
        ],
        status: "unresolved"
      }
    ]
  },
  {
    id: "preset-3",
    name: "Example 3: Social Teaser (Contrast Failure)",
    badge: "WCAG & Tone Focus",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    channel: "Twitter/X",
    title: "Zurich FinTech Innovation Keynote Teaser",
    content: `Join Northstar Financial in Zurich as our leadership unveils revolutionary AI strategies designed to eliminate all downside market risk. Discover why traditional banking models are officially obsolete.`,
    bannerHex: "#F59E0B",
    contrastRatio: 2.1,
    initialFindings: [
      {
        id: "p3-find-01",
        category: "tone",
        severity: "critical",
        targetText: "eliminate all downside market risk",
        ruleCode: "RULE-SEC-4.4",
        ruleName: "Misleading Safety Representation",
        explanation: "Claiming to eliminate market risk is legally false and breaches consumer protection statutes.",
        evidenceSource: {
          docName: "Form ADV Part 2A Brochure 2024",
          section: "Risk Disclosures",
          pageRef: "Item 8, Page 17",
          verifiedFact: "Mandatory disclosure: Systematic market volatility cannot be eliminated."
        },
        suggestions: [
          {
            id: "p3-sug-01",
            text: "mitigate systematic volatility through structured risk-hedging",
            label: "Fiduciary Framing",
            explanation: "Communicates proactive risk management without promissory guarantees."
          }
        ],
        status: "unresolved"
      },
      {
        id: "p3-find-02",
        category: "terminology",
        severity: "suggestion",
        targetText: "revolutionary AI strategies",
        ruleCode: "RULE-VOICE-1.6",
        ruleName: "Vague Tech Superlative",
        explanation: "Prefer precise quantitative terminology over generic AI hyperbole.",
        evidenceSource: {
          docName: "Northstar Global Brand Voice Standards v3.2",
          section: "Technology Section",
          pageRef: "Page 22",
          verifiedFact: "Prefers 'algorithmic modeling' or 'quantitative analysis'."
        },
        suggestions: [
          {
            id: "p3-sug-02",
            text: "quantitative asset allocation models",
            label: "Technical & Credible",
            explanation: "Specific, credible engineering terminology."
          }
        ],
        status: "unresolved"
      },
      {
        id: "p3-find-03",
        category: "accessibility",
        severity: "warning",
        targetText: "Banner Text Contrast Ratio: 2.1:1",
        ruleCode: "RULE-WCAG-2.1",
        ruleName: "Severe WCAG 2.1 AA Contrast Failure",
        explanation: "White text over bright amber background achieves only 2.1:1 contrast, failing the minimum 4.5:1 WCAG AA legal requirement.",
        evidenceSource: {
          docName: "Digital Visual Identity & Accessibility Guide v2.5",
          section: "WCAG Accessibility Compliance",
          pageRef: "Section 5.3, Page 19",
          verifiedFact: "Minimum contrast requirement: 4.5:1 for standard text."
        },
        suggestions: [
          {
            id: "p3-sug-03",
            text: "Switch to high-contrast Navy (#121E36) background with 6.8:1 ratio",
            label: "Instant Harmonize",
            explanation: "Achieves immediate WCAG 2.1 AA compliance."
          }
        ],
        status: "unresolved"
      }
    ]
  }
];

export function scanDynamicContent(text: string, isBannerCompliant: boolean = false): Finding[] {
  const findings: Finding[] = [];
  const lower = text.toLowerCase();

  // 1. Check for promised returns
  if (lower.includes("guaranteed") || lower.includes("guarantee")) {
    findings.push({
      id: "dyn-01",
      category: "claim",
      severity: "critical",
      targetText: text.match(/guarantee[d]?\s+[^.,\n]+/i)?.[0] || "guaranteed returns",
      ruleCode: "RULE-SEC-4.1",
      ruleName: "Prohibition of Promised Investment Returns",
      explanation: "Explicitly promising returns or performance breaches SEC Rule 206(4)-1 and corporate fiduciary standards.",
      evidenceSource: {
        docName: "Regulatory Compliance & Claims Guide v4.0",
        section: "Securities Advertising",
        pageRef: "Clause 3.1, Page 12",
        verifiedFact: "No investment return may be characterized as guaranteed under federal securities law."
      },
      suggestions: [
        {
          id: "dyn-sug-01",
          text: "target long-term yield strategies aligned with your risk tolerance",
          label: "Compliant & Fiduciary",
          explanation: "Substitutes promissory language with compliant objective framing."
        }
      ],
      status: "unresolved"
    });
  }

  // 2. Check for AUM numbers mismatch (anything claiming Billions or AUM not matching 14.2)
  const aumMatch = text.match(/\$[0-9]+(\.[0-9]+)?\s*billion/i);
  if (aumMatch && !aumMatch[0].includes("14.2")) {
    findings.push({
      id: "dyn-02",
      category: "claim",
      severity: "critical",
      targetText: aumMatch[0],
      ruleCode: "FACT-MISMATCH-1.2",
      ruleName: "Unsupported AUM Metrics Mismatch",
      explanation: `Draft asserts "${aumMatch[0]}". Audited KPMG records confirm total firm AUM is $14.2 Billion USD. Overstating scale damages organizational credibility.`,
      evidenceSource: {
        docName: "Q3 2024 Independent Auditor's Statement (KPMG)",
        section: "Executive Financial Summary",
        pageRef: "Section 3.2, Page 14",
        verifiedFact: "Approved AUM figure is $14.2 Billion USD."
      },
      suggestions: [
        {
          id: "dyn-sug-02",
          text: "$14.2 Billion in audited assets under stewardship",
          label: "Audited & Verified",
          explanation: "Cites verified audit figures."
        }
      ],
      status: "unresolved"
    });
  }

  // 3. Check for "foolproof"
  if (lower.includes("foolproof")) {
    findings.push({
      id: "dyn-03",
      category: "terminology",
      severity: "warning",
      targetText: "foolproof",
      ruleCode: "RULE-VOICE-2.3",
      ruleName: "Prohibited Unprofessional Jargon",
      explanation: "'Foolproof' is blacklisted in brand voice standards as sensationalist slang.",
      evidenceSource: {
        docName: "Northstar Global Brand Voice Standards v3.2",
        section: "Prohibited Vocabulary Index",
        pageRef: "Appendix B, Page 41",
        verifiedFact: "Tier 1 Prohibited Slang."
      },
      suggestions: [
        {
          id: "dyn-sug-03",
          text: "systematic and resilient",
          label: "Institutional Tone",
          explanation: "Substitutes sensationalism with institutional rigor."
        }
      ],
      status: "unresolved"
    });
  }

  // 4. Check for "zero downside risk" or "risk-free"
  if (lower.includes("zero downside") || lower.includes("risk-free") || lower.includes("no risk")) {
    const match = text.match(/zero downside risk|risk-free|no risk/i)?.[0] || "zero downside risk";
    findings.push({
      id: "dyn-04",
      category: "tone",
      severity: "critical",
      targetText: match,
      ruleCode: "RULE-SEC-4.4",
      ruleName: "Omission of Material Investment Risk",
      explanation: "Claiming zero downside risk violates investor disclosure regulations. All market investments carry inherent capital risk.",
      evidenceSource: {
        docName: "Form ADV Part 2A Brochure 2024",
        section: "Risk Disclosures",
        pageRef: "Item 8, Page 17",
        verifiedFact: "Mandatory disclaimer: Capital preservation strategies do not eliminate risk of loss."
      },
      suggestions: [
        {
          id: "dyn-sug-04",
          text: "deliberate capital-preservation strategies",
          label: "Fiduciary Framing",
          explanation: "Frames safety as active management, not a blanket guarantee."
        }
      ],
      status: "unresolved"
    });
  }

  // 5. Check for "revolutionary AI"
  if (lower.includes("revolutionary ai") || lower.includes("revolutionary")) {
    findings.push({
      id: "dyn-05",
      category: "terminology",
      severity: "suggestion",
      targetText: text.match(/revolutionary(\s+ai(\s+engine)?)?/i)?.[0] || "revolutionary AI",
      ruleCode: "RULE-VOICE-1.6",
      ruleName: "Vague Tech Hype Superlative",
      explanation: "Brand guidelines advise avoiding generic tech buzzwords. Specify exact quantitative methodology.",
      evidenceSource: {
        docName: "Northstar Global Brand Voice Standards v3.2",
        section: "Technology Section",
        pageRef: "Page 22",
        verifiedFact: "Prefers 'algorithmic rebalancing' or 'quantitative models'."
      },
      suggestions: [
        {
          id: "dyn-sug-05",
          text: "quantitative rebalancing algorithms",
          label: "Technical & Credible",
          explanation: "Specific, credible engineering terminology."
        }
      ],
      status: "unresolved"
    });
  }

  // 6. Visual findings if banner is off-brand
  if (!isBannerCompliant) {
    findings.push({
      id: "dyn-06",
      category: "visual",
      severity: "warning",
      targetText: "Attached Banner: Dominant Color #8B5CF6",
      ruleCode: "RULE-VISUAL-1.4",
      ruleName: "Off-Brand Color Palette Usage",
      explanation: "Detected banner color #8B5CF6 (Purple) is not in the approved Northstar digital swatch palette (#121E36, #4C6EF5, #50BEB8).",
      evidenceSource: {
        docName: "Digital Visual Identity Guide v2.5",
        section: "Color Systems",
        pageRef: "Section 2, Page 8",
        verifiedFact: "Approved accents: #4C6EF5 and #50BEB8."
      },
      suggestions: [
        {
          id: "dyn-sug-06",
          text: "Harmonize banner to approved Navy (#121E36)",
          label: "1-Click Harmonize",
          explanation: "Restores visual brand adherence."
        }
      ],
      status: "unresolved"
    });

    findings.push({
      id: "dyn-07",
      category: "accessibility",
      severity: "warning",
      targetText: "Banner Text Contrast Ratio: 2.9:1",
      ruleCode: "RULE-WCAG-2.1",
      ruleName: "WCAG 2.1 AA Contrast Failure",
      explanation: "Banner text contrast of 2.9:1 fails the 4.5:1 WCAG AA minimum threshold.",
      evidenceSource: {
        docName: "Digital Visual Identity & Accessibility Guide v2.5",
        section: "WCAG Compliance",
        pageRef: "Page 19",
        verifiedFact: "Minimum contrast requirement: 4.5:1."
      },
      suggestions: [
        {
          id: "dyn-sug-07",
          text: "Switch to high-contrast Navy (#121E36) with 6.8:1 ratio",
          label: "WCAG AA Pass",
          explanation: "Complies with accessibility standards."
        }
      ],
      status: "unresolved"
    });
  }

  return findings;
}

export const sampleRiskyCampaign = sampleCampaignPresets[0];
export const initialFindings: Finding[] = sampleCampaignPresets[0].initialFindings;

export const seededReviewQueue: ReviewItem[] = [
  {
    id: "rev-101",
    title: "Q4 High-Yield Growth Accelerator Post",
    channel: "LinkedIn",
    creator: {
      name: "Marcus Thorne",
      role: "Senior Growth Marketing Manager",
      avatar: "MT"
    },
    submittedAt: "18 minutes ago",
    status: "in_review",
    complianceScore: 64,
    draftContent: sampleRiskyCampaign.content,
    visualAssetUrl: "/demo-banner.png",
    visualInspection: {
      detectedHex: ["#8B5CF6", "#121E36", "#FAF7EF"],
      contrastRatio: 2.9,
      contrastCompliant: false,
      logoClearanceScore: 92
    },
    findings: initialFindings,
    comments: [
      {
        id: "comm-01",
        author: "Sarah Chen",
        role: "Brand Manager",
        avatar: "SC",
        message: "Marcus, the AUM stat is severely inflated ($25B vs verified $14.2B) and guaranteed yield violates Rule SEC-4.1. Please apply the inline harmonized fixes before we can route to legal.",
        timestamp: "12 mins ago"
      }
    ]
  },
  {
    id: "rev-102",
    title: "Global Institutional Partnership Press Release",
    channel: "Press Release",
    creator: {
      name: "Elena Rostova",
      role: "Corporate Communications Director",
      avatar: "ER"
    },
    submittedAt: "2 hours ago",
    status: "approved",
    complianceScore: 98,
    draftContent: "Northstar Financial today announced an institutional custodial expansion serving Tier-1 pension funds across Western Europe. With $14.2 Billion in verified assets under stewardship, the partnership expands sovereign portfolio execution while maintaining strict dual SEC and FCA regulatory oversight.",
    findings: [],
    comments: [
      {
        id: "comm-02",
        author: "David Vance",
        role: "Legal Counsel",
        avatar: "DV",
        message: "All verified facts confirmed against Q3 KPMG audit. Formally signed off for global syndication.",
        timestamp: "45 mins ago"
      }
    ]
  },
  {
    id: "rev-103",
    title: "Client Quarterly Wealth Digest — November Edition",
    channel: "Email Newsletter",
    creator: {
      name: "Priya Sharma",
      role: "Editorial Lead",
      avatar: "PS"
    },
    submittedAt: "Yesterday at 4:30 PM",
    status: "changes_requested",
    complianceScore: 78,
    draftContent: "Navigating interest rate shifts requires unwavering conviction. In this issue, our chief investment strategist unpacks why traditional 60/40 asset allocations are officially obsolete for modern high-net-worth families.",
    findings: [
      {
        id: "find-prev-1",
        category: "tone",
        severity: "warning",
        targetText: "officially obsolete",
        ruleCode: "RULE-VOICE-3.1",
        ruleName: "Sensationalist Generalization",
        explanation: "Northstar editorial guidelines advise against declaring conventional market models 'obsolete' without contextual nuance.",
        evidenceSource: {
          docName: "Northstar Brand Voice Standards",
          section: "Market Commentary",
          pageRef: "Pg 14"
        },
        suggestions: [
          {
            id: "sug-p1",
            text: "facing structural evolution in inflationary environments",
            label: "Authoritative & Compliant",
            explanation: "Nuanced, institutional analysis."
          }
        ],
        status: "unresolved"
      }
    ],
    comments: [
      {
        id: "comm-03",
        author: "Sarah Chen",
        role: "Brand Manager",
        avatar: "SC",
        message: "Tone is slightly sensationalist in paragraph 1. Tone it down to maintain our research-grade credibility.",
        timestamp: "Yesterday at 5:15 PM"
      }
    ]
  },
  {
    id: "rev-104",
    title: "FinTech Innovation Summit Keynote Deck Teaser",
    channel: "Twitter/X",
    creator: {
      name: "Liam O'Connor",
      role: "Social Media Strategist",
      avatar: "LO"
    },
    submittedAt: "2 days ago",
    status: "exception_granted",
    complianceScore: 88,
    draftContent: "Join us in Zurich as Northstar CIO breaks down why legacy banking stacks can't keep up with real-time algorithmic portfolio management. Drop a comment for VIP pass access.",
    findings: [
      {
        id: "find-prev-2",
        category: "tone",
        severity: "suggestion",
        targetText: "can't keep up",
        ruleCode: "RULE-VOICE-2.2",
        ruleName: "Competitor Derogation Policy",
        explanation: "Prefer positive differentiation over criticizing legacy banking infrastructure directly.",
        evidenceSource: {
          docName: "Brand Book Rule 2.2",
          section: "Competitor Etiquette",
          pageRef: "Pg 9"
        },
        suggestions: [],
        status: "overridden",
        exceptionNote: "Approved exception for live conference promotional campaign (Approved by Brand Director Sarah Chen)."
      }
    ],
    comments: [
      {
        id: "comm-04",
        author: "Sarah Chen",
        role: "Brand Manager",
        avatar: "SC",
        message: "Exception granted for Zurich tech keynote context. Engaging phrasing justified.",
        timestamp: "1 day ago"
      }
    ]
  }
];

export const mockGovernanceMetrics: GovernanceMetrics = {
  totalReviews: 148,
  approvedCount: 119,
  flaggedIssues: 382,
  avgTurnaroundMinutes: 14,
  complianceRate: 89.2,
  weeklyTrend: [
    { day: "Mon", scans: 18, complianceScore: 78 },
    { day: "Tue", scans: 24, complianceScore: 82 },
    { day: "Wed", scans: 31, complianceScore: 85 },
    { day: "Thu", scans: 28, complianceScore: 89 },
    { day: "Fri", scans: 35, complianceScore: 92 },
    { day: "Sat", scans: 6, complianceScore: 94 },
    { day: "Sun", scans: 6, complianceScore: 91 }
  ],
  frequentlyViolatedRules: [
    {
      ruleCode: "RULE-SEC-4.1",
      ruleName: "Promissory Return Language",
      count: 64,
      category: "claim",
      overrideRatePercent: 4.2,
      recommendation: "Low override rate. Rule is effective; provide creators with 3 additional compliant phrasing templates."
    },
    {
      ruleCode: "RULE-VOICE-3.1",
      ruleName: "Prohibited Hype / Superlatives",
      count: 52,
      category: "terminology",
      overrideRatePercent: 72.5,
      recommendation: "High 72.5% manager override rate indicates this rule is overly rigid for social campaign creators. Clarify guideline to permit energetic phrasing for live event teasers."
    },
    {
      ruleCode: "RULE-VISUAL-1.4",
      ruleName: "Off-Brand Color Palette Usage",
      count: 41,
      category: "visual",
      overrideRatePercent: 12.0,
      recommendation: "Agency freelancers consistently use unapproved purples. Distribute downloadable Figma swatch kits to external agencies."
    },
    {
      ruleCode: "FACT-MISMATCH-1.2",
      ruleName: "Outdated or Hallucinated AUM Figures",
      count: 38,
      category: "claim",
      overrideRatePercent: 0.0,
      recommendation: "Zero override tolerance. Zero-hallucination Fact-Vault successfully prevented 38 inaccurate financial claims from reaching public channels."
    },
    {
      ruleCode: "RULE-WCAG-2.1",
      ruleName: "Text Contrast Ratio Below 4.5:1",
      count: 29,
      category: "accessibility",
      overrideRatePercent: 8.5,
      recommendation: "Provide 1-click automatic background darkener overlay in Visual Inspector."
    }
  ]
};
