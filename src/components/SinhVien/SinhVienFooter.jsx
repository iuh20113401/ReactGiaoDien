import React from "react";
import styled from "styled-components";
import { P2 } from "../../ui/Typography";
import LogoImage from "../../../public/hinhanh/Logo_IUH.png";
const Footer = styled.div`
  padding: 2.4rem;
  display: flex;
  gap: 4.8rem;
  width: 98%;
  margin: 0.4rem auto;
  background-color: var(--color--main_7);
`;
const FooterLogoBox = styled.div`
  width: 20%;
`;
const Logo = styled.img`
  width: 100%;
`;
const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 30%;
  & > p {
    color: var(--color--secondary_1);
  }
`;
function SinhVienFooter() {
  return (
    <Footer>
      <FooterLogoBox>
        <Logo src={LogoImage} alt="logo of iuh" />
      </FooterLogoBox>
      <FooterContent>
        {" "}
        <P2>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HCM</P2>
        <P2>
          Địa chỉ : Số 12 Nguyễn Văn Bảo, Phường 4,Quận Gò Vấp, Thành phố Hồ Chí
          Minh
        </P2>
        <P2>Fax: 0283.9940 954</P2>
        <P2>Email: dhcn@iuh.edu.vn</P2>
        <P2>Điện thoại: 0283.8940 390</P2>
      </FooterContent>
    </Footer>
  );
}

export default SinhVienFooter;
