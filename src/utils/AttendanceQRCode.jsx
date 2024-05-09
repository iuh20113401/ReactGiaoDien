import QRCode from "qrcode.react";

export const AttendanceQRCode = ({ data }) => {
  const generateQRData = () => {
    const baseUrl = data.url;
    const queryParams = new URLSearchParams({
      data: JSON.stringify(data.content),
      radius: 100,
    }).toString();

    return `${baseUrl}?${queryParams}`;
  };

  return (
    <div>
      <QRCode value={generateQRData()} size={256} />
    </div>
  );
};
