import React from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import { P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import { InputContainer } from "../../../ui/Input";
import CanvaContainer from "../../../ui/Canvas";
import Form from "../../../ui/Form";
import Badges from "../../../ui/Badge";
import { TagList } from "../../../ui/TagList";

export function XemChiTietDoAn({ da, setActive }) {
  const handleClick = () => {
    setActive(null);
  };
  const navigate = useNavigate();
  const navigateToXemChiTietDoAn = (maDoAn) => {
    navigate(`/giangvien/xemdanhsachdoan/chitietdoan?maDoAn=${maDoAn}`);
  };
  return (
    <CanvaContainer title={"Thông tin đồ án"} onClick={handleClick}>
      <Form>
        <InputContainer>
          <InputContainer.Label>Tên đề tài</InputContainer.Label>
          <InputContainer.Input type="text" defaultValue={da.tenDeTai} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Mã đồ án</InputContainer.Label>
          <InputContainer.Input type="text" defaultValue={da.maDoAn} />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Mô tả</InputContainer.Label>
          <ReactQuill
            rows={8}
            type="text"
            value={da.moTa}
            theme="snow"
            modules={{ toolbar: false }}
            readOnly={true}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Kỹ năng cần có</InputContainer.Label>
          <ReactQuill
            value={da.kyNangCanCo}
            readOnly={true}
            modules={{ toolbar: false }}
          />
        </InputContainer>
        <InputContainer>
          <InputContainer.Label>Kết quả cần đạt</InputContainer.Label>
          <InputContainer.Textarea
            rows={4}
            type="text"
            defaultValue={da.ketQuaCanDat}
            readOnly={true}
          />
        </InputContainer>
        <InputContainer>
          <P2 size={1.4} className="flex g-24">
            Tag:
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
          </P2>
        </InputContainer>
        <InputContainer>
          <P2 size={1.4} className="flex g-24">
            Tiến độ hoàn thành: {<BadgeTienDo tiendo={da.tienDoHoanThanh} />}
          </P2>
        </InputContainer>
        <Button onClick={() => navigateToXemChiTietDoAn(da.maDoAn)}>
          Xem chi tiết
        </Button>
      </Form>
    </CanvaContainer>
  );
}
function BadgeTienDo({ tiendo }) {
  if (tiendo < 30)
    return (
      <Badges
        label={`${tiendo}%`}
        bgcolor={"var(--color--red_7)"}
        color={"var(--color--secondary_1)"}
      />
    );
  if (tiendo < 70)
    return (
      <Badges
        label={`${tiendo}%`}
        bgcolor={"var(--color--yellow_6)"}
        color={"var(--color--secondary_1)"}
      />
    );
  if (tiendo < 100)
    return (
      <Badges
        label={`${tiendo}%`}
        bgcolor={"var(--color--main_7)"}
        color={"var(--color--secondary_1)"}
      />
    );
  if (tiendo === 100)
    return (
      <Badges
        label={`${tiendo}%`}
        bgcolor={"var(--color--green_7)"}
        color={"var(--color--secondary_1)"}
      />
    );
}
