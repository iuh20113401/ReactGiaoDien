import ReactQuill from "react-quill";
import styled, { keyframes } from "styled-components";
import { HiX } from "react-icons/hi";

import { P2 } from "../../ui/Typography";
import { InputContainer } from "../../ui/Input";
import Badges from "../../ui/Badge";
import Form from "../../ui/Form";
import { TrangThai, TagList } from "../../pages/GiangVien/GiangVienQuanLyDeTai";

const Overlay = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  opacity: 0.3;
  z-index: 999;
`;
const CanvaAnimation = keyframes`
  0%{
    width: 0;
    opacity: 0;
  }
  100%{
    width: 33%;
    opacity: 1;

  }
`;
const Canva = styled.div`
  position: fixed;
  width: 33%;
  max-width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: #fff;
  z-index: 999;
  overflow: scroll;
  animation: ${CanvaAnimation} 0.2s linear;
  &::-webkit-scrollbar {
    display: none;
  }
  &::scroll-behavior {
    scroll-behavior: smooth;
  }
`;
const CanvaTitle = styled.div`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color--secondary_4);
`;
const IconDiv = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  & > svg {
    width: 100%;
    height: 100%;
    color: var(--color--secondary_6);
  }
  &:hover {
    cursor: pointer;
  }
`;
function LeftCanva({ children }) {
  return <Canva>{children}</Canva>;
}
const modules = {
  toolbar: false,
};
export function XemChiTiet({ active, setActive, dt }) {
  const tt = TrangThai.filter((tt) => dt.TrangThai === tt.ten)[0];

  return (
    <>
      <Overlay onClick={() => setActive(null)}></Overlay>
      <LeftCanva>
        <CanvaTitle>
          <P2 color="var(--color--secondary_8)" size="1.8">
            Thông tin đề tài
          </P2>
          <IconDiv onClick={() => setActive(null)}>
            <HiX />
          </IconDiv>
        </CanvaTitle>
        <Form>
          <InputContainer>
            <InputContainer.Label size={1.4}>Tên đề tài</InputContainer.Label>
            <InputContainer.Input
              type="text"
              value={dt.TenDeTai}
              readonly={true}
            />
          </InputContainer>
          <InputContainer>
            <InputContainer.Label size={1.4}>Mô tả</InputContainer.Label>
            <ReactQuill value={dt.MoTa} readonly={true} modules={modules} />
          </InputContainer>
          <InputContainer>
            <InputContainer.Label size={1.4}>
              Kỹ năng cần có
            </InputContainer.Label>
            <ReactQuill
              value={dt.KyNangCanCo}
              readonly={true}
              modules={modules}
            />
          </InputContainer>
          <InputContainer>
            <InputContainer.Label size={1.4}>
              Kết quả cần đạt
            </InputContainer.Label>
            <InputContainer.Textarea value={dt.KetQuaCanDat} readonly={true} />
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
          <InputContainer>
            <P2 size={1.4} className="flex g-24">
              Trạng thái:
              {
                <Badges
                  label={`${tt.ten}`}
                  bgcolor={`${tt.bgcolor}`}
                  color={tt.color}
                />
              }
            </P2>
          </InputContainer>
        </Form>
      </LeftCanva>
    </>
  );
}
