import React from "react";
import styled from "styled-components";
import { HiMenu, HiMoon } from "react-icons/hi";
import { Button } from "../../ui/Button";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";

const Container = styled.div`
  width: 95%;
  height: 6rem;
  background-color: #fff;
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
  background-color: #fff;
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
  const cookie = new Cookies();
  const dangXuat = (e) => {
    e.preventDefault();
    cookie.remove("token");
    cookie.remove("user");
    window.location.replace("/");
  };
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
          <Button
            size="xs"
            bgcolor="transparent"
            color="var(--color--secondary_8)"
            shadow="none"
          >
            <HiMoon size="2.4rem" />
          </Button>
          <AvatarBox>
            <Avatar>
              <img
                src={data.hinhAnh || "../public/hinhanh/avatar.png"}
                alt="avatar"
              />
            </Avatar>
            <Dropdown>
              <div>
                <NavLink to="thongtincanhan">
                  <Button shadow="none" bgcolor="transparent">
                    Xem thông tin tài khoản
                  </Button>
                </NavLink>
              </div>
              <div>
                <Button
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
