import React from "react";
import styled from "styled-components";
import { useState } from "react";

import { H6, P2 } from "../../ui/Typography";
import { Container, ThreeContainer } from "../../ui/Container";
import CardContainer from "../../ui/Card";
import { Button, OutlineButton } from "../../ui/Button";

export const ContentDiv = styled.div``;
export const BadgesDiv = styled.div`
  display: flex;
  gap: 1.6rem;
`;
function CardContent({ content }) {
  const [active, setActive] = useState(false);
  return (
    <CardContainer.CardContent
      active={active}
      onclick={() => {
        !active && setActive(true);
      }}
    >
      <ContentDiv>
        <BadgesDiv>
          <CardContainer.Badge
            bgcolor="var(--color--red_3)"
            color="var(--color--red_9)"
            label="HTML"
          />
          <CardContainer.Badge
            bgcolor="var(--color--green_3)"
            color="var(--color--green_9)"
            label="HTML"
          />
          <CardContainer.Badge
            bgcolor="var(--color--main_3)"
            color="var(--color--main_10)"
            label="HTML"
          />
        </BadgesDiv>
      </ContentDiv>

      <ContentDiv className="flex flexCenter">
        <H6>
          <strong>Loại:</strong>
        </H6>
        <P2 className="ml-1"> Đại học</P2>
      </ContentDiv>
      <ContentDiv className="flex flexCenter">
        <H6>
          <strong>GVHD:</strong>
        </H6>
        <P2 className="ml-1">Bùi Văn Đồng</P2>
      </ContentDiv>

      {active && (
        <>
          <ContentDiv>
            <H6>
              <strong>Mô tả:</strong>
            </H6>
            <div className="mt-1">
              <P2>
                Việc chọn trường học là việc quan trọng trong tương lai cho hoc
                sinh. Website cung cấp cho học sinh dễ dàng, nhanh chóng chọn
                trường phù hợp nhất với nguyện vọng và năng lực của bản thân.
              </P2>
              <P2>
                Tạo CSDL lưu trữ thông tin ngành, điểm vào đại học của các
                trường những năm trước trên cả nước. Trên cơ sở đó, với kết quả
                học tập trong từng giai đoạn, Website sẽ cho ra kết quả tốt
                nhất.
              </P2>
            </div>
          </ContentDiv>
          <ContentDiv>
            <H6>
              <strong>Kỹ năng cần có:</strong>
            </H6>
            <div className="mt-1">
              <P2>
                - Ngôn ngữ trên server: Tùy chọn (Ưu tiên: PHP, Java,
                Python,...)
              </P2>
              <P2>
                - CSDL: Tùy chọn (Ưu tiên: MySQL,..) - Lợi thế hơn khi có kiến
                thức về Machine Learning, Web Scraping
              </P2>
            </div>
          </ContentDiv>
          <ContentDiv>
            <H6>
              <strong>Kết quả cần đạt:</strong>
            </H6>
            <P2 className="mt-1">
              Hệ thống lưu trữ trên đám mây và đầu ra là công cụ trực quan dữ
              liệu Power BI
            </P2>
          </ContentDiv>
          <OutlineButton
            color="var(--color--main_7)"
            onClick={() => setActive(false)}
          >
            Show less
          </OutlineButton>
        </>
      )}
    </CardContainer.CardContent>
  );
}
function ThongTinDeTai({ dt }) {
  return (
    <CardContainer>
      <CardContainer.Title>{dt.TenDeTai}</CardContainer.Title>
      <CardContent />
      <CardContainer.Footer position="end">
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
          className="bold"
        >
          Đăng ký
        </Button>
      </CardContainer.Footer>
    </CardContainer>
  );
}
export function DangKyDeTaiGrid({ danhSachDeTai }) {
  const newDs = chiaDeTaiTheoCot(danhSachDeTai, 3);
  return (
    <ThreeContainer>
      <Container>
        {newDs[0].map((dt, index) => (
          <ThongTinDeTai dt={dt} key={index} />
        ))}
      </Container>
      <Container>
        {newDs[1].map((dt, index) => (
          <ThongTinDeTai
            dt={dt}
            key={index + Math.ceil(danhSachDeTai.length / 3)}
          />
        ))}
      </Container>
      <Container>
        {newDs[2].map((dt, index) => (
          <ThongTinDeTai
            dt={dt}
            key={index + Math.ceil((danhSachDeTai.length / 3) * 2)}
          />
        ))}
      </Container>
    </ThreeContainer>
  );
}
function chiaDeTaiTheoCot(danhSach, soCot) {
  const ketQua = Array.from({ length: soCot }, () => []);
  danhSach.forEach((deTai, index) => {
    const cot = index % soCot;
    ketQua[cot].push(deTai);
  });
  return ketQua;
}
