import toWords from "@/print/modules/toWords";
import commaSeparator from "@/print/modules/commaSeparator";
export default (doc, startX, startY, fontSizes, lineSpacing, printData) => {
  const columns = [
    { header: "Product Count", dataKey: "totalProductCount" },
    { header: "Total Tax'able Amount", dataKey: "totalProductAmount" },
    { header: "GST Amount", dataKey: "totalGSTAmount" },
    { header: "Other Amount", dataKey: "otherAmount" },
    { header: "Total Bill Amount", dataKey: "totalBillAmount" },
  ];

  var body = [];

  body.push({
    totalProductCount: printData.totalProductCount,
    totalProductAmount: commaSeparator(printData.totalProductAmount.toFixed(2)),
    totalGSTAmount: commaSeparator(printData.totalGSTAmount.toFixed(2)),
    otherAmount: (
      printData.totalBillAmount -
      printData.freighCharge -
      (printData.totalProductAmount + printData.totalGSTAmount)
    ).toFixed(2),
    totalBillAmount: commaSeparator(
      (printData.totalBillAmount - printData.freighCharge).toFixed(2)
    ),
  });

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
      totalProductCount: {
        halign: "right",
      },
      totalProductAmount: {
        halign: "right",
      },
      totalGSTAmount: {
        halign: "right",
      },
      otherAmount: {
        halign: "right",
      },
      totalBillAmount: {
        halign: "right",
      },
    },
  });

  startY = doc.lastAutoTable.finalY + lineSpacing;

  var amountInWords = toWords(printData.totalBillAmount);
  doc.text(`Amount in Words : ${amountInWords}`, startX, startY);

  if (printData.freighCharge > 0) {
    startY += lineSpacing;
    doc.text(
      `Freight Charges : ${commaSeparator(
        printData.freighCharge.toFixed(2)
      )}  (` +
        toWords(Math.abs(printData.freighCharge)) +
        ")",
      startX,
      startY
    );
  }

  startY += lineSpacing * 2;

  if (printData.paymentMode === "Cash") {
    doc.text("Payment Details", startX, startY);
    startY += lineSpacing / 2;
    const columns1 = [
      { header: "Bill Amount", dataKey: "totalBillAmount" },
      { header: "Paid Amount", dataKey: "paidBillAmount" },
      { header: "Balance Amount", dataKey: "balanceBillAmount" },
    ];

    var body = [];

    body.push({
      totalBillAmount: commaSeparator(printData.totalBillAmount.toFixed(2)),
      paidBillAmount: commaSeparator(printData.paidBillAmount.toFixed(2)),
      balanceBillAmount: commaSeparator(printData.balanceBillAmount.toFixed(2)),
    });

    doc.autoTable({
      startY: startY,
      columns: columns1,
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
        totalBillAmount: {
          halign: "right",
        },
        paidBillAmount: {
          halign: "right",
        },
        balanceBillAmount: {
          halign: "right",
        },
        currentBalanceAmount: {
          halign: "right",
        },
      },
    });
  }

  return startY;
};
