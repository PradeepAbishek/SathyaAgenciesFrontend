import commaSeparator from "@/print/modules/commaSeparator";
export default (doc, startX, startY, fontSizes, lineSpacing, printData) => {
  doc.text("Return cum Payment Receipt", startX, startY);
  startY += lineSpacing / 2;

  let columns = [];
  columns = [
    { header: "S.No", dataKey: "sNo" },
    { header: "Product Name", dataKey: "productName" },
    { header: "HSN", dataKey: "productHSNCode" },
    { header: "Qty", dataKey: "productQuantity" },
    { header: "Unit Price", dataKey: "productUnitPrice" },
    { header: "Product Price", dataKey: "productPrice" },
    { header: "GST %", dataKey: "productGST" },
    { header: "CGST", dataKey: "cgstAmount" },
    { header: "SGST", dataKey: "sgstAmount" },
    { header: "Total Price", dataKey: "productTotalPrice" },
  ];

  var body = [];
  var returnDetails = printData.returnDetails;
  for (var i = 0; i < returnDetails.length; i++) {
    body.push({
      sNo: i + 1,
      productName: returnDetails[i].productName,
      productHSNCode: returnDetails[i].productHSNCode,
      productQuantity: returnDetails[i].productQuantity,
      productUnitPrice: commaSeparator(
        returnDetails[i].productUnitPrice.toFixed(2)
      ),
      productPrice: commaSeparator(returnDetails[i].productPrice.toFixed(2)),
      productGST: returnDetails[i].productGST + " %",
      cgstAmount: commaSeparator(returnDetails[i].cgstAmount.toFixed(2)),
      sgstAmount: commaSeparator(returnDetails[i].sgstAmount.toFixed(2)),
      productTotalPrice: commaSeparator(
        returnDetails[i].productTotalPrice.toFixed(2)
      ),
    });
  }
  doc.setFontSize(fontSizes.NormalFontSize);
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
      sNo: {
        halign: "right",
      },
      productQuantity: {
        halign: "right",
      },
      productUnitPrice: {
        halign: "right",
      },
      productPrice: {
        halign: "right",
      },
      productGST: {
        halign: "right",
      },
      cgstAmount: {
        halign: "right",
      },
      sgstAmount: {
        halign: "right",
      },
      productTotalPrice: {
        halign: "right",
      },
    },
  });
  startY = doc.lastAutoTable.finalY + lineSpacing;

  let columns1 = [
    { header: "Product Count", dataKey: "totalProductCount" },
    { header: "Total Tax'able Amount", dataKey: "totalProductAmount" },
    { header: "GST Amount", dataKey: "totalGSTAmount" },
    { header: "Other Amount", dataKey: "otherAmount" },
    { header: "Total Return Amount", dataKey: "totalReturnAmount" },
  ];

  var body1 = [];

  body1.push({
    totalProductCount: printData.totalProductCount,
    totalProductAmount: commaSeparator(printData.totalProductAmount.toFixed(2)),
    totalGSTAmount: commaSeparator(printData.totalGSTAmount.toFixed(2)),
    otherAmount: (
      printData.totalReturnAmount -
      (printData.totalProductAmount + printData.totalGSTAmount)
    ).toFixed(2),
    totalReturnAmount: commaSeparator(printData.totalReturnAmount.toFixed(2)),
  });

  doc.autoTable({
    startY: startY,
    columns: columns1,
    body: body1,
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

  return startY;
};
