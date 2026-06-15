import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export function printInvoice() {
  window.print();
}

export async function downloadInvoicePDF(invoiceNumber: string) {
  const el = document.getElementById('invoice-root');
  if (!el) throw new Error('Invoice element not found');

  // Temporarily remove dark mode for PDF capture
  const wasDark = document.documentElement.classList.contains('dark');
  if (wasDark) document.documentElement.classList.remove('dark');

  const canvas = await html2canvas(el, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  if (wasDark) document.documentElement.classList.add('dark');

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgW = pageW - 20; // 10mm margins
  const imgH = (canvas.height * imgW) / canvas.width;

  let y = 10;
  if (imgH <= pageH - 20) {
    pdf.addImage(imgData, 'PNG', 10, y, imgW, imgH);
  } else {
    // Multi-page support
    const pageImgH = pageH - 20;
    let srcY = 0;
    const totalH = canvas.height;
    const ratio = imgW / canvas.width;
    while (srcY < totalH) {
      const sliceH = Math.min(pageImgH / ratio, totalH - srcY);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = sliceH;
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      const sliceData = sliceCanvas.toDataURL('image/png');
      if (srcY > 0) pdf.addPage();
      pdf.addImage(sliceData, 'PNG', 10, 10, imgW, sliceH * ratio);
      srcY += sliceH;
    }
  }

  pdf.save(`Invoice-${invoiceNumber}.pdf`);
}
