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
  Sliders,
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
    image: '/letter-head-msjps.jpg',
    color: 'amber',
  },
  {
    id: 'durga',
    name: 'Durga Puja Samity',
    image: '/letter-head-msdps.jpg',
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

  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');

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
      hasLetterhead && typeof window !== 'undefined'
        ? `${window.location.origin}${bgImage}`
        : bgImage;

    const formattedDate = new Date(formData.date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const bodyParagraphs = formData.body
      .split('\n')
      .filter((p) => p.trim().length > 0)
      .map((p) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
      .join('');

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
              padding: 12px 24px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              z-index: 9999;
            }
            .no-print-bar h3 {
              margin: 0;
              font-size: 14px;
              font-weight: 600;
              color: #f59e0b;
            }
            .btn-group {
              display: flex;
              gap: 10px;
            }
            .btn {
              padding: 8px 18px;
              border-radius: 6px;
              font-size: 13px;
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
              padding: 20px 0 40px 0;
              display: flex;
              justify-content: center;
            }
            .letterhead-sheet {
              width: 210mm;
              min-height: 297mm;
              ${
                hasLetterhead
                  ? `background-image: url('${letterheadUrl}'); background-size: 100% 100%; background-repeat: no-repeat; background-position: top center; padding-top: 215px; padding-left: 65px; padding-right: 65px; padding-bottom: 130px;`
                  : `padding: 50px 60px;`
              }
              background-color: #ffffff;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
              position: relative;
            }
            .plain-header {
              text-align: center;
              border-bottom: 2px solid #ea580c;
              padding-bottom: 15px;
              margin-bottom: 25px;
            }
            .plain-header h1 {
              font-size: 22px;
              font-weight: 800;
              color: #991b1b;
              text-transform: uppercase;
              margin: 0 0 4px 0;
            }
            .plain-header p {
              margin: 2px 0;
              font-size: 12px;
              color: #475569;
            }
            .ref-date-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              font-size: 11px;
              font-weight: 700;
              color: #1e3a8a;
              margin-bottom: 20px;
              font-family: monospace;
              ${!hasLetterhead ? 'border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;' : ''}
            }
            .recipient-block {
              margin-bottom: 18px;
              font-size: 11.5px;
              line-height: 1.5;
              color: #334155;
            }
            .recipient-name {
              font-weight: 800;
              color: #0f172a;
              font-size: 12px;
            }
            .subject-title {
              font-size: 14.5px;
              font-weight: 800;
              text-align: center;
              text-transform: uppercase;
              color: #991b1b;
              margin-bottom: 20px;
              line-height: 1.4;
              letter-spacing: 0.3px;
              border-bottom: 2px dashed #f59e0b;
              padding-bottom: 10px;
            }
            .letter-body {
              font-size: 11.5px;
              line-height: 1.7;
              color: #0f172a;
              margin-bottom: 35px;
              text-align: justify;
            }
            .letter-body p {
              margin-bottom: 14px;
            }
            .signature-block {
              margin-top: 40px;
              float: right;
              text-align: center;
              min-width: 220px;
            }
            .sig-title {
              font-size: 12px;
              font-weight: 700;
              color: #475569;
              margin-bottom: 35px;
            }
            .sig-issuer {
              font-size: 12px;
              font-weight: 800;
              color: #1e3a8a;
              border-top: 1px solid #cbd5e1;
              padding-top: 6px;
            }
            .sig-org {
              font-size: 10.5px;
              color: #64748b;
              font-weight: 600;
            }
            @media print {
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
                page-break-after: always;
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
    <div className="space-y-6 sm:space-y-8">
      {/* HEADER BAR & PRESETS */}
      <div className="flex flex-col gap-4 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 p-4 sm:p-6 backdrop-blur-2xl dark:border-white/15 dark:from-stone-900 dark:to-stone-950">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="font-paytone text-lg text-slate-900 sm:text-2xl dark:text-white">
                Official Letterhead & Certificate Generator
              </h2>
            </div>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
              Create and download high-resolution PDF notices, member authorization certificates, and letters on official Madhyanchal Sarbajanin letterhead.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handlePrintPdf}
              className="h-10 rounded-full bg-amber-500 font-bold text-slate-950 hover:bg-amber-400 shadow-md gap-2 px-5 text-xs sm:text-sm"
            >
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* QUICK PRESETS SELECTION */}
        <div className="border-t border-amber-500/20 pt-3 dark:border-white/10">
          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider dark:text-amber-300">
            Quick Template Presets:
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset.id)}
                className="rounded-lg border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-amber-500 hover:bg-amber-50 dark:border-white/10 dark:bg-stone-900 dark:text-slate-300 dark:hover:bg-stone-800"
              >
                + {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE TABS SWITCHER */}
      <div className="flex lg:hidden rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-white/10 dark:bg-stone-900">
        <button
          type="button"
          onClick={() => setActiveTab('form')}
          className={cn(
            'flex-1 rounded-lg py-2 text-xs font-bold transition',
            activeTab === 'form'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          )}
        >
          1. Fill Details
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={cn(
            'flex-1 rounded-lg py-2 text-xs font-bold transition',
            activeTab === 'preview'
              ? 'bg-amber-500 text-slate-950 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          )}
        >
          2. Live Preview
        </button>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: FORM CONTROLS */}
        <div
          className={cn(
            'lg:col-span-6 space-y-5',
            activeTab === 'preview' ? 'hidden lg:block' : 'block'
          )}
        >
          {/* TEMPLATE SELECTION CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-xs backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90 space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Sliders className="h-4 w-4 text-amber-500" /> Header Letterhead Template
            </label>
            <div className="grid grid-cols-3 gap-2">
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
                      'rounded-xl border p-2.5 text-center text-xs font-bold transition flex flex-col items-center justify-center gap-1.5',
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-amber-900 dark:text-amber-300'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-stone-800 dark:text-slate-400'
                    )}
                  >
                    <FileCheck className={cn('h-4 w-4', isSelected ? 'text-amber-500' : 'text-slate-400')} />
                    <span>{tmpl.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DOCUMENT REFERENCE DETAILS CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-xs backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-amber-500" /> Reference & Subject
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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

          {/* RECIPIENT DETAILS CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-xs backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <User className="h-4 w-4 text-amber-500" /> Recipient / Member Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Member / Recipient Name
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
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
                  placeholder="e.g. Executive Member / Life Member"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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

          {/* LETTER BODY CONTENT CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-xs backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90 space-y-3">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-amber-500" /> Letter Body Paragraphs
            </label>
            <textarea
              rows={6}
              value={formData.body}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, body: e.target.value }))
              }
              className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs font-normal text-slate-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-stone-800 dark:text-white leading-relaxed"
              placeholder="Type the main content of the letter here..."
            />
          </div>

          {/* SIGNATORY CARD */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 sm:p-5 shadow-xs backdrop-blur-md dark:border-white/12 dark:bg-stone-900/90 space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Building2 className="h-4 w-4 text-amber-500" /> Signatory Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
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
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: LIVE INTERACTIVE A4 PREVIEW */}
        <div
          className={cn(
            'lg:col-span-6 space-y-4 sticky top-24',
            activeTab === 'form' ? 'hidden lg:block' : 'block'
          )}
        >
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider dark:text-slate-300 flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-amber-500" /> Live Interactive Preview
            </span>
          </div>

          {/* SIMULATED A4 PAPER SHEET */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-300 bg-slate-200/60 p-2 sm:p-4 shadow-inner dark:border-white/15 dark:bg-stone-900/60">
            <div
              className={cn(
                'mx-auto w-full max-w-[550px] aspect-[1/1.414] bg-white rounded-lg shadow-2xl relative overflow-hidden transition-all duration-300 text-[10px] sm:text-[11.5px] leading-relaxed text-slate-900',
                hasLetterhead ? 'p-6 sm:p-10 pt-[24%] sm:pt-[26%] pb-[14%]' : 'p-6 sm:p-8'
              )}
              style={
                hasLetterhead
                  ? {
                      backgroundImage: `url(${bgImage})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }
                  : undefined
              }
            >
              {!hasLetterhead && (
                <div className="text-center border-b-2 border-amber-600 pb-3 mb-4">
                  <h1 className="text-base sm:text-lg font-black uppercase text-amber-800">
                    Madhyanchal Sarbajanin
                  </h1>
                  <p className="text-[9px] text-slate-500">
                    Chandannagar, Hooghly, West Bengal - 712136
                  </p>
                </div>
              )}

              {/* REF & DATE ROW */}
              <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-bold text-blue-900 mb-3 font-mono border-b border-slate-200/60 pb-1">
                <span>Ref No: {formData.refNo || '____________'}</span>
                <span suppressHydrationWarning>
                  Date:{' '}
                  {formData.date}
                </span>
              </div>

              {/* RECIPIENT */}
              {(formData.recipientName || formData.recipientDesignation) && (
                <div className="mb-3 text-[9.5px] sm:text-[10.5px]">
                  <div className="text-slate-500">To,</div>
                  <div className="font-extrabold text-slate-900">
                    {formData.recipientName}
                  </div>
                  {formData.recipientDesignation && (
                    <div className="font-semibold text-slate-700">
                      {formData.recipientDesignation}
                    </div>
                  )}
                  {formData.recipientAddress && (
                    <div className="text-slate-500 text-[9px]">
                      {formData.recipientAddress}
                    </div>
                  )}
                </div>
              )}

              {/* SUBJECT */}
              {formData.subject ? (
                <div className="text-[10.5px] sm:text-[12px] font-black text-center text-amber-900 uppercase tracking-wide border-b border-dashed border-amber-500 pb-1 mb-3">
                  {formData.subject}
                </div>
              ) : (
                <div className="text-[10.5px] sm:text-[12px] font-bold text-center text-slate-300 uppercase tracking-wide border-b border-dashed border-slate-200 pb-1 mb-3 italic">
                  [SUBJECT / HEADING HERE]
                </div>
              )}

              {/* BODY */}
              <div className="text-slate-800 space-y-2 mb-6 text-justify text-[9.5px] sm:text-[11px] leading-relaxed">
                {formData.body ? (
                  formData.body
                    .split('\n')
                    .map((para, idx) => (para.trim() ? <p key={idx}>{para}</p> : null))
                ) : (
                  <p className="text-slate-400 italic text-center py-6">
                    (Type your letter content in the form or click a Quick Template Preset above...)
                  </p>
                )}
              </div>

              {/* SIGNATURE */}
              <div className="absolute right-6 sm:right-10 bottom-6 sm:bottom-10 text-center min-w-[140px]">
                <div className="text-[8.5px] sm:text-[9.5px] font-bold text-slate-500 mb-6">
                  By Order of Executive Committee
                </div>
                <div className="border-t border-slate-300 pt-1 font-black text-blue-950 text-[9.5px] sm:text-[11px]">
                  {formData.signatoryName || 'General Secretary'}
                </div>
                <div className="text-[8.5px] font-semibold text-slate-500">
                  {formData.signatoryOrg || 'Madhyanchal Sarbajanin'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
