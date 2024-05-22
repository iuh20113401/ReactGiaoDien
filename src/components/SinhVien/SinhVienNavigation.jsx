import React from "react";
import styled from "styled-components";
import AccountAvatar, { Avatar } from "../../ui/AccountAvatar";
import MenuItems from "../../ui/MenuItem";
import NavContent from "../../ui/NavContent";
import NavFooter, { FooterMenu } from "../../ui/NavFooter";
import MenuItem from "../../ui/NavItem";
import NavLogo from "../../ui/NavLogo";
import Navigation from "../../ui/Navigation";
import {
  HiHome,
  HiOutlineChatBubbleLeft,
  HiOutlineClipboard,
  HiOutlineClock,
} from "react-icons/hi2";
import { NavLink } from "react-router-dom";

import Logo from "../../../public/hinhanh/iuh_logo_2.png";
import { H6 } from "../../ui/Typography";
import { Button } from "../../ui/Button";
import useDangXuat from "../../hooks/useDangXuat";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
const LogoBox = styled.div`
  width: 15%;
  height: 100%;
  margin: 0.8rem 3.2rem;
`;
function SinhVienNavigation() {
  const { data } = UseThongTinTaiKhoan();
  const { trangThaiSinhVien } = data;
  const dangXuat = useDangXuat();

  return (
    <Navigation variation="sinhVien">
      <LogoBox>
        <NavLink to="trangChu">
          <NavLogo src={Logo} type="small" />
        </NavLink>
      </LogoBox>
      <NavContent variation="sinhVien">
        <MenuItems variation="sinhVien">
          <li>
            <MenuItem variation="sinhVien" to="trangChu">
              <HiHome />
              <H6 className="heading heading--5">Thông tin sinh viên</H6>
            </MenuItem>
          </li>
          <li>
            {trangThaiSinhVien === 0 ? (
              <MenuItem variation="sinhVien" to="dangKyDeTai">
                <HiOutlineClipboard />
                <H6 className="heading heading--5">Đăng ký đề tài</H6>
              </MenuItem>
            ) : (
              <MenuItem variation="sinhVien" to="quanLyDeTai">
                <HiOutlineClipboard />
                <H6 className="heading heading--5">Quản lý đề tài</H6>
              </MenuItem>
            )}
          </li>
          <li>
            <MenuItem variation="sinhVien" to="lichHop">
              <HiOutlineClock />
              <H6 className="heading heading--5">Lịch họp</H6>
            </MenuItem>
          </li>
          <li>
            <MenuItem variation="sinhVien" to="troChuyen">
              <HiOutlineChatBubbleLeft />
              <H6 className="heading heading--5">Trò chuyện</H6>
            </MenuItem>
          </li>
        </MenuItems>
      </NavContent>
      <NavFooter variation="sinhVien">
        <AccountAvatar>
          <Avatar src={data.hinhanh} />
        </AccountAvatar>
        <NavLink to="taikhoan">
          <H6 className="heading heading--5">Nguyễn Tuấn Kiệt</H6>
        </NavLink>
        <FooterMenu>
          <div>
            <NavLink to="trangChu">
              <Button shadow="none" bgcolor="transparent">
                Xem thông tin tài khoản
              </Button>
            </NavLink>
          </div>
          <div>
            <Button shadow="none" bgcolor="transparent" onClick={dangXuat}>
              Đăng xuất
            </Button>
          </div>
        </FooterMenu>
      </NavFooter>
    </Navigation>
  );
}

export default SinhVienNavigation;
