import styled from "styled-components";

import Badges from "../../../../ui/Badge";
import { H6, P2 } from "../../../../ui/Typography";
import { Button } from "../../../../ui/Button";
import useThongTinDoAn from "../../../../hooks/sinhVien/useThongTinDoAn";
import UseThongTinTaiKhoan from "../../../../hooks/UseThongTinTaiKhoan";
import MoiSinhVien from "./MoiSinhVien";
const OverviewRight = styled.aside`
  width: 24%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
const Container = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 1.6rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;
const TagList = styled.div`
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  justify-content: center;
`;
const MemberAvatar = styled.figure`
  width: 3.2rem;
  height: 3.2rem;
  background-color: red;
  border-radius: 50%;
  flex-shrink: 0;
`;
function OverviewRightContainer() {
  return (
    <OverviewRight>
      <SkillContainer />
      <MemberContainer />
    </OverviewRight>
  );
}
function SkillContainer() {
  const { data } = useThongTinDoAn();
  const DoAn = data.thongTinDoAn;
  return (
    <Container type="skill">
      <H6 className="bold" color="var(--color--secondary_8)">
        Tag
      </H6>
      <TagList>
        {DoAn.Tag.split(",").map((tag) => (
          <Badges
            label={tag}
            key={tag}
            bgcolor={"var(--color--main_3)"}
            color={"var(--color--main_6)"}
          />
        ))}
      </TagList>
    </Container>
  );
}
function MemberContainer() {
  const { data: thongtinsinhvien } = UseThongTinTaiKhoan();

  const { data } = useThongTinDoAn();
  const DoAn = data.thongTinDoAn;
  return (
    <Container>
      <MoiSinhVien />
      <div className="flex g-24 flexCenter">
        <MemberAvatar></MemberAvatar>
        <P2 color="var(--color--secondary_8)" size="1.4">
          {DoAn.tenSinhVien1}
        </P2>
        {!(+DoAn.maSinhVien1 === thongtinsinhvien.maSinhVien) && (
          <Button shadow="none" bgcolor="var(--color--secondary_3)" size="sm">
            Message
          </Button>
        )}
      </div>
      {DoAn.maSinhVien2 && (
        <div className="flex g-24 flexCenter">
          <MemberAvatar></MemberAvatar>
          <P2 color="var(--color--secondary_8)" size="1.4">
            {DoAn.tenSinhVien2}
          </P2>
          {!(+DoAn.maSinhVien2 === thongtinsinhvien.maSinhVien) && (
            <Button shadow="none" bgcolor="var(--color--secondary_3)" size="sm">
              Message
            </Button>
          )}
        </div>
      )}
      <div className="flex g-spaceBetween flexCenter">
        <MemberAvatar></MemberAvatar>
        <div>
          <P2 color="var(--color--secondary_8)" size="1.4">
            {DoAn.giangVienHD}
          </P2>
        </div>
        <Button shadow="none" bgcolor="var(--color--secondary_3)" size="sm">
          Message
        </Button>
      </div>
    </Container>
  );
}
export default OverviewRightContainer;
