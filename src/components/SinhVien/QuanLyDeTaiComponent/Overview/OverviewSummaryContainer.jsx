import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

import Badges from "../../../../ui/Badge";
import { DoubleContainer } from "../../../../ui/Container";
import { HiDownload, HiOutlineDocument } from "react-icons/hi";
import { Button } from "../../../../ui/Button";
import useThongTinDoAn from "../../../../hooks/sinhVien/useThongTinDoAn";
import { Rule } from "./OverviewLeft";
import { H6, P2 } from "../../../../ui/Typography";

const OverviewSummary = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  border-radius: 0.6rem;
`;

const OverviewContent = styled.div`
  display: flex;
  ${({ direction }) =>
    direction
      ? css`
          flex-direction: row;
        `
      : css`
          flex-direction: column;
        `}
  gap: 0.4rem;
  ${({ margin }) =>
    margin
      ? css`
          margin-bottom: ${`${margin}rem`};
        `
      : css`
          margin-bottom: 0.8rem;
        `}
`;
const OverviewMoreInfos = styled.div`
  width: 100%;
  display: flex;
  padding: 0 2.4rem;
  justify-content: space-between;
`;
const OverviewFiles = styled.div``;

const FileInfo = styled.div`
  display: grid;
  padding: 1.6rem;
  grid-template-columns: 2fr 7fr 1fr 1fr;
  border: 1px solid var(--color--secondary_3);
  align-items: center;
`;
const FileIcon = styled.figure`
  width: 4.8rem;
  height: 4.8rem;
  border-radius: 0.6rem;
  background-color: var(--color--main_3);
  display: flex;
  & > svg {
    width: 80%;
    height: 80%;
    margin: auto;
    color: var(--color--main_7);
  }
`;

export function OverviewSummaryContainer() {
  const { data } = useThongTinDoAn();
  const DoAn = data.thongTinDoAn;
  const TaiLieu = data.taiLieu;
  return (
    <OverviewSummary>
      <OverviewContent>
        <H6 className="semibold" color="var(--color--secondary_8)">
          Mô tả
        </H6>
        <div dangerouslySetInnerHTML={{ __html: DoAn.moTa }}></div>
      </OverviewContent>
      <OverviewContent>
        <H6 className="semibold" color="var(--color--secondary_8)">
          Kỹ năng cần có
        </H6>
        <div dangerouslySetInnerHTML={{ __html: DoAn.kyNangCanCo }}></div>
      </OverviewContent>
      <OverviewContent margin="0">
        <H6 className="semibold" color="var(--color--secondary_8)">
          Kết quả cần đạt
        </H6>
        <P2 size="1.4">{DoAn.ketQuaCanDat}</P2>
      </OverviewContent>
      <Rule />
      <OverviewMoreInfos>
        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Ngày tham gia: </H6>
          <P2>
            <strong>{new Date(DoAn.ngayThamGia).toLocaleDateString()}</strong>
          </P2>
        </OverviewContent>
        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Tiến độ hoàn thành: </H6>
          <Badges
            bgcolor={"var(--color--yellow_5)"}
            color={"var(--color--secondary_1)"}
            className="bold"
            label={DoAn.tienDoHoanThanh.slice(0, 1) + "%"}
          />
        </OverviewContent>
        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Số lượng thành viên: </H6>
          <P2>
            <strong>{DoAn.maSinhVien2 ? 2 : 1}</strong>
          </P2>
        </OverviewContent>

        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Phê duyệt ra phản biện: </H6>
          <P2>
            <strong>
              {DoAn.trangThai === 0 ? "Chưa phê duyệt" : "Đã phê duyệt"}
            </strong>
          </P2>
        </OverviewContent>
      </OverviewMoreInfos>
      <Rule />
      <OverviewFiles>
        <H6 className="bold">Tài liệu</H6>
        <DoubleContainer>
          {TaiLieu?.length === 0 ? (
            <P2> Chưa có tài liệu nào </P2>
          ) : (
            TaiLieu.slice(0, 2).map((tl) => (
              <FileInfo>
                <FileIcon>
                  <HiOutlineDocument />
                </FileIcon>
                <OverviewContent margin="0">
                  <H6>{tl.tenTaiLieu}</H6>
                  <P2 size="1.2" color="var(--color--secondary_6)">
                    {Math.round(parseInt(tl.dungLuong))} KB
                  </P2>
                </OverviewContent>
                <NavLink to={tl.duongDan}>
                  <Button shadow="none" bgcolor="transparent">
                    <HiDownload />
                  </Button>
                </NavLink>
              </FileInfo>
            ))
          )}
        </DoubleContainer>
      </OverviewFiles>
    </OverviewSummary>
  );
}
