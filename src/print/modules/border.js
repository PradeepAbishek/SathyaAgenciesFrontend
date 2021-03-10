export default (doc, startY, lineSpacing) => {
  let startX = 5;
  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  doc.rect(
    startX,
    startY,
    doc.internal.pageSize.width - startX * 2,
    doc.internal.pageSize.height - startY * 2
  );

  startY += lineSpacing * 2;
  return startY;
};
