import image from "../../assets/img/logo.jpeg";
export default (doc, startX, startY, fontSizes, lineSpacing) => {
  var img = new Image();
  img.src = image;
  const companyName = "Sathya Agencies,";
  const address = "265 - B, Ramesh Murugan Complex,";
  const street = "Subban Street,"
  const city = "Theni - 625 531.";
  const phoneNumber = [
    "Phone : +91 95972 07026.",
    "+91 94436  59911.",
    "+91 98650 99535.",
  ];
  const email = ["Mail : sathyaagencies4@gmail.com."];

  const pageWidth = doc.internal.pageSize.width;
  let endX = pageWidth - startX;

  doc.addImage(img, "jpeg", startX, 20, 40, 60);
  doc.setFontSize(fontSizes.TitleFontSize);
  let afterImage = startX + 50;
  doc.text(companyName, afterImage, startY);
  doc.setFontSize(fontSizes.NormalFontSize);
  doc.text(phoneNumber[0], endX, startY, "right");

  startY += lineSpacing;
  doc.text(address, afterImage, startY);
  doc.text(phoneNumber[1], endX, startY, "right");
  startY += lineSpacing;
  doc.text(street, afterImage, startY);
  doc.text(phoneNumber[2], endX, startY, "right");
  startY += lineSpacing;
  doc.text(city, afterImage, startY);
  doc.text(email, endX, startY, "right");
  doc.setDrawColor(157, 183, 128);
  doc.setLineWidth(3);
  startY += lineSpacing;
  doc.line(startX, startY, endX, startY);
  startY += lineSpacing;
  return startY;
};
