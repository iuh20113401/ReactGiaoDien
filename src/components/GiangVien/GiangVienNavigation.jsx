import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  HiAcademicCap,
  HiMiniUserPlus,
  HiMiniClipboard,
  HiMiniPencilSquare,
  HiOutlineHome,
  HiMiniChatBubbleLeft,
  HiCalendar,
  HiChevronDown,
  HiChevronRight,
} from "react-icons/hi2";
import { HiCheckCircle } from "react-icons/hi";

import logo from "../../../public/hinhanh/iuh_logo_2.png";
const NavigationContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  height: 100vh;
  width: 19%;
  background-color: var(--color--white);
  padding: 1.6rem 0.8rem 6rem 1.6rem;
  box-shadow: 0rem 0rem 1rem 0.1rem rgba(0, 0, 0, 0.1);
  z-index: 100;

  position: sticky;
  top: 0;

  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 850px) {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 30%;
    transition: 0.3s;
    backdrop-filter: blur(10px);
  }
`;
const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
const Logo = styled.img`
  width: 4.8rem;
  height: 4.8rem;
`;
const Name = styled.h4`
  color: var(--color--secondary_7);
`;
const CloseMenu = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color--white);
  box-shadow: none;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
const MenuItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const MenuItem = styled.li`
  &:hover {
    cursor: pointer;
    background-color: var(--color--secondary_2);
  }
`;
const MenuHeader = styled.li`
  gap: 0.8rem;
  padding: 1.6rem 1rem 0.8rem 1rem;
  border-radius: 0.6rem;
  font-size: 1.8rem;
  color: var(--color--secondary_6);
  font-weight: 500;
`;
const Icon = styled.div`
  font-size: 2rem;
  height: fit-content;
  opacity: 0.8;
`;
const ItemName = styled.span`
  font-size: 1.4rem;
  font-weight: 500;
`;
const Link = styled(NavLink)`
  text-decoration: none;
  color: var(--color--secondary_10);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1.2rem;
  border-radius: 0.6rem;
  opacity: 0.8;
  &.active {
    background-image: linear-gradient(
      45deg,
      var(--color--main_8),
      var(--color--main_6),
      var(--color--main_5)
    );
    color: var(--color--nav-text);
    opacity: 0.9;
  }
  & > span:nth-child(3) {
    margin-left: auto;
  }
`;
const DropdownContainer = styled.ul`
  &:hover {
    background-color: transparent;
  }
  padding-left: 10px;
  border-radius: 0.6rem;

  & > li {
    border-radius: 0.6rem;

    margin-top: 0.8rem;
    &:hover {
      background-color: var(--color--secondary_2);
    }
  }
`;
function GiangVienNavigation({ setActiveNav }) {
  const [isListVisible, setIsListVisible] = useState(false);

  const { vaiTro } = JSON.parse(localStorage.getItem("user"));

  return (
    <NavigationContainer>
      <LogoBox>
        <Logo src={logo} />
        <Name>
          <strong>Quản lý khóa luận</strong>
        </Name>
        <CloseMenu onClick={() => setActiveNav((active) => !active)}>
          X
        </CloseMenu>
      </LogoBox>
      <MenuItems>
        {/* // Check if the user is a teacher */}
        {vaiTro < 3 && vaiTro >= 1 && (
          <>
            <MenuItemContent
              icon={<HiOutlineHome />}
              name="Dashboard"
              to="trangChu"
            />
            <MenuItemContent
              icon={<HiAcademicCap />}
              name="Quản lý đề tài"
              to="quanlydetai"
            />
            <MenuItemContent
              icon={<HiMiniClipboard />}
              name="Xem danh sách"
              to="none"
              dropdown={[
                { name: "Xem danh sách sinh viên", to: "xemdanhsachsinhvien" },
                { name: "Xem danh sách đồ án", to: "xemdanhsachdoan" },
                { name: "Điểm danh", to: "diemdanh" },
              ]}
              isListVisible={isListVisible}
              setIsListVisible={setIsListVisible}
            />
            <MenuItemContent
              icon={<HiMiniPencilSquare />}
              name="Chấm điểm "
              to="chamdiem"
            />
            <MenuItemContent
              icon={<HiOutlineHome />}
              name="Hướng dẫn "
              to="huongDan"
            />
            <MenuItemContent
              icon={<HiCalendar />}
              name="Lịch họp"
              to="lichhop"
            />
            <MenuItemContent
              icon={<HiMiniChatBubbleLeft />}
              name="Trò chuyện"
              to="trochuyen"
            />
            {vaiTro === 2 && (
              <>
                <MenuHeader>
                  <span>Trưởng / phó khoa</span>
                </MenuHeader>
                <MenuItemContent
                  icon={<HiCheckCircle />}
                  name="Quản lý danh mục"
                  to="quanlydanhmuc"
                />
                <MenuItemContent
                  icon={<HiCheckCircle />}
                  name="Duyệt đề tài"
                  to="duyetdetai"
                />
                <MenuItemContent
                  icon={<HiMiniUserPlus />}
                  name="Phân giảng viên phản biện"
                  to="phangiangvienphanbien"
                />
              </>
            )}
          </>
        )}
        {vaiTro === 3 && (
          <>
            <MenuItemContent
              icon={<HiOutlineHome />}
              name="Xem tài khoản"
              to="xemtaikhoan"
            />
            <MenuItemContent
              icon={<HiOutlineHome />}
              name="Thêm tài khoản"
              to="themTaiKhoan"
            />
          </>
        )}
      </MenuItems>
    </NavigationContainer>
  );
}

function MenuItemContent({
  icon,
  name,
  to,
  dropdown,
  isListVisible,
  setIsListVisible,
}) {
  let arrow;
  if (dropdown) {
    arrow = isListVisible ? <HiChevronDown /> : <HiChevronRight />;
  }
  return (
    <>
      <MenuItem
        onClick={(e) => {
          dropdown && setIsListVisible(!isListVisible);
        }}
      >
        <Link
          to={to}
          onClick={(e) => {
            dropdown && e.preventDefault();
          }}
        >
          <Icon>{icon}</Icon>
          <ItemName>{name}</ItemName>
          <span className="ml-5 flex flexCenter">{dropdown && arrow}</span>
        </Link>
      </MenuItem>
      {dropdown && isListVisible && (
        <DropdownContainer style={{ listStyleType: "none" }}>
          {dropdown.map((item) => (
            <li key={item.to}>
              <Link to={item.to}>
                <ItemName>{item.name}</ItemName>
              </Link>
            </li>
          ))}
        </DropdownContainer>
      )}
    </>
  );
}

export default GiangVienNavigation;
