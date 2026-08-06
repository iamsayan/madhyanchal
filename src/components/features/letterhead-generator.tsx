'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FileText,
  Printer,
  Sparkles,
  User,
  Building2,
  FileCheck,
  Eye,
  EyeOff,
  Sliders,
  Lock,
  ShieldCheck,
  KeyRound,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface LetterheadData {
  template: 'jagadhatri' | 'durga' | 'plain';
  refNo: string;
  date: string;
  subject: string;
  recipientName: string;
  recipientDesignation: string;
  recipientAddress: string;
  body: string;
  signatoryName: string;
  signatoryRole: string;
  signatoryOrg: string;
}

const TEMPLATES = [
  {
    id: 'jagadhatri',
    name: 'Jagadhatri Puja Samity',
    image: process.env.NEXT_PUBLIC_LETTERHEAD_MSJPS_URL || '',
    color: 'amber',
  },
  {
    id: 'durga',
    name: 'Durga Puja Samity',
    image: process.env.NEXT_PUBLIC_LETTERHEAD_MSDPS_URL || '',
    color: 'rose',
  },
  {
    id: 'plain',
    name: 'Standard Plain Header',
    image: '',
    color: 'slate',
  },
] as const;

const PRESETS = [
  {
    id: 'vendor_contract',
    title: 'Vendor Work Order Contract',
    subject: 'OFFICIAL WORK ORDER & VENDOR CONTRACT AGREEMENT',
    body: `MEMORANDUM OF WORK ORDER & CONTRACT AGREEMENT

This Work Order Agreement is formally executed between Madhyanchal Sarbajanin (Puja Executive Committee) and M/s [Vendor / Agency Name] (Service Provider) for upcoming festival setup & execution.

1. SCOPE OF WORK & SPECIFICATIONS:
- Pandal Structure / Lighting Setup / Sound System: Complete installation as per approved blueprint and design.
- Dimensions & Measurements: Ground clearance area [e.g. 60ft x 40ft], Height clearance [e.g. 35ft], with fire-retardant material lining.
- Decorative Elements: Illuminated main entry arch, stage backdrop, sound distribution towers, and safe wiring runs.

2. TIMELINE & DEADLINE:
- Site Handover for Fabrication: [Start Date]
- Mandatory Structural Completion & Safety Audit: [Completion Date - 2 Days Prior]
- Final Handover & Testing: [Final Date by 5:00 PM]

3. SAFETY & COMPLIANCE MANDATE:
- All electrical wirings must adhere to West Bengal State Fire Service and WBSEDCL safety norms with mandatory Earth Leakage Circuit Breakers (ELCB).
- The vendor is fully responsible for structural stability against adverse weather conditions.

4. PAYMENT TERMS & CONSIDERATION:
- Total Contracted Amount: Rs. [Total Amount] /-
- Advance Paid: Rs. [Advance Amount] /- (Receipt Acknowledged)
- Final Balance Payment: Payable within 7 days post-festival completion upon inspection.

Both parties hereby agree to strictly abide by the terms mentioned above.`,
    signatoryName: 'Secretary / Treasurer',
    signatoryRole: 'Madhyanchal Sarbajanin',
  },
  {
    id: 'member_auth',
    title: 'Member Authorization',
    subject: 'LETTER OF COMMITTEE MEMBER AUTHORIZATION',
    body: `This is to certify that Sri/Smt. [Member Name] is an active and verified executive committee member of Madhyanchal Sarbajanin for the current term.

He/She is hereby authorized to represent our organization for administrative, cultural, and community welfare coordination activities in Chandannagar.

All concerned authorities and well-wishers are kindly requested to render necessary assistance and cooperation to him/her.`,
    signatoryName: 'General Secretary',
    signatoryRole: 'Executive Committee',
  },
  {
    id: 'meeting_notice',
    title: 'Executive Meeting Notice',
    subject: 'NOTICE FOR EXECUTIVE COMMITTEE MEETING',
    body: `Notice is hereby given that an urgent meeting of the Executive Committee of Madhyanchal Sarbajanin will be held at our Club Premises.

Agenda of the Meeting:
1. Review of upcoming festival preparations and vendor allocations.
2. Financial accounts audit and budget allocation.
3. Miscellaneous items with permission of the Chair.

All respected committee members are earnestly requested to attend the meeting punctually.`,
    signatoryName: 'General Secretary',
    signatoryRole: 'Madhyanchal Sarbajanin',
  },
  {
    id: 'appreciation',
    title: 'Certificate of Appreciation',
    subject: 'LETTER OF APPRECIATION & GRATITUDE',
    body: `The Executive Committee of Madhyanchal Sarbajanin extends its heartfelt gratitude and appreciation to [Recipient Name] for exemplary dedication and noble contribution towards our community welfare initiatives and grand festival celebrations.

Your invaluable support strengthens our vision of unity, tradition, and selfless service to society. We look forward to your continued patronage.`,
    signatoryName: 'President / General Secretary',
    signatoryRole: 'Madhyanchal Sarbajanin',
  },
  {
    id: 'sponsorship',
    title: 'Sponsorship Request',
    subject: 'APPEAL FOR SPONSORSHIP & PUBLICITY BANNER',
    body: `Respected Sir/Madam,

Madhyanchal Sarbajanin warmly invites your esteemed organization to partner with us as an Official Sponsor for our upcoming festival celebrations in Chandannagar.

Drawing over 1,500,000+ visitors and devotees annually, our festival ground provides prime visibility through high-impact physical pandal branding, illuminated gates, LED display screens, and digital souvenir publication.

We look forward to receiving your favorable confirmation.`,
    signatoryName: 'Convenor - Sponsor Cell',
    signatoryRole: 'Madhyanchal Sarbajanin',
  },
];

export function LetterheadGenerator() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [inputPin, setInputPin] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [showPin, setShowPin] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAuth = sessionStorage.getItem('msjps_letterhead_auth');
      if (savedAuth === 'true') {
        setIsAuthorized(true);
      }
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPin = process.env.NEXT_PUBLIC_LETTERHEAD_PIN || '';
    if (correctPin && inputPin.trim() === correctPin) {
      setIsAuthorized(true);
      setPinError(false);
      sessionStorage.setItem('msjps_letterhead_auth', 'true');
    } else {
      setPinError(true);
    }
  };

  const handleLock = () => {
    setIsAuthorized(false);
    setInputPin('');
    sessionStorage.removeItem('msjps_letterhead_auth');
  };

  const [formData, setFormData] = useState<LetterheadData>({
    template: 'jagadhatri',
    refNo: '',
    date: '2026-08-06',
    subject: '',
    recipientName: '',
    recipientDesignation: '',
    recipientAddress: '',
    body: '',
    signatoryName: '',
    signatoryRole: '',
    signatoryOrg: 'Madhyanchal Sarbajanin',
  });

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setFormData((prev) => ({
      ...prev,
      date: today,
    }));
  }, []);

  if (!isAuthorized) {
    return (
      <div className="mx-auto my-8 max-w-md space-y-6">
        <div className="card-glass relative overflow-hidden rounded-2xl border border-amber-500/30 p-6 text-center backdrop-blur-2xl sm:p-8 dark:border-white/15 dark:bg-stone-900/90">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/40 bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <Lock className="h-7 w-7" />
          </div>

          <div className="space-y-2 pt-4">
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/20 px-3 py-0.5 text-[10px] font-black tracking-widest text-amber-800 uppercase dark:text-amber-300">
              <ShieldCheck className="h-3 w-3" /> Restricted Access
            </span>
            <h2 className="font-paytone text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              Passcode Required
            </h2>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Access to export official Madhyanchal Sarbajanin letterheads &
              notices is restricted to authorized Executive Committee members
              only.
            </p>
          </div>

          <form onSubmit={handleUnlock} className="mt-6 space-y-4 text-left">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-200">
                Committee Security PIN *
              </label>
              <div className="relative flex items-center">
                <KeyRound className="absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  type={showPin ? 'text' : 'password'}
                  value={inputPin}
                  onChange={(e) => {
                    setInputPin(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter committee passcode"
                  className="h-10 w-full rounded-xl border border-slate-300/80 bg-white/80 pr-10 pl-9 font-mono text-xs tracking-wider text-slate-900 transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-white/15 dark:bg-stone-950/70 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPin ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {pinError && (
                <p className="flex items-center gap-1 pt-1 text-[11px] font-bold text-rose-500">
                  <AlertCircle className="h-3.5 w-3.5" />
                  Invalid committee passcode. Access denied.
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="h-10 w-full rounded-xl bg-amber-500 font-bold text-slate-950 hover:bg-amber-400"
            >
              <span>Unlock Generator</span>
              <ShieldCheck className="ml-1 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-4 border-t border-slate-200/60 pt-4 dark:border-white/10">
            <p className="text-[10.5px] text-slate-500 dark:text-slate-400">
              For official committee passcode inquiries, contact General
              Secretary or IT Administrator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedTemplate =
    TEMPLATES.find((t) => t.id === formData.template) || TEMPLATES[0];

  const bgImage = selectedTemplate.image;
  const hasLetterhead = Boolean(bgImage);

  const handlePresetSelect = (presetId: string) => {
    const preset = PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setFormData((prev) => ({
      ...prev,
      subject: preset.subject,
      body: preset.body,
      signatoryName: preset.signatoryName,
      signatoryRole: preset.signatoryRole,
    }));
  };

  const handlePrintPdf = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Please allow popups to generate and print PDF letterhead.');
      return;
    }

    const letterheadUrl =
      hasLetterhead && bgImage.startsWith('/') && typeof window !== 'undefined'
        ? `${window.location.origin}${bgImage}`
        : bgImage;

    const formattedDate = new Date(formData.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const formatPrintBodyHtml = (text: string) => {
      if (!text) return '';
      const lines = text.split('\n');
      let html = '';

      lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        // Numbered section heading: e.g. "1. SCOPE OF WORK & SPECIFICATIONS:"
        if (/^\d+\.\s+/.test(trimmed)) {
          html += `<div style="font-weight: 800; color: #0f172a; margin-top: 11px; margin-bottom: 5px; font-size: 11.5px; border-bottom: 1px dashed #cbd5e1; padding-bottom: 2px;">${trimmed}</div>`;
        }
        // Bullet list item: e.g. "- Pandal Structure: ..."
        else if (/^[-*•]\s+/.test(trimmed)) {
          const content = trimmed.replace(/^[-*•]\s+/, '');
          let formattedContent = content;
          if (content.includes(':')) {
            const colonIdx = content.indexOf(':');
            const label = content.substring(0, colonIdx);
            const rest = content.substring(colonIdx + 1);
            formattedContent = `<strong style="color: #0f172a; font-weight: 700;">${label}:</strong>${rest}`;
          }
          html += `<div style="margin-left: 12px; margin-bottom: 5px; position: relative; padding-left: 11px; font-size: 10.5px; line-height: 1.5;"><span style="position: absolute; left: 0; color: #d97706; font-weight: bold;">•</span>${formattedContent}</div>`;
        }
        // Regular paragraph
        else {
          let formatted = trimmed;
          if (
            trimmed.startsWith('MEMORANDUM') ||
            trimmed.startsWith('This Work Order') ||
            trimmed.startsWith('Notice is hereby') ||
            trimmed.startsWith('This is to certify')
          ) {
            formatted = `<strong style="color: #1e293b; font-weight: 700;">${trimmed}</strong>`;
          }
          html += `<p style="margin-bottom: 9px; font-size: 10.5px; line-height: 1.6; text-align: justify;">${formatted}</p>`;
        }
      });

      return html;
    };

    const bodyParagraphs = formatPrintBodyHtml(formData.body);

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${formData.subject} - Madhyanchal Letterhead</title>
          <meta charset="utf-8">
          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              padding: 0;
              font-family: Verdana, Geneva, Tahoma, sans-serif;
              color: #0f172a;
              background-color: #f1f5f9;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print-bar {
              position: sticky;
              top: 0;
              left: 0;
              right: 0;
              background: #0f172a;
              color: #ffffff;
              padding: 10px 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              z-index: 9999;
            }
            .no-print-bar h3 {
              margin: 0;
              font-size: 13px;
              font-weight: 600;
              color: #f59e0b;
            }
            .btn-group {
              display: flex;
              gap: 10px;
            }
            .btn {
              padding: 7px 16px;
              border-radius: 6px;
              font-size: 12px;
              font-weight: 700;
              cursor: pointer;
              border: none;
              transition: all 0.2s;
            }
            .btn-primary {
              background: #f59e0b;
              color: #0f172a;
            }
            .btn-primary:hover {
              background: #d97706;
            }
            .btn-secondary {
              background: #334155;
              color: #ffffff;
            }
            .btn-secondary:hover {
              background: #475569;
            }
            .page-container {
              padding: 15px 0 30px 0;
              display: flex;
              justify-content: center;
            }
            .letterhead-sheet {
              width: 210mm;
              min-height: 297mm;
              ${
                hasLetterhead
                  ? `background-image: url('${letterheadUrl}'); background-size: 210mm 297mm; background-repeat: repeat-y; background-position: top left; padding-top: 210px; padding-left: 42px; padding-right: 42px; padding-bottom: 110px;`
                  : `padding: 40px 45px;`
              }
              background-color: #ffffff;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
              position: relative;
            }
            .plain-header {
              text-align: center;
              border-bottom: 2px solid #ea580c;
              padding-bottom: 12px;
              margin-bottom: 18px;
            }
            .plain-header h1 {
              font-size: 20px;
              font-weight: 800;
              color: #991b1b;
              text-transform: uppercase;
              margin: 0 0 3px 0;
            }
            .plain-header p {
              margin: 2px 0;
              font-size: 11px;
              color: #475569;
            }
            .ref-date-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 11px;
              font-weight: 800;
              color: #1e3a8a;
              margin-bottom: 12px;
              font-family: monospace;
              ${!hasLetterhead ? 'border-bottom: 1px dashed #cbd5e1; padding-bottom: 6px;' : ''}
            }
            .recipient-block {
              margin-bottom: 12px;
              font-size: 11px;
              line-height: 1.4;
              color: #334155;
            }
            .recipient-name {
              font-weight: 800;
              color: #0f172a;
              font-size: 11.5px;
            }
            .subject-title {
              font-size: 13.5px;
              font-weight: 800;
              text-align: center;
              text-transform: uppercase;
              color: #991b1b;
              margin-bottom: 14px;
              line-height: 1.35;
              letter-spacing: 0.2px;
              border-bottom: 1.5px dashed #f59e0b;
              padding-bottom: 5px;
            }
            .letter-body {
              font-size: 11px;
              line-height: 1.5;
              color: #0f172a;
              margin-bottom: 22px;
              text-align: justify;
            }
            .letter-body p {
              margin-bottom: 8px;
            }
            .signature-block {
              margin-top: 20px;
              float: right;
              text-align: center;
              min-width: 190px;
            }
            .sig-title {
              font-size: 11px;
              font-weight: 700;
              color: #475569;
              margin-bottom: 25px;
            }
            .sig-issuer {
              font-size: 11.5px;
              font-weight: 800;
              color: #1e3a8a;
              border-top: 1px solid #cbd5e1;
              padding-top: 4px;
            }
            .sig-org {
              font-size: 10px;
              color: #64748b;
              font-weight: 600;
            }
            .system-gen-footer {
              position: absolute;
              bottom: 160px;
              left: 42px;
              right: 42px;
              text-align: center;
              font-size: 8.5px;
              color: #c9cdd1;
              font-style: italic;
              letter-spacing: 0.2px;
            }
            @media print {
              @page {
                size: A4 portrait;
                margin: 0;
              }
              .no-print-bar {
                display: none !important;
              }
              body {
                background: none !important;
                margin: 0 !important;
                padding: 0 !important;
              }
              .page-container {
                padding: 0 !important;
                display: block !important;
              }
              .letterhead-sheet {
                box-shadow: none !important;
                width: 210mm !important;
                min-height: 297mm !important;
                margin: 0 auto !important;
                padding-top: 210px !important;
                padding-left: 42px !important;
                padding-right: 42px !important;
                padding-bottom: 110px !important;
                ${
                  hasLetterhead
                    ? `background-image: url('${letterheadUrl}') !important; background-size: 210mm 297mm !important; background-repeat: repeat-y !important; background-position: top left !important;`
                    : ``
                }
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              .letter-body div, .letter-body p, .recipient-block, .signature-block {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="no-print-bar">
            <h3>Madhyanchal Sarbajanin - Official Document Preview</h3>
            <div class="btn-group">
              <button class="btn btn-primary" onclick="window.print()">🖨️ Print / Save as PDF</button>
              <button class="btn btn-secondary" onclick="window.close()">Close</button>
            </div>
          </div>
          <div class="page-container">
            <div class="letterhead-sheet">
              ${
                !hasLetterhead
                  ? `<div class="plain-header">
                      <h1>Madhyanchal Sarbajanin</h1>
                      <p>Chandannagar, Hooghly, West Bengal - 712136</p>
                      <p>Official Executive Committee Letterhead</p>
                    </div>`
                  : ''
              }
              <div class="ref-date-row">
                <div>Ref No: ${formData.refNo || 'MS/COMM/2026'}</div>
                <div>Date: ${formattedDate}</div>
              </div>

              ${
                formData.recipientName || formData.recipientDesignation
                  ? `<div class="recipient-block">
                      <div>To,</div>
                      <div class="recipient-name">${formData.recipientName}</div>
                      ${
                        formData.recipientDesignation
                          ? `<div>${formData.recipientDesignation}</div>`
                          : ''
                      }
                      ${
                        formData.recipientAddress
                          ? `<div>${formData.recipientAddress}</div>`
                          : ''
                      }
                    </div>`
                  : ''
              }

              <div class="subject-title">${formData.subject}</div>

              <div class="letter-body">
                ${bodyParagraphs}
              </div>

              <div class="signature-block">
                <div class="sig-title">By Order of Executive Committee</div>
                <div class="sig-issuer">${formData.signatoryName || 'General Secretary'}</div>
                <div class="sig-org">${formData.signatoryOrg || 'Madhyanchal Sarbajanin'}</div>
              </div>

              <div class="system-gen-footer">
                This is a system generated document.
              </div>
            </div>
          </div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 400);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* HEADER BAR & PRESETS DOCK */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-yellow-500/10 p-3.5 backdrop-blur-2xl sm:rounded-3xl sm:p-7 dark:border-white/15 dark:from-stone-900/90 dark:via-stone-900/80 dark:to-stone-950">
        <div className="flex flex-col items-start justify-between gap-3 sm:gap-4 lg:flex-row lg:items-center">
          <div className="flex items-start gap-2.5 sm:gap-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/20 text-amber-600 sm:h-11 sm:w-11 sm:rounded-2xl dark:text-amber-400">
              <FileText className="h-4 w-4 sm:h-5.5 sm:w-5.5" />
            </div>
            <div>
              <h2 className="font-paytone text-sm font-bold text-slate-900 sm:text-2xl dark:text-white">
                Letterhead & Certificate Generator
              </h2>
              <p className="mt-0.5 text-[11px] leading-tight text-slate-600 sm:mt-1 sm:text-sm sm:leading-relaxed dark:text-slate-300">
                Generate official Madhyanchal Sarbajanin notices, member
                certificates, and letters with export to high-resolution PDF.
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-row items-center gap-2 sm:w-auto">
            <button
              type="button"
              onClick={handlePrintPdf}
              className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full border border-amber-500 bg-amber-500 px-4 text-xs font-bold text-slate-950 transition-all hover:bg-amber-400 sm:h-9.5 sm:flex-initial sm:px-5 sm:text-sm"
            >
              <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={handleLock}
              title="Lock Portal"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white/90 px-3.5 text-xs font-bold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 sm:h-9.5 sm:px-4 dark:border-white/15 dark:bg-stone-900 dark:text-slate-200 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
            >
              <LogOut className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Lock</span>
            </button>
          </div>
        </div>

        {/* QUICK PRESETS SELECTION */}
        <div className="mt-3 border-t border-amber-500/20 pt-2.5 sm:mt-5 sm:pt-4 dark:border-white/10">
          <div className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider text-amber-800 uppercase sm:gap-1.5 sm:text-[11px] dark:text-amber-300">
            <Sparkles className="h-3 w-3 text-amber-500 sm:h-3.5 sm:w-3.5" />
            <span>Quick Document Presets:</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className="group flex items-center justify-start gap-1 rounded-lg border border-slate-200/90 bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-slate-700 backdrop-blur-md transition-all hover:border-amber-500/60 hover:bg-amber-50/90 hover:text-amber-900 sm:rounded-xl sm:px-3.5 sm:py-1.5 sm:text-xs dark:border-white/10 dark:bg-stone-900/90 dark:text-slate-300 dark:hover:border-amber-500/40 dark:hover:bg-stone-800 dark:hover:text-amber-300"
              >
                <span className="text-amber-500 transition-transform group-hover:scale-110">
                  +
                </span>
                <span className="truncate">{preset.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN FORM CARDS STACK */}
      <div className="space-y-5">
        {/* CARD 1: TEMPLATE SELECTION */}
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md sm:p-5 dark:border-white/12 dark:bg-stone-900/90">
          <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-slate-700 uppercase dark:text-slate-300">
            <Sliders className="h-4 w-4 text-amber-500" /> Header Letterhead
            Template
          </label>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {TEMPLATES.map((tmpl) => {
              const isSelected = formData.template === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      template: tmpl.id as any,
                    }))
                  }
                  className={cn(
                    'flex flex-row items-center justify-start gap-2.5 rounded-xl border p-3 text-left text-xs font-bold transition sm:flex-col sm:items-center sm:justify-center sm:text-center',
                    isSelected
                      ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-300'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-stone-800 dark:text-slate-400'
                  )}
                >
                  <FileCheck
                    className={cn(
                      'h-4 w-4 shrink-0',
                      isSelected ? 'text-amber-500' : 'text-slate-400'
                    )}
                  />
                  <span>{tmpl.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARD 2: DOCUMENT REFERENCE & SUBJECT */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md sm:p-5 dark:border-white/12 dark:bg-stone-900/90">
          <h3 className="flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-slate-700 uppercase dark:text-slate-300">
            <FileText className="h-4 w-4 text-amber-500" /> Reference & Subject
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Reference No (Ref No)
              </label>
              <input
                type="text"
                value={formData.refNo}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, refNo: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                placeholder="e.g. MS/COMM/2026/001"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Issue Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, date: e.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              Subject / Title Heading
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subject: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
              placeholder="e.g. LETTER OF AUTHORIZATION"
            />
          </div>
        </div>

        {/* CARD 3: RECIPIENT & SIGNATORY DETAILS */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md sm:p-5 dark:border-white/12 dark:bg-stone-900/90">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* RECIPIENT DETAILS */}
            <div className="space-y-3">
              <h3 className="flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                <User className="h-4 w-4 text-amber-500" /> Recipient / Member
                Details
              </h3>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Recipient / Member Name
                </label>
                <input
                  type="text"
                  value={formData.recipientName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientName: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                  placeholder="e.g. Sri Rahul Banerjee"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={formData.recipientDesignation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientDesignation: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                  placeholder="e.g. Executive Member / Vendor"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Address / Contact (Optional)
                </label>
                <input
                  type="text"
                  value={formData.recipientAddress}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      recipientAddress: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                  placeholder="e.g. Station Road, Chandannagar"
                />
              </div>
            </div>

            {/* SIGNATORY DETAILS */}
            <div className="space-y-3 md:border-l md:border-slate-200/80 md:pl-6 dark:md:border-white/10">
              <h3 className="flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-slate-700 uppercase dark:text-slate-300">
                <Building2 className="h-4 w-4 text-amber-500" /> Signatory
                Details
              </h3>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Issued By (Designation)
                </label>
                <input
                  type="text"
                  value={formData.signatoryName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      signatoryName: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                  placeholder="e.g. General Secretary"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={formData.signatoryOrg}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      signatoryOrg: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
                />
              </div>

              <div className="pt-2 text-[11px] text-slate-500 italic dark:text-slate-400">
                Note: PDF letters feature automatic official signature block
                formatting.
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: LETTER BODY PARAGRAPHS */}
        <div className="space-y-3 rounded-2xl border border-slate-200 bg-white/80 p-4 backdrop-blur-md sm:p-5 dark:border-white/12 dark:bg-stone-900/90">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-slate-700 uppercase dark:text-slate-300">
              <FileText className="h-4 w-4 text-amber-500" /> Letter Body
              Paragraphs
            </label>

            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    body: prev.body
                      ? `${prev.body}\n\n1. NEW SECTION HEADING:`
                      : '1. NEW SECTION HEADING:',
                  }))
                }
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10.5px] font-bold text-amber-800 transition hover:bg-amber-500/20 dark:text-amber-300"
              >
                + Section
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    body: prev.body
                      ? `${prev.body}\n- Item / Specification: Details here`
                      : '- Item / Specification: Details here',
                  }))
                }
                className="rounded-lg border border-slate-300 bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 transition hover:bg-slate-200 dark:border-white/10 dark:bg-stone-800 dark:text-slate-300"
              >
                + Bullet Item
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    body: prev.body
                      ? `${prev.body}\n- Total Contract Amount: Rs. \n- Advance Amount Paid: Rs. \n- Balance Payable: Rs. `
                      : '- Total Contract Amount: Rs. \n- Advance Amount Paid: Rs. \n- Balance Payable: Rs. ',
                  }))
                }
                className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800 transition hover:bg-emerald-500/20 dark:text-emerald-300"
              >
                + Payment Terms
              </button>
            </div>
          </div>

          <textarea
            rows={10}
            value={formData.body}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, body: e.target.value }))
            }
            className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs leading-relaxed font-normal text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white"
            placeholder="Type the main content of the letter here, or use Quick Formatting buttons above..."
          />
        </div>
      </div>
    </div>
  );
}
