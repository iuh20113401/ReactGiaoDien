import React from "react";
import styled, { css } from "styled-components";
import { useState, useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";
import GiangVienNavigation from "../../components/GiangVien/GiangVienNavigation";
import MainHeader from "./MainHeader";
import Main from "./Main";
import UseThongTinTaiKhoan from "../../hooks/UseThongTinTaiKhoan";
import { Spinner } from "../../ui/Spinner";

const AppContainer = styled.div`
  display: flex;
  width: 100%;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) =>
    props.activenav && props.windowwidth >= 850
      ? "calc(100% - 20rem)"
      : "100vw"};
  ${(props) =>
    props.activenav &&
    props.windowwidth <= 850 &&
    css`
      &::after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        position: fixed;
        z-index: 101;
      }
    `};
`;

function GiangVienLayout() {
  const { data, isLoading, error, isError } = UseThongTinTaiKhoan();
  const [activeNav, setActiveNav] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (windowWidth <= 850) setActiveNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isError) {
    return <Navigate to={"/login"} />;
  }

  return (
    <AppContainer>
      {isLoading && (
        <div className="flex flexCenter g-center w-100 h-100">
          <Spinner color="var(--color--main_7)" />
        </div>
      )}
      {!isLoading && (
        <>
          {activeNav && <GiangVienNavigation setActiveNav={setActiveNav} />}
          <MainContainer activenav={activeNav} windowwidth={windowWidth}>
            <MainHeader setActiveNav={setActiveNav} />
            <Main>
              <Outlet />
            </Main>
          </MainContainer>
        </>
      )}
    </AppContainer>
  );
}

export default GiangVienLayout;
