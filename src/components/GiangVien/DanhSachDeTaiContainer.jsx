import ReactQuill from "react-quill";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@tanstack/react-query";
import { HiCheck, HiCheckCircle, HiEye, HiXCircle } from "react-icons/hi";

import CanvaContainer from "../../ui/Canvas";
import Form from "../../ui/Form";
import { InputContainer } from "../../ui/Input";
import { Button } from "../../ui/Button";
import { Col, Col2, Col3, Row } from "../../ui/Table";
import Badges from "../../ui/Badge";
import { Tooltip } from "../../ui/Tooltip";
import { P2 } from "../../ui/Typography";
import { HiXMark } from "react-icons/hi2";
import { TagList, IconDiv } from "../../pages/GiangVien/GiangVienDuyetDeTai";
import { duyetDeTai, khongDuyetDeTai } from "../../API/giangVien/DuyetDeTai";

const modules = {
  toolbar: false,
};
export function DanhSachDeTaiContainer({ refetch, DanhSachDeTai, setActive }) {
  const newUuid = uuidv4();
  const { mutate: duyetMutate, isPending } = useMutation({
    mutationFn: duyetDeTai,
    onSuccess: (data) => {
      toast.success("Duyệt đề tài thành công");
      refetch();
    },
    onError: (error) => {
      toast.error("Duyệt đề tài không thành công " + error.message);
    },
  });
  const { mutate: khongDuyetMutate, isPending: khongDuyetPending } =
    useMutation({
      mutationFn: khongDuyetDeTai,
      onSuccess: () => {
        toast.success("Không duyệt đề tài thành công");
        refetch();
      },
      onError: () => {
        toast.error("Không duyệt đề tài không thành công");
      },
    });
  function duyetHandler(maDeTai) {
    duyetMutate({ maDeTai, maPheDuyet: newUuid });
  }
  function khongDuyetHandler(maDeTai) {
    khongDuyetMutate({ maDeTai });
  }
  return DanhSachDeTai.map((dt, index) => (
    <Row>
      <Col>
        <P2 size="1.4">{index + 1}</P2>
      </Col>
      <Col3 className="g-center">
        <P2 size="1.4">{dt.tenDeTai}</P2>
      </Col3>
      <Col2 className="g-center flexColumn">
        <P2 size="1.4">{dt.giangVienHuongDan}</P2>
      </Col2>
      <Col3
        className="g-center flexColumn"
        dangerouslySetInnerHTML={{
          __html: dt.kyNangCanCo,
        }}
      />
      <Col2 className="g-center">
        <P2 size="1.4">
          <TagList>
            {dt.Tag?.split(",").map((tag) => (
              <Badges
                bgcolor={"var(--color--main_2)"}
                color={"var(--color--main_7)"}
                label={tag}
                key={tag}
              />
            ))}
          </TagList>
        </P2>
      </Col2>
      <Col>
        <div className="flex flexColumn g-8">
          <Tooltip
            bgcolor="var(--color--secondary_1)"
            color="var(--color--main_6)"
            tcolor="true"
            content="Xem chi tiết"
            direction="top"
            size="sm"
            onClick={() => setActive(dt.maDeTai)}
          >
            <HiEye />
          </Tooltip>
          <Tooltip
            bgcolor="var(--color--main_6)"
            color="var(--color--secondary_1)"
            tcolor="true"
            content="Duyệt"
            direction="top"
            size="sm"
            onClick={() => duyetHandler(dt.maDeTai)}
          >
            <HiCheck />
          </Tooltip>
          <Tooltip
            bgcolor="var(--color--red_6)"
            color="var(--color--secondary_1)"
            tcolor="true"
            content="Không duyệt"
            direction="top"
            size="sm"
            onClick={() => khongDuyetHandler(dt.maDeTai)}
          >
            <HiXMark />
          </Tooltip>
        </div>
      </Col>
    </Row>
  ));
}
export function ChiTietDeTai({ dt, setActive }) {
  return (
    <CanvaContainer title={"Thông tin đồ án"} onClick={() => setActive(null)}>
      <Form>
        <InputContainer>
          <InputContainer.Label>Tên đề tài</InputContainer.Label>
          <InputContainer.Input type="text" value={dt.tenDeTai} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Giảng viên hướng dẫn</InputContainer.Label>
          <InputContainer.Input type="text" value={dt.giangVienHuongDan} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Loai</InputContainer.Label>
          <InputContainer.Input type="text" value={dt.loai} readOnly={true} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Mô tả</InputContainer.Label>
          <ReactQuill value={dt.moTa} readonly={true} modules={modules} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Kỹ năng cần có</InputContainer.Label>
          <ReactQuill
            value={dt.kyNangCanCo}
            readonly={true}
            modules={modules}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Kết quả cần đạt</InputContainer.Label>
          <InputContainer.Textarea
            rows={3}
            type="text"
            value={dt.ketQuaCanDat}
          />
        </InputContainer>
        <InputContainer>
          <P2 size={1.4} className="flex g-24">
            Tag:
            <TagList>
              {dt.Tag.split(",").map((tag) => (
                <Badges
                  bgcolor={"var(--color--main_2)"}
                  color={"var(--color--main_7)"}
                  label={tag}
                  key={tag}
                />
              ))}
            </TagList>
          </P2>
        </InputContainer>
        <div className="flex  g-24">
          <Button
            color="var(--color--secondary_1)"
            bgcolor="var(--color--main_7)"
            size="lg"
            className="flex flexCenter g-8"
          >
            <IconDiv>
              <HiCheckCircle />
            </IconDiv>
            Duyệt đề tài
          </Button>
          <Button
            color="var(--color--secondary_1)"
            bgcolor="var(--color--red_6)"
            size="lg"
            className="flex flexCenter g-8"
          >
            <IconDiv>
              <HiXCircle />
            </IconDiv>
            Không duyệt
          </Button>
        </div>
      </Form>
    </CanvaContainer>
  );
}
