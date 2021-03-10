export default (doc, startX, fontSizes, lineSpacing, printData) => {
  const pageHeight = doc.internal.pageSize.height;
  let startY = pageHeight - 90;

  const pageWidth = doc.internal.pageSize.width;
  const endX = pageWidth - startX;
  const thirdX = (pageWidth - startX * 2) / 3;

  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  doc.line(startX, startY, endX, startY);
  startY += lineSpacing / 3;

  const padding = lineSpacing / 2;
  let tempY = startY;

  startX += 15;
  doc.setFontSize(fontSizes.SmallFontSize);
  doc.text("Terms & Conditions:", startX, (tempY += lineSpacing));
  doc.text(
    "1. Goods once sold cannot be taken back.",
    startX,
    (tempY += lineSpacing)
  );
  doc.text(
    "2. Subject to Theni Jurisdictions E. & O.E.",
    startX,
    (tempY += lineSpacing)
  );
  tempY += lineSpacing;
  tempY += lineSpacing;
  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  doc.line(thirdX + 25, startY + padding, thirdX + 25, tempY + padding / 3);

  startX += thirdX + 10;
  tempY = startY;
  doc.setFontSize(fontSizes.SmallFontSize);
  doc.text("BANK        : UNION BANK", startX, (tempY += lineSpacing));
  doc.text("BRANCH    : VEERAPANDI", startX, (tempY += lineSpacing));
  doc.text("IFSC NO    : UBIN 0540421", startX, (tempY += lineSpacing));
  doc.text("A/C NO      : 40420 10100 33115", startX, (tempY += lineSpacing));
  doc.text("A/C NAME : SATHYA AGENCIES", startX, (tempY += lineSpacing));
  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  startX += thirdX - 40;
  doc.line(startX, startY + padding, startX, tempY + padding / 3);
  doc.setFontSize(fontSizes.SubTitleFontSize);
  tempY = startY;
  doc.text("For Sathya Agencies,", startX + 25, (tempY += lineSpacing));
  doc.setLineWidth(0.5);
  doc.line(startX + 15, (tempY += lineSpacing * 3), endX, tempY);
  doc.setFontSize(fontSizes.SmallFontSize);
  doc.text(
    `Prepared By - ${printData.createdBy.toUpperCase()}`,
    endX,
    (tempY += lineSpacing),
    "right"
  );
};
