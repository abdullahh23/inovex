import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Opens a clean, isolated print window containing only the invoice.
 * This approach avoids ALL dark-mode/app-chrome bleed-in issues and
 * captures the exact current DOM state (including pending amount).
 */
export function printInvoice() {
  const el = document.getElementById('invoice-root');
  if (!el) {
    window.print();
    return;
  }

  // Capture the current rendered HTML (including pending amount, template styles)
  const invoiceHtml = el.outerHTML;

  const printWin = window.open('', '_blank', 'width=900,height=1100,scrollbars=no');
  if (!printWin) {
    // Popup blocked — fall back to page print
    window.print();
    return;
  }

  printWin.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Invoice</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html, body {
      background: #ffffff;
      font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }

    /* Centre the invoice on screen */
    body {
      display: flex;
      justify-content: center;
      padding: 24px;
    }

    #invoice-root {
      width: 100%;
      max-width: 820px;
    }

    @media print {
      @page {
        size: A4 portrait;
        margin: 8mm 10mm;
      }

      html, body {
        background: #ffffff !important;
        padding: 0 !important;
        display: block !important;
      }

      #invoice-root {
        max-width: 100% !important;
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  ${invoiceHtml}
</body>
</html>`);

  printWin.document.close();

  // Print after fonts/content load
  printWin.addEventListener('load', () => {
    setTimeout(() => {
      printWin.focus();
      printWin.print();
    }, 350);
  });

  // Safety fallback if load never fires
  setTimeout(() => {
    if (printWin && !printWin.closed) {
      printWin.focus();
      printWin.print();
    }
  }, 1200);
}

export async function downloadInvoicePDF(invoiceNumber: string) {
  const el = document.getElementById('invoice-root');
  if (!el) throw new Error('Invoice element not found');

  // Remove dark mode temporarily for clean PDF capture
  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: 860,
  });

  if (wasDark) document.documentElement.classList.add('dark');

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height * imgW) / canvas.width;

  if (imgH <= pageH - margin * 2) {
    pdf.addImage(imgData, 'PNG', margin, margin, imgW, imgH);
  } else {
    // Multi-page support
    const pageImgH = pageH - margin * 2;
    let srcY = 0;
    const totalH = canvas.height;
    const ratio = imgW / canvas.width;
    while (srcY < totalH) {
      const sliceH = Math.min(pageImgH / ratio, totalH - srcY);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.ceil(sliceH);
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      const sliceData = sliceCanvas.toDataURL('image/png');
      if (srcY > 0) pdf.addPage();
      pdf.addImage(sliceData, 'PNG', margin, margin, imgW, sliceH * ratio);
      srcY += sliceH;
    }
  }

  pdf.save(`Invoice-${invoiceNumber}.pdf`);
}
