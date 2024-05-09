import styled from "styled-components";
import { useState } from "react";

import { H5, P2 } from "../../ui/Typography";
import { OutlineButton } from "../../ui/Button";
import { ThemMaDiemDanh } from "../../components/GiangVien/DiemDanh/ThemMaDiemDanh";

const DiemDanhContainer = styled.section`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

function GiangVienDiemDanh() {
  const [active, setActive] = useState(false);
  return (
    <DiemDanhContainer>
      <H5>Điểm danh</H5>
      <div>
        <OutlineButton
          color="var(--color--main_7)"
          onClick={() => setActive(true)}
        >
          <P2 color="var(--color--main_7)">Tạo mã điểm danh</P2>
        </OutlineButton>
      </div>
      {active && <ThemMaDiemDanh setActive={setActive} />}
    </DiemDanhContainer>
  );
}

export default GiangVienDiemDanh;
