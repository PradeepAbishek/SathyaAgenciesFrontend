export default (doc, startX, startY, fontSizes, lineSpacing, printData) => {
  const pageWidth = doc.internal.pageSize.width;
  let endX = pageWidth - startX;
  let end2X = pageWidth - startX;

  doc.setFontSize(fontSizes.NormalFontSize);

  if (printData.type === "Payment") {
    doc.text(`Payment Number : ${printData.paymentNumber}`, startX, startY);
    doc.text("GSTIN : 33BZRPS2249L1ZP      ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Payment Date : ${printData.paymentDate.split("-").reverse().join("-")}`, startX, startY);
    doc.text("P.L.NO : TNI/PL/04/08             ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Payment Mode : ${printData.paymentMode}`, startX, startY);
    doc.text("F.L.NO : 59/WS/TNI/2008-2011 ", endX, startY, "right");
    startY += lineSpacing;
    doc.text("S.L.NO : MDU 1958/2008          ", endX, startY, "right");
  } else if (printData.type === "Return") {
    doc.text(`Return Number : ${printData.returnNumber}`, startX, startY);
    doc.text("GSTIN : 33BZRPS2249L1ZP      ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Return Date : ${printData.returnDate.split("-").reverse().join("-")}`, startX, startY);
    doc.text("P.L.NO : TNI/PL/04/08             ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Payment Mode : Return`, startX, startY);
    doc.text("F.L.NO : 59/WS/TNI/2008-2011 ", endX, startY, "right");
    startY += lineSpacing;
    doc.text("S.L.NO : MDU 1958/2008          ", endX, startY, "right");
  } else {
    doc.text(`Bill Number : ${printData.billNumber}`, startX, startY);
    doc.text("GSTIN : 33BZRPS2249L1ZP      ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Bill Date : ${printData.billDate.split("-").reverse().join("-")}`, startX, startY);
    doc.text("P.L.NO : TNI/PL/04/08             ", endX, startY, "right");
    startY += lineSpacing;
    doc.text(`Payment Mode : ${printData.paymentMode}`, startX, startY);
    doc.text("F.L.NO : 59/WS/TNI/2008-2011 ", endX, startY, "right");
    startY += lineSpacing;
    doc.text("S.L.NO : MDU 1958/2008          ", endX, startY, "right");
  }

  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  startY += lineSpacing;
  doc.line(20, startY, end2X, startY);
  startY += lineSpacing;

  return startY;
};
