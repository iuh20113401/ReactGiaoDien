import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { P2 } from "../../ui/Typography";
import { Button, OutlineButton } from "../../ui/Button";
import { InputContainer } from "../../ui/Input";
import Badges from "../../ui/Badge";
import CanvaContainer from "../../ui/Canvas";
import Form from "../../ui/Form";
import {
  layDanhSachGiangVien,
  phanGiangVienPhanBien,
} from "../../API/giangVien/phanGiangVienPhanBien";
import { Spinner } from "../../ui/Spinner";

const DoAnContainer = styled.div`
  display: flex;
  height: auto;
  padding: 0.8rem 0;
  overflow: hidden;
  &:hover {
    cursor: pointer;
  }
`;
const DoAnLeft = styled.aside`
  width: 8.6rem;
  height: 8.6rem;
  border-radius: 50%;
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const DoAnRight = styled.aside`
  width: 75%;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const ButtonDangKy = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
`;
const TagList = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;
const HiddentElement = styled.div`
  overflow: hidden;
  transition: max-height 0.5s ease-in-out;
  max-height: ${({ maxHeight }) => maxHeight};
`;
export function DanhSachDoAnContainer({ DanhSachDoAn, setChiTiet }) {
  return DanhSachDoAn.length > 0 ? (
    DanhSachDoAn.map((da) => <ChiTietDoAn da={da} setChiTiet={setChiTiet} />)
  ) : (
    <img src="../public/hinhanh/not_found_2.webp" alt="not found" />
  );
}
function ChiTietDoAn({ da, setChiTiet }) {
  const [active, setActive] = useState(false);
  const detailsRef = useRef(null); // Ref for the toggleable details container
  const [maxHeight, setMaxHeight] = useState("0px");

  useEffect(() => {
    setMaxHeight(active ? `${detailsRef.current.scrollHeight}px` : "0px");
  }, [active, da]);

  return (
    <DoAnContainer
      active={`${active}`}
      onClick={(e) => {
        if (e.target.localName === "button") return;
        setActive((a) => !a);
      }}
    >
      <DoAnLeft>
        <img
          src={da.hinhAnh || "../public/hinhanh/iuh_logo_1.png"}
          alt="Hình ảnh của đề tài"
        />
      </DoAnLeft>
      <DoAnRight>
        <P2 size="1.4rem" className="bold">
          {da.tenDeTai}
        </P2>
        <div className="flex g-4">
          <TagList>
            {da.Tag.split(",").map((tag) => (
              <Badges
                bgcolor={"var(--color--main_2)"}
                color={"var(--color--main_7)"}
                label={tag}
                key={tag}
              />
            ))}
          </TagList>
        </div>
        <P2 size="1.4rem">
          Giảng viên hướng dẫn: <strong> {da.giangVienHuongDan}</strong>
        </P2>
        <P2 size="1.4rem">
          Mã đồ án: <strong> {da.maDoAn}</strong>
        </P2>
        <HiddentElement ref={detailsRef} maxHeight={maxHeight}>
          <div className="flex g-8">
            <P2 size="1.4rem">
              Mã sinh viên 1: <strong>{da.maSinhVien1}</strong>
            </P2>
            <P2 size="1.4rem">
              Tên sinh viên 1: <strong>{da.tenSinhVien1}</strong>
            </P2>
          </div>
          {da.maSinhVien2 ? (
            <div className="flex g-8">
              <P2 size="1.4rem">
                Mã sinh viên 2: <strong>{da.maSinhVien2}</strong>
              </P2>
              <P2 size="1.4rem">
                Tên sinh viên 2: <strong>{da.tenSinhVien2}</strong>
              </P2>
            </div>
          ) : (
            ""
          )}
          <div className="flex flexColumn">
            <P2 size="1.4rem">
              <strong>Mô tả:</strong>
            </P2>
            <div dangerouslySetInnerHTML={{ __html: da.moTa }}></div>
          </div>
          <div className="flex flexColumn">
            <P2 size="1.4rem">
              <strong>Kỹ năng cần có:</strong>
            </P2>
            <div dangerouslySetInnerHTML={{ __html: da.kyNangCanCo }}></div>
          </div>
          <div className="flex flexColumn">
            <P2 size="1.4rem">
              <strong>Kết quả cần đạt:</strong>
            </P2>
            <P2 size="1.4rem">{da.ketQuaCanDat}</P2>
          </div>
        </HiddentElement>
      </DoAnRight>
      <ButtonDangKy>
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
          onClick={() => setChiTiet(da.maDoAn)}
        >
          Phân công
        </Button>
      </ButtonDangKy>
    </DoAnContainer>
  );
}
export function PhanGiangVienPhanBien({ da, setActive }) {
  const { data: danhSachGiangVien, isLoading } = useQuery({
    queryKey: ["danhSachGiangVien"],
    queryFn: layDanhSachGiangVien,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: phanGiangVienPhanBien,
    onSuccess: () => {
      toast.success("Phân công giảng viên phản biện thành công");
    },
    onError: () => {
      toast.error("Phân giảng viên phản biện không thành công");
    },
  });
  const [gv1, setGv1] = useState("");
  const [gv2, setGv2] = useState("");
  useEffect(() => {
    if (danhSachGiangVien) {
      setGv1(danhSachGiangVien[0]?.maGiangVien);
      setGv2(danhSachGiangVien[1]?.maGiangVien);
    }
  }, [danhSachGiangVien]);
  function phanCongHandler(e) {
    e.preventDefault();
    mutate({
      maDoAn: da.maDoAn,
      maGiangVienPhanBien1: gv1,
      maGiangVienPhanBien2: gv2,
    });
    setActive(false);
  }
  return (
    <CanvaContainer
      title={"Phân giảng viên phản biện"}
      onClick={() => setActive(false)}
    >
      {isLoading && (
        <div className="flex h-100">
          <Spinner bgcolor="var(--color--main_7)" />
        </div>
      )}
      {!isLoading && (
        <Form onSubmit={(e) => phanCongHandler(e)}>
          <InputContainer>
            <InputContainer.Label>
              <P2 size="1.4rem">Tên đề tài</P2>
            </InputContainer.Label>
            <InputContainer.Input
              defaultValue={`${da.tenDeTai}`}
              readOnly={true}
            />
          </InputContainer>
          <InputContainer>
            <P2 size="1.4rem">
              Mã đồ án: <strong>{da.maDoAn}</strong>
            </P2>
          </InputContainer>

          <InputContainer>
            <InputContainer.Label>
              <P2 size="1.4rem">Giảng viên phản biện 1</P2>
            </InputContainer.Label>
            <InputContainer.Select
              value={gv1}
              onChange={(e) => e.target.value !== gv2 && setGv1(e.target.value)}
            >
              {danhSachGiangVien.map((gv) => (
                <option
                  value={`${gv.maGiangVien}`}
                  disabled={gv.maGiangVien === +gv2}
                >
                  {gv.tenGiangVien}
                </option>
              ))}
            </InputContainer.Select>
          </InputContainer>
          <InputContainer>
            <InputContainer.Label>
              <P2 size="1.4rem">Giảng viên phản biện 2</P2>
            </InputContainer.Label>
            <InputContainer.Select
              value={gv2}
              onChange={(e) => {
                +e.target.value !== gv1 && setGv2(e.target.value);
              }}
            >
              {danhSachGiangVien.map((gv) => (
                <option
                  value={`${gv.maGiangVien}`}
                  disabled={gv.maGiangVien === +gv1}
                >
                  {gv.tenGiangVien}
                </option>
              ))}
            </InputContainer.Select>
          </InputContainer>
          <div className="flex g-24">
            <Button
              bgcolor="var(--color--main_7)"
              color="var(--color--secondary_1)"
              size="lg"
            >
              {!isPending && "Xác nhận"}
              {isPending && (
                <div className="flex g-24">
                  <Spinner size="3" />
                  <P2>Loading....</P2>
                </div>
              )}
            </Button>
            <OutlineButton
              color="var(--color--main_7)"
              size="lg"
              type="normal"
              onClick={() => setActive(false)}
            >
              Hủy
            </OutlineButton>
          </div>
        </Form>
      )}
    </CanvaContainer>
  );
}
