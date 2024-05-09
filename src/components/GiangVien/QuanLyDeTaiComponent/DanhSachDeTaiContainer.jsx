import toast from "react-hot-toast";
import { HiEye, HiPencil, HiTrash } from "react-icons/hi";
import { useMutation } from "@tanstack/react-query";

import { P2 } from "../../../ui/Typography";
import { Col, Col2, Col3, Row } from "../../../ui/Table";
import Badges from "../../../ui/Badge";
import { Tooltip } from "../../../ui/Tooltip";
import { xoaDeTai } from "../../../API/giangVien/DeTai";
import {
  TrangThai,
  TagList,
} from "../../../pages/GiangVien/GiangVienQuanLyDeTai";

export function DanhSachDeTaiContainer({ DanhSachDeTai, setActive, refetch }) {
  const { mutate: xoaMutate, isPending } = useMutation({
    mutationFn: xoaDeTai,
    onSuccess: () => {
      toast.success("Xóa đề tài thành công");
      refetch();
    },
    onError: () => {
      toast.error("Xóa đề tài không thành công ");
    },
  });
  function xoaDeTaiHandler(maDeTai) {
    xoaMutate({ maDeTai });
  }
  return DanhSachDeTai.map((dt) => {
    const tt = TrangThai.filter((tt) => dt.TrangThai === tt.ten)[0];
    return (
      <Row key={dt.MaDeTai}>
        <Col3>
          <P2 size="1.4">{dt.TenDeTai}</P2>
        </Col3>
        <Col2>
          <P2 size="1.4">{dt.KetQuaCanDat}</P2>
        </Col2>
        <Col2
          className="flexColumn"
          dangerouslySetInnerHTML={{ __html: dt.KyNangCanCo }}
        ></Col2>
        <Col2 className="flexCenter g-center">
          <TagList className=" g-center">
            {dt.Tag.split(",").map((tag) => (
              <Badges
                bgcolor={"var(--color--main_2)"}
                color={"var(--color--main_7)"}
                label={tag}
                key={tag}
              />
            ))}
          </TagList>
        </Col2>
        <Col2 className="flexCenter g-center">
          {
            <Badges
              label={`${tt.ten}`}
              bgcolor={`${tt.bgcolor}`}
              color={tt.color}
            />
          }
        </Col2>
        <Col className="flex flexColumn g-8 g-center flexCenter">
          <Tooltip
            size="sm"
            icon={<HiEye />}
            bgcolor="var(--color--main_7)"
            color="#fff"
            content="Xem chi tiết"
            tcolor="true"
            direction="top"
            onClick={() => setActive(dt.MaDeTai)}
            disabled={isPending}
          >
            <HiEye />
          </Tooltip>
          <Tooltip
            size="sm"
            icon={<HiEye />}
            bgcolor="var(--color--green_7)"
            color="#fff"
            content="Sửa thông tin"
            tcolor="true"
            direction="top"
            disabled={isPending}
          >
            <HiPencil />
          </Tooltip>
          <Tooltip
            size="sm"
            icon={<HiEye />}
            bgcolor="var(--color--red_6)"
            color="#fff"
            content="Xóa"
            tcolor="true"
            direction="top"
            onClick={() => xoaDeTaiHandler(dt.MaDeTai)}
            disabled={isPending}
          >
            <HiTrash />
          </Tooltip>
        </Col>
      </Row>
    );
  });
}
