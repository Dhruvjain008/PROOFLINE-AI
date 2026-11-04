# Proofline AI — The Evidence-First Brand Governance Copilot

[![CodeNexus India 2026](https://img.shields.io/badge/CodeNexus_India_2026-Round_2_Qualified-blue.svg)](https://wecodecoders.in/events/codenexus-india)
[![Team FALCON](https://img.shields.io/badge/Team-FALCON_(Solo_Developer)-emerald.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Next.js_16_•_React_19_•_TypeScript_5_•_Tailwind_CSS-black.svg)](#)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG_2.1_AA_Compliant-teal.svg)](#)

> **"AI should never make silent publishing decisions. Every finding must provide concrete evidence, and a human must make the final call."**

Proofline AI is an enterprise pre-flight brand governance copilot built for regulated industries (FinTech, Institutional Wealth, Healthcare, Enterprise SaaS). It intercepts marketing copy, financial assertions, and campaign banners before publication—validating every assertion against approved factsheets and regulatory standards (SEC Rule 206(4)-1 & FCA Fiduciary Code).

---

## ⚡ 60-Second Judge Walkthrough (Step-by-Step)

If you are evaluating this project for **CodeNexus India 2026**, here is the recommended 4-step evaluation flow:

1. **Dashboard (`/`)**: Observe the executive brand governance metrics, weekly pre-flight compliance velocity, active intercepted risks, and Northstar Brand Assets swatch kit.
2. **Hero Feature — Content Review Studio (`Review Studio` in sidebar)**:
   - Click the blue **"Run Pre-Flight Scan"** button.
   - Watch the **cinematic 7-stage deterministic & RAG scanner** analyze regex blacklists, extract banner HEX swatches, calculate WCAG 2.1 AA contrast, and query the Audited Fact-Vault.
   - Click any flagged phrase in the draft (`guaranteed 18% annual returns`, `$25 Billion in active assets`, or `foolproof`).
   - Notice the **4-part Evidence Card**:
     1. *What is wrong?*
     2. *Why does it matter?*
     3. *Approved evidence source citation (e.g. KPMG Q3 Audit Statement p.14).*
     4. *Intent-preserving rewrites with 1-click **Apply Fix** and **Undo**.*
   - Switch to the **Side-by-Side Diff** tab to see Git-style pre/post draft comparison.
   - Switch to the **Visual & WCAG** tab to inspect banner contrast and click **"1-Click Harmonize Banner"** to automatically transition off-brand purple to approved Deep Navy (`#121E36`).
   - Click **"Submit for Manager Sign-Off"**.
3. **Stage-Gate Approvals (`Stage-Gate Approvals` in sidebar)**:
   - Switch roles using the top-right header role selector (`Content Creator` ➔ `Brand Manager` ➔ `Legal & Compliance`).
   - Inspect pending campaign submissions, view collaborative reviewer audit threads, and execute **"Approve for Syndication"**, **"Request Revisions"**, or **"Grant Exception"**.
4. **Guideline Friction Radar & Audit Certificate (`Friction & Audit` in sidebar)**:
   - View human override rates per rule code to detect overly rigid or ambiguous guidelines (self-healing brand guidelines).
   - Click **"Export Compliance Certificate"** to view and print an enterprise pre-flight verification audit certificate with SHA-256 hash.

---

## 🏛️ Core Architectural Pillars

### 1. The 4-Answer Rule
Every AI finding in Proofline strictly answers:
1. **What is wrong?** (Exact highlighted problematic target text)
2. **Why does it matter?** (Regulatory fine risk, trademark exposure, or brand dilution)
3. **Which approved rule or source supports it?** (Direct citation to Brand Guide chapter or Audited Auditor Statement with exact page reference)
4. **How can the creator fix it?** (Tone-preserving compliant alternative phrases)

### 2. Zero-Hallucination Fact-Vault (RAG Engine)
Instead of allowing generative models to invent facts, Proofline indexes corporate audited metrics (e.g., Northstar's *$14.2B AUM verified by KPMG Q3 2024 Audit Statement*). When a draft claims *$25B AUM*, Proofline intercepts the claim with high-priority severity and provides the verified figure.

### 3. Multi-Modal Visual Palette & WCAG 2.1 AA Mathematical Engine
Deterministically analyzes banner artwork, extracts dominant HEX colors, checks against approved brand swatches, and computes relative luminance contrast ratios:
$$\text{Contrast Ratio} = \frac{L_1 + 0.05}{L_2 + 0.05}$$
Flags non-compliant assets below the 4.5:1 WCAG AA minimum threshold.

### 4. Guideline Friction Radar
Measures the percentage of times human managers override an AI flag. A high override rate (e.g., 72.5% on promotional superlatives) signals that the guideline itself is ambiguous and requires organizational refinement.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.4.3 (App Router)
- **UI & Runtime**: React 19.3.0, TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS 3.4.19 with custom corporate editorial palette
- **Design Tokens**: Deep Navy (`#121E36`), Royal Blue (`#4C6EF5`), Growth Teal (`#50BEB8`), Warm Cream (`#FFF1C1`), Soft Ivory (`#FAF7EF`)
- **Motion & Micro-interactions**: Pure hardware-accelerated CSS Keyframes (`scanProgress`, `pulseRing`, `cardLift`, `scoreCount`, `toastIn`) + GSAP & Framer Motion architecture
- **Icons & Components**: Lucide React 1.63.0, Radix UI Primitives

---

## 🚀 Three Major Improvements for Round 3

As declared in the Round 1 proposal, the following 3 deep engineering enhancements will be completed in Round 3:

1. **Multi-Modal Visual Palette & WCAG 2.1 AA Accessibility Engine**: Real-time canvas pixel parser with automatic darkener overlays and live Figma plugin synchronization.
2. **Vector-Backed Fact-Vault with Source Citation Badging (RAG)**: Full hybrid vector embeddings (Pinecone/pgvector) with automated PDF parsing and cryptographically signed claim timestamps.
3. **Guideline Friction Radar & Downloadable PDF Audit Certificate**: Automated weekly PDF generation with cryptographic audit seal and Slack/Teams stage-gate webhook dispatchers.

---

## 💻 Local Development & Verification

```bash
# Clone the repository
git clone <repo-url>
cd proofline

# Install dependencies
npm install

# Run type check (passes with 0 errors)
npx tsc --noEmit

# Run production build (passes with 0 errors)
npm run build

# Start local server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 👤 Solo Developer & Team Details

- **Team Name**: FALCON
- **Developer**: Dhruv Jain (Solo Developer & Architect)
- **Event**: CodeNexus India 2026 (Round 2 Build Phase)
- **Target**: Top 3 Finalist / Inkloom AI PPO & Incubation
