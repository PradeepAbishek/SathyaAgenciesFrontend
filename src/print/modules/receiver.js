export default (doc, startX, startY, fontSizes, lineSpacing, data) => {
  const pageWidth = doc.internal.pageSize.width;
  let endX = pageWidth - startX;

  doc.setFontSize(fontSizes.NormalFontSize);
  doc.text("To : ", startX, startY);

  if (data.type === "Payment") {
    doc.text(`${data.reference}`, endX, startY, "right");
    var tempendX =
      endX -
      doc.getStringUnitWidth(`${data.reference}`) * fontSizes.NormalFontSize;
    tempendX -=
      doc.getStringUnitWidth("Reference : ") * fontSizes.NormalFontSize;
    doc.text("Reference : ", tempendX, startY);
  } else if (data.type === "Return") {
    doc.text(`${data.paymentDetails.reference}`, endX, startY, "right");
    var tempendX =
      endX -
      doc.getStringUnitWidth(`${data.paymentDetails.reference}`) *
        fontSizes.NormalFontSize;
    tempendX -=
      doc.getStringUnitWidth("Reference : ") * fontSizes.NormalFontSize;
    doc.text("Reference : ", tempendX, startY);
  }

  startY += lineSpacing;

  if (data.paymentFor === "Customer" || data.type === "Bill") {
    startX += doc.getStringUnitWidth("To : ") * fontSizes.NormalFontSize;
    doc.text(`M/s. ${data.customerDetails.customerName},`, startX, startY);
    startY += lineSpacing;

    doc.text(`${data.customerDetails.address}.`, startX, startY);
    startY += lineSpacing;

    doc.text(`Cell : ${data.customerDetails.phoneNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(`GSTIN : ${data.customerDetails.gstNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(
      `Aadhar Number : ${data.customerDetails.aadharNumber}`,
      startX,
      startY
    );
    startY += lineSpacing;
  } else if (data.type === "Return") {
    startX += doc.getStringUnitWidth("To : ") * fontSizes.NormalFontSize;
    doc.text(`M/s. ${data.customerDetails.customerName},`, startX, startY);
    startY += lineSpacing;

    doc.text(`${data.customerDetails.address}.`, startX, startY);
    startY += lineSpacing;

    doc.text(`Cell : ${data.customerDetails.phoneNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(`GSTIN : ${data.customerDetails.gstNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(
      `Aadhar Number : ${data.customerDetails.aadharNumber}`,
      startX,
      startY
    );
    startY += lineSpacing;
  } else {
    startX += doc.getStringUnitWidth("To : ") * fontSizes.NormalFontSize;
    doc.text(`M/s. ${data.companyDetails.companyName},`, startX, startY);
    startY += lineSpacing;

    doc.text(`${data.companyDetails.address}.`, startX, startY);
    startY += lineSpacing;

    doc.text(`Cell : ${data.companyDetails.phoneNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(`GSTIN : ${data.companyDetails.gstNumber}`, startX, startY);
    startY += lineSpacing;

    doc.text(
      `Mail Address : ${data.companyDetails.mailAddress}`,
      startX,
      startY
    );
    startY += lineSpacing;
  }

  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  doc.line(20, startY, endX, startY);
  startY += lineSpacing;

  return startY;
};
