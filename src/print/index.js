import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import addFontNormal from "./fonts/WorkSans-normal";
import addFontBold from "./fonts/WorkSans-bold";

import border from "@/print/modules/border";
import header from "@/print/modules/header";
import receiptMetaData from "@/print/modules/receiptMetaData";
import receiver from "@/print/modules/receiver";
import bill from "@/print/modules/bill";
import payment from "@/print/modules/payment";
import summary from "@/print/modules/summary";
import footer from "@/print/modules/footer";
import returns from "@/print/modules/returns";

export default (printData) => {
  addFontNormal();
  addFontBold();
  console.log(printData);
  const doc = new jsPDF("p", "pt", "a4");

  doc.setFont("WorkSans");

  const fontSizes = {
    TitleFontSize: 14,
    SubTitleFontSize: 12,
    NormalFontSize: 10,
    SmallFontSize: 8,
  };

  let startX = 20;
  let startY = 5;
  const lineSpacing = 14;

  startY = border(doc, startY, lineSpacing);
  startY = header(doc, startX, startY, fontSizes, lineSpacing);
  startY = receiptMetaData(
    doc,
    startX,
    startY,
    fontSizes,
    lineSpacing,
    printData
  );

  startY = receiver(doc, startX, startY, fontSizes, lineSpacing, printData);

  if (printData.type === "Payment") {
    startY = payment(doc, startX, startY, fontSizes, lineSpacing, printData);
  } else if (printData.type === "Return") {
    startY = returns(doc, startX, startY, fontSizes, lineSpacing, printData);
    startY = payment(
      doc,
      startX,
      startY,
      fontSizes,
      lineSpacing,
      printData.paymentDetails
    );
  } else {
    startY = bill(doc, startX, startY, fontSizes, lineSpacing, printData);
    startY = summary(doc, startX, startY, fontSizes, lineSpacing, printData);
  }
  footer(doc, startX, fontSizes, lineSpacing, printData);

  if (printData.type === "Payment") {
    if (printData.paymentFor === "Customer") {
      doc.save(
        `${printData.customerDetails.customerName} - ${printData.type} - ${printData.paymentNumber}.pdf`
      );
    } else {
      doc.save(
        `${printData.companyDetails.companyName} - ${printData.type} - ${printData.paymentNumber}.pdf`
      );
    }
  } else if (printData.type === "Return") {
    doc.save(
      `${printData.customerDetails.customerName} - Return - ${printData.returnNumber}.pdf`
    );
  } else {
    doc.save(
      `${printData.customerDetails.customerName} - Bill - ${printData.billNumber}.pdf`
    );
  }
};
