import React from "react";
import styled from "styled-components";
import { HiMenu } from "react-icons/hi";
import { Button } from "../../ui/Button";
import { NavLink } from "react-router-dom";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import ToogleDarkMode from "../../components/GiangVien/MainHeader/ToogleDarkMode";
import useDangXuat from "../../hooks/useDangXuat";
import logo from "../../../public/hinhanh/iuh_logo_2.png";
const Container = styled.div`
  width: 95%;
  height: 6rem;
  background-color: var(--color--white);
  margin: auto;
  box-shadow: 0rem 0.3rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
  padding: 0 1.6rem;
  position: sticky;
  top: 1.6rem;
  z-index: 100;
  & > div {
    height: 100%;
  }
`;
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;
  height: 4rem;
  position: relative;
  &:hover > div:last-child {
    display: block;
  }
`;
const Avatar = styled.figure`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const Dropdown = styled.div`
  position: absolute;
  display: none;

  width: 15vw;
  height: fit-content;
  top: 100%;
  right: -40%;
  background-color: var(--color--white);
  box-shadow: 0rem 0.3rem 0.5rem 0.1rem rgba(0, 0, 0, 0.1);
  & > div {
    padding: 0 0.8rem;
    width: 100%;
    &:hover {
      background-color: var(--color--secondary_3);
    }
  }
`;
function MainHeader({ setActiveNav }) {
  const { data } = UseThongTinTaiKhoan();
  const dangXuat = useDangXuat();
  return (
    <Container>
      <div className="flex flexCenter g-spaceBetween">
        <Button
          bgcolor="transparent"
          color="var(--color--secondary_10)"
          shadow="none"
          onClick={() => setActiveNav((active) => !active)}
        >
          <HiMenu size="2.4rem" />
        </Button>
        <div className="flex flexCenter g-spaceBetween ">
          <ToogleDarkMode />
          <AvatarBox>
            <Avatar>
              <img src={data.hinhAnh || logo} alt="avatar" />
            </Avatar>
            <Dropdown>
              <div>
                <NavLink to="thongtincanhan">
                  <Button
                    color="var(--color--secondary_10)"
                    shadow="none"
                    bgcolor="transparent"
                  >
                    Xem thông tin tài khoản
                  </Button>
                </NavLink>
              </div>
              <div>
                <Button
                  color="var(--color--secondary_10)"
                  shadow="none"
                  bgcolor="transparent"
                  onClick={(e) => dangXuat(e)}
                >
                  Đăng xuất
                </Button>
              </div>
            </Dropdown>
          </AvatarBox>
        </div>
      </div>
    </Container>
  );
}

export default MainHeader;
