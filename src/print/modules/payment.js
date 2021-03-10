import toWords from "@/print/modules/toWords";
import commaSeparator from "@/print/modules/commaSeparator";
export default (doc, startX, startY, fontSizes, lineSpacing, printData) => {
  const pageWidth = doc.internal.pageSize.width;
  let endX = pageWidth - startX;
  const columns = [
    { header: "Balance Amount", dataKey: "balanceAmount" },
    { header: "Paid Amount", dataKey: "paidAmount" },
    { header: "Current Balance Amount", dataKey: "currentBalanceAmount" },
  ];

  var body = [];

  body.push({
    balanceAmount: commaSeparator(
      printData.balanceAmountBeforePayment.toFixed(2)
    ),
    paidAmount: commaSeparator(printData.paidAmount.toFixed(2)),
    currentBalanceAmount: commaSeparator(
      printData.balanceAmountAfterPayment.toFixed(2)
    ),
  });

  doc.text("Payment Receipt", startX, startY);
  startY += lineSpacing / 2;
  doc.autoTable({
    startY: startY,
    columns: columns,
    body: body,
    margin: { left: 20, right: 20 },
    styles: {
      font: "WorkSans",
      fontSize: fontSizes.NormalFontSize,
      lineColor: [44, 62, 80],
      lineWidth: 1,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [255, 255, 255],
    },
    headStyles: { fillColor: [157, 183, 128] },
    columnStyles: {
      balanceAmount: {
        halign: "right",
      },
      paidAmount: {
        halign: "right",
      },
      currentBalanceAmount: {
        halign: "right",
      },
    },
  });
  startY += lineSpacing;
  startY = doc.lastAutoTable.finalY + lineSpacing;
  doc.text(
    `Amount in Words : ${toWords(printData.paidAmount)}`,
    startX,
    startY
  );
  startY = doc.lastAutoTable.finalY + lineSpacing * 2;
  doc.text("Customer Signature", endX, startY, "right");
  startY += lineSpacing * 2;
  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(0.5);
  doc.line(endX, startY, endX - 100, startY);
  return startY;
};
