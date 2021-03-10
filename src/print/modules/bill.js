import commaSeparator from "@/print/modules/commaSeparator";
export default (doc, startX, startY, fontSizes, lineSpacing, printData) => {
  doc.text("Bill Receipt", startX, startY);
  startY += lineSpacing / 2;

  var isIGSTBill = printData.isIGSTBill;
  let columns = [];
  if (!isIGSTBill) {
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
  } else {
    columns = [
      { header: "S.No", dataKey: "sNo" },
      { header: "Product Name", dataKey: "productName" },
      { header: "HSN", dataKey: "productHSNCode" },
      { header: "Qty", dataKey: "productQuantity" },
      { header: "Unit Price", dataKey: "productUnitPrice" },
      { header: "Product Price", dataKey: "productPrice" },
      { header: "GST %", dataKey: "productGST" },
      { header: "IGST", dataKey: "igstAmount" },
      { header: "Total Price", dataKey: "productTotalPrice" },
    ];
  }

  var body = [];
  var billDetails = printData.billDetails;
  for (var i = 0; i < billDetails.length; i++) {
    if (!isIGSTBill) {
      body.push({
        sNo: i + 1,
        productName: billDetails[i].productName,
        productHSNCode: billDetails[i].productHSNCode,
        productQuantity: billDetails[i].productQuantity,
        productUnitPrice: commaSeparator(
          billDetails[i].productUnitPrice.toFixed(2)
        ),
        productPrice: commaSeparator(billDetails[i].productPrice.toFixed(2)),
        productGST: billDetails[i].productGST + " %",
        cgstAmount: commaSeparator(billDetails[i].cgstAmount.toFixed(2)),
        sgstAmount: commaSeparator(billDetails[i].sgstAmount.toFixed(2)),
        productTotalPrice: commaSeparator(
          billDetails[i].productTotalPrice.toFixed(2)
        ),
      });
    } else {
      body.push({
        sNo: i + 1,
        productName: billDetails[i].productName,
        productHSNCode: billDetails[i].productHSNCode,
        productQuantity: billDetails[i].productQuantity,
        productUnitPrice: commaSeparator(
          billDetails[i].productUnitPrice.toFixed(2)
        ),
        productPrice: commaSeparator(billDetails[i].productPrice.toFixed(2)),
        productGST: billDetails[i].productGST + " %",
        igstAmount: commaSeparator(billDetails[i].igstAmount.toFixed(2)),
        productTotalPrice: commaSeparator(
          billDetails[i].productTotalPrice.toFixed(2)
        ),
      });
    }
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
      igstAmount: {
        halign: "right",
      },
    },
  });
  startY = doc.lastAutoTable.finalY + lineSpacing;
  return startY;
};
