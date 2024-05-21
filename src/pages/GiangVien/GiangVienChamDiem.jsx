import styled from "styled-components";
import { useState } from "react";
import { H5 } from "../../ui/Typography";
import { TabContentContents, TabHeaderContents } from "../../ui/Tab";
import { ChamDiemQuaTrinhContainer } from "../../components/GiangVien/ChamDiemQuaTrinh/ChamDiemQuaTrinhContainer";
import { ChamDiemPhanBienContainer } from "../../components/GiangVien/ChamDiemPhanBien/ChamDiemPhanBienContainer";

const ChamDiemSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  position: relative;
`;
export const Container = styled.article`
  width: 100%;
  height: auto;
  padding: 1.6rem;
  background-color: var(--color--white);
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  border-radius: 0.6rem;
`;

const TabArr = [
  { header: "Chấm điểm quá trình", content: <ChamDiemQuaTrinhContainer /> },
  { header: "Chấm điểm phản biện", content: <ChamDiemPhanBienContainer /> },
];

function GiangVienChamDiem() {
  const [isActive, setIsActive] = useState(0);
  return (
    <ChamDiemSection>
      <H5>Chấm điểm sinh viên</H5>
      <TabHeaderContents
        TabArr={TabArr}
        isActive={isActive}
        setIsActive={setIsActive}
      />
      <TabContentContents
        TabArr={TabArr}
        isActive={isActive}
        setIsActive={setIsActive}
      />
    </ChamDiemSection>
  );
}
export default GiangVienChamDiem;
