import React from "react";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { H5, P2 } from "../../../ui/Typography";
import CreateProgressBar from "../../../ui/ProgressBar";
import { InputContainer } from "../../../ui/Input";
import { hoanThanhHuongDan } from "../../../API/sinhVien/DeTai";
import useThongTinDoAn from "../../../hooks/sinhVien/useThongTinDoAn";
import Loading from "../../../pages/Loading";
import NothingHere from "../../../../public/hinhanh/Nothing_here_yet_3.webp";
const HuongDanContainer = styled.article`
  margin-top: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const HuongDanTitle = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1.6rem;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
`;
const NoiDungHuongDanContainer = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 0.8rem 1.6rem;
  box-shadow: 0rem 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.3rem;
`;

function HuongDan() {
  const { data, isLoading, error, isError } = useThongTinDoAn();
  const NoiDungHuongDan = data.huongDan;
  const DoAn = data.thongTinDoAn;
  const [checkboxStates, setCheckboxStates] = useState(
    NoiDungHuongDan.map((hd) => (+hd.trangThai > 0 ? true : false))
  );
  const [percent, setPercent] = useState(0);
  useEffect(() => {
    const checkedCount = Object.values(checkboxStates).filter(Boolean).length;
    const newPercent =
      (checkedCount / Object.keys(checkboxStates).length) * 100;
    setPercent(newPercent);
  }, [checkboxStates]);
  const { mutate, isPending } = useMutation({
    mutationFn: (id) =>
      hoanThanhHuongDan({ maDoAn: DoAn.maDoAn, maChiTietHuongDan: id }),
    onSuccess: () => {},
  });
  const handleCheckboxChange = (id) => {
    mutate(id);
    const index = NoiDungHuongDan.findIndex(
      (hd) => hd.maChiTietHuongDan === id
    );
    setCheckboxStates((prevState) => {
      return {
        ...prevState,
        [index]: !prevState[index],
      };
    });
  };
  return (
    <HuongDanContainer>
      <HuongDanTitle>
        <H5>Hướng dẫn</H5>
      </HuongDanTitle>
      {isLoading && <Loading size={8.4} color={"var(--color--main_7)"} />}
      {!NoiDungHuongDan.length && (
        <NoiDungHuongDanContainer className="flex flexCenter">
          <img
            src={NothingHere}
            alt="NOthing here "
            width={"1000rem"}
            height={"1000rem"}
          />
        </NoiDungHuongDanContainer>
      )}
      {NoiDungHuongDan.length && (
        <>
          <CreateProgressBar
            size={1.6}
            color={"var(--color--main_7)"}
            percent={`${percent}`}
            label="50"
          />
          <NoiDungHuongDanContainer>
            {NoiDungHuongDan.map((hd, index) => {
              return (
                <InputContainer type="checkbox" key={hd.maChiTietHuongDan}>
                  <InputContainer.Checkbox
                    color={"var(--color--red_7)"}
                    id={hd.maChiTietHuongDan}
                    checked={checkboxStates[index]}
                    disabled={checkboxStates[index]}
                    onChange={() => handleCheckboxChange(hd.maChiTietHuongDan)}
                  />
                  <div>
                    <InputContainer.Label
                      size={1.4}
                      htmlFor={hd.maChiTietHuongDan}
                      className="semibold"
                    >
                      <P2 size="1.6" className="semibold">
                        {hd.noiDung}
                      </P2>
                    </InputContainer.Label>
                    <div className="flex g-16">
                      <P2 size={1.4} color="var(--color--secondary_7)">
                        Kết quả yêu cầu: <strong>{hd.tieuChiHoanThanh}</strong>
                      </P2>
                      <P2 size={1.4} color="var(--color--secondary_7)">
                        Ngày hoàn thành dự kiến:{" "}
                        <strong>
                          {new Date(hd.ngayHoanThanh).toLocaleDateString(
                            "vi-VN",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              timeZone: "Asia/Ho_Chi_Minh",
                            }
                          )}
                        </strong>
                      </P2>
                    </div>
                  </div>
                </InputContainer>
              );
            })}
          </NoiDungHuongDanContainer>
        </>
      )}
    </HuongDanContainer>
  );
}

export default HuongDan;
