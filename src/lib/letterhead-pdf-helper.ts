export interface PrintLetterheadOptions {
  documentTitle: string;
  template?: string;
  refNo?: string;
  date?: string;
  recipientName?: string;
  recipientDesignation?: string;
  recipientAddress?: string;
  subject?: string;
  body?: string;
  eventMetaHtml?: string;
  signatoryName?: string;
  signatoryOrg?: string;
}

export const getLetterheadUrl = (template?: string): string => {
  const tmpl = (template || '').toLowerCase().trim();
  if (tmpl === 'durga') {
    return process.env.NEXT_PUBLIC_LETTERHEAD_MSDPS_URL || '';
  }
  if (tmpl === 'jagadhatri') {
    return process.env.NEXT_PUBLIC_LETTERHEAD_MSJPS_URL || '';
  }
  return '';
};

export const formatPrintBodyHtml = (text?: string): string => {
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

export const openLetterheadPrintWindow = (options: PrintLetterheadOptions) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to open the PDF print preview window.');
    return;
  }

  const bgImage = getLetterheadUrl(options.template);
  const hasLetterhead = Boolean(bgImage);
  const letterheadUrl =
    hasLetterhead && bgImage.startsWith('/') && typeof window !== 'undefined'
      ? `${window.location.origin}${bgImage}`
      : bgImage;

  const bodyContentHtml = options.body
    ? options.body.includes('<') && options.body.includes('>')
      ? options.body
      : formatPrintBodyHtml(options.body)
    : '';

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${options.documentTitle}</title>
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
            background-color: #f8fafc;
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
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
          }
          .no-print-bar h3 {
            margin: 0;
            font-size: 14px;
            font-weight: 600;
          }
          .btn-group {
            display: flex;
            gap: 10px;
          }
          .btn {
            padding: 7px 16px;
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
            position: relative;
            box-sizing: border-box;
            ${
              hasLetterhead
                ? `background-image: url('${letterheadUrl}'); background-size: 210mm 297mm; background-repeat: repeat-y; background-position: top left; padding-top: 210px; padding-left: 42px; padding-right: 42px; padding-bottom: 110px;`
                : `padding: 50px 60px;`
            }
            background-color: #ffffff;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
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
            font-size: 10.5px;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 16px;
            font-family: monospace;
            ${!hasLetterhead ? 'border-bottom: 1px dashed #cbd5e1; padding-bottom: 8px;' : ''}
          }
          .recipient-block {
            margin-bottom: 16px;
            font-size: 11px;
            line-height: 1.45;
          }
          .recipient-to {
            color: #64748b;
            font-size: 10.5px;
          }
          .recipient-name {
            font-weight: 800;
            color: #0f172a;
            font-size: 12px;
          }
          .recipient-designation {
            font-weight: 600;
            color: #334155;
          }
          .recipient-address {
            color: #64748b;
            font-size: 10.5px;
          }
          .subject-title {
            font-size: 13.5px;
            font-weight: 800;
            text-align: center;
            text-transform: uppercase;
            color: #991b1b;
            margin-bottom: 16px;
            line-height: 1.4;
            letter-spacing: 0.3px;
            border-bottom: 2px dashed #f59e0b;
            padding-bottom: 8px;
          }
          .letter-body {
            font-size: 11px;
            line-height: 1.6;
            color: #0f172a;
            margin-bottom: 25px;
            text-align: justify;
            word-wrap: break-word;
          }
          .letter-body p {
            margin-bottom: 10px;
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
            bottom: 156px;
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
          <h3>${options.documentTitle}</h3>
          <div class="btn-group">
            <button class="btn btn-primary" onclick="window.print()">Print / Save as PDF</button>
            <button class="btn btn-secondary" onclick="window.close()">Close Preview</button>
          </div>
        </div>
        <div class="page-container">
          <div class="letterhead-sheet">
            ${
              !hasLetterhead
                ? `<div class="plain-header">
                    <h1>Madhyanchal Sarbajanin</h1>
                    <p>Chandannagar, Hooghly, West Bengal - 712136</p>
                  </div>`
                : ''
            }
            <div class="ref-date-row">
              <div>Ref No: ${options.refNo || 'MS/COMM/2026'}</div>
              <div>Date: ${options.date || ''}</div>
            </div>

            ${
              options.recipientName || options.recipientDesignation
                ? `<div class="recipient-block">
                    <div class="recipient-to">To,</div>
                    <div class="recipient-name">${options.recipientName || ''}</div>
                    ${options.recipientDesignation ? `<div class="recipient-designation">${options.recipientDesignation}</div>` : ''}
                    ${options.recipientAddress ? `<div class="recipient-address">${options.recipientAddress}</div>` : ''}
                  </div>`
                : ''
            }

            ${options.subject ? `<div class="subject-title">${options.subject}</div>` : ''}

            ${options.eventMetaHtml ? options.eventMetaHtml : ''}

            <div class="letter-body">
              ${bodyContentHtml}
            </div>

            <div class="signature-block">
              <div class="sig-title">By Order of Executive Committee</div>
              <div class="sig-issuer">${options.signatoryName || 'General Secretary'}</div>
              <div class="sig-org">${options.signatoryOrg || 'Madhyanchal Sarbajanin'}</div>
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
