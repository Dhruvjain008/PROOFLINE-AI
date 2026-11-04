export type Severity = 'critical' | 'warning' | 'suggestion';

export type FindingCategory = 'claim' | 'tone' | 'terminology' | 'visual' | 'accessibility';

export interface RewriteOption {
  id: string;
  text: string;
  label: 'Direct & Crisp' | 'Authoritative & Compliant' | 'Conversational & Safe';
  explanation: string;
}

export interface Finding {
  id: string;
  category: FindingCategory;
  severity: Severity;
  targetText: string;
  startOffset?: number;
  endOffset?: number;
  ruleCode: string;
  ruleName: string;
  explanation: string;
  evidenceSource: {
    docName: string;
    section: string;
    pageRef: string;
    verifiedFact?: string;
  };
  suggestions: RewriteOption[];
  status: 'unresolved' | 'applied' | 'overridden';
  appliedRewriteId?: string;
  exceptionNote?: string;
}

export interface BrandColor {
  hex: string;
  name: string;
  role: 'Primary' | 'Secondary' | 'Accent' | 'Background';
  isApproved: boolean;
}

export interface ApprovedFact {
  id: string;
  claim: string;
  approvedFigure: string;
  sourceDoc: string;
  pageRef: string;
  verifiedDate: string;
  category: 'Financials' | 'Compliance' | 'Scale' | 'Customer Metrics';
}

export interface ProhibitedTerm {
  term: string;
  severity: Severity;
  replacement: string;
  rationale: string;
  ruleRef: string;
}

export interface BrandGuidelineDoc {
  id: string;
  title: string;
  version: string;
  lastUpdated: string;
  fileSize: string;
  rulesCount: number;
  category: string;
}

export interface BrandProfile {
  name: string;
  sector: string;
  tagline: string;
  voiceAttributes: {
    name: string;
    description: string;
    exampleDo: string;
    exampleDont: string;
  }[];
  colors: BrandColor[];
  facts: ApprovedFact[];
  prohibitedTerms: ProhibitedTerm[];
  guidelines: BrandGuidelineDoc[];
}

export type ReviewStatus = 'pending' | 'in_review' | 'changes_requested' | 'approved' | 'exception_granted';

export interface ReviewComment {
  id: string;
  author: string;
  role: 'Creator' | 'Brand Manager' | 'Legal Counsel';
  avatar: string;
  message: string;
  timestamp: string;
}

export interface ReviewItem {
  id: string;
  title: string;
  channel: 'LinkedIn' | 'Press Release' | 'Twitter/X' | 'Email Newsletter' | 'Executive Keynote';
  creator: {
    name: string;
    role: string;
    avatar: string;
  };
  submittedAt: string;
  status: ReviewStatus;
  complianceScore: number;
  draftContent: string;
  visualAssetUrl?: string;
  visualInspection?: {
    detectedHex: string[];
    contrastRatio: number;
    contrastCompliant: boolean;
    logoClearanceScore: number;
  };
  findings: Finding[];
  comments: ReviewComment[];
}

export interface GovernanceMetrics {
  totalReviews: number;
  approvedCount: number;
  flaggedIssues: number;
  avgTurnaroundMinutes: number;
  complianceRate: number;
  weeklyTrend: { day: string; scans: number; complianceScore: number }[];
  frequentlyViolatedRules: {
    ruleCode: string;
    ruleName: string;
    count: number;
    category: FindingCategory;
    overrideRatePercent: number;
    recommendation: string;
  }[];
}
