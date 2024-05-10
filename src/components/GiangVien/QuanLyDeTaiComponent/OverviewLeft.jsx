import React from "react";
import styled, { css } from "styled-components";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { H6, P2 } from "../../../ui/Typography";
import Badges from "../../../ui/Badge";
import { DoubleContainer } from "../../../ui/Container";
import { HiDownload, HiOutlineDocument, HiPaperClip } from "react-icons/hi";
import { Button, ButtonWithIcons } from "../../../ui/Button";
import { InputContainer } from "../../../ui/Input";
import { layDanhSachComment, themComment } from "../../../API/ApiComment";
import { formatDate } from "../../../utils/formatDate";
import useThongTinDoAn from "../../../hooks/useThongTinDoAn";
import useSearchParamGet from "../../../hooks/useSearchParamGet";
import { layDanhSachTaiLieu } from "../../../API/sinhVien/DeTai";
import Loading from "../../../pages/Loading";
import Logo from "../../../../public/hinhanh/iuh_logo_1.png";
const OverviewLeft = styled.aside`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;
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
const RuleStyle = {
  dash: css`
    width: 98%;

    border: 1px dashed var(--color--secondary_4);
  `,
  solid: css`
    width: 100%;

    border: 1px solid var(--color--secondary_4);
  `,
};
const Rule = styled.div`
  margin: auto;
  height: 1px;
  ${({ rulestyle }) => (rulestyle ? RuleStyle[rulestyle] : RuleStyle["dash"])}
  margin-top: 1.6rem;
  margin-bottom: 1.6rem;
`;
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
const OverviewComment = styled.div`
  width: 100%;
  background-color: #fff;
  box-shadow: 0rem 1rem 2rem rgba(0, 0, 0, 0.1);
  padding: 1.6rem;
  border-radius: 0.6rem;
`;
const CommentDiv = styled.div`
  width: 100%;
  height: 22rem;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  overflow-y: scroll;
`;
const CommentField = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  text-align: right;
  align-self: end;
  gap: 0.8rem;
`;
const Comment = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
`;
const CommentLeft = styled.figure`
  width: 3.2rem;
  height: 3.2rem;
  clip-path: circle(50% at 50% 50%);
  & > img {
    width: 100%;
    height: 100%;
  }
`;
const CommentRight = styled.div``;
export function OverviewLeftContainer() {
  return (
    <OverviewLeft>
      <OverviewSummaryContainer />
      <OverviewCommentContainer />
    </OverviewLeft>
  );
}
function OverviewSummaryContainer() {
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: DoAn, isLoading: DoAnLoading } = useThongTinDoAn({ maDoAn });
  const { data: TaiLieu, isLoading: taiLieuLoading } = useQuery({
    queryKey: ["danhSachTaiLieu"],
    queryFn: () => layDanhSachTaiLieu(maDoAn),
    enabled: !!maDoAn,
  });
  const isLoading = DoAnLoading || taiLieuLoading;
  return isLoading ? (
    <Loading size={8.4} color={"var(--color--main_7)"} className="flex" />
  ) : (
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
            label={
              DoAn.soLuongHuongDan === 0
                ? "Không có hướng dẫn"
                : DoAn.tienDo + "%"
            }
          />
        </OverviewContent>
        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Số lượng thành viên: </H6>
          <P2>
            <strong>{DoAn.maSinhVien2 ? 2 : 1}</strong>
          </P2>
        </OverviewContent>

        <OverviewContent>
          <H6 color="var(--color--secondary_6)">Tình trạng: </H6>
          <P2>
            <strong>
              {DoAn.trangThai === 0 ? "Chưa phê duyệt" : "Phê duyệt"}
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
function OverviewCommentContainer() {
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: DoAn, isLoading } = useThongTinDoAn({ maDoAn });
  const {
    data: comment,
    refetch,
    isLoading: commentLoading,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => {
      return layDanhSachComment(DoAn.maDoAn);
    },
  });
  if (isLoading)
    return (
      <Loading size={8.4} color={"var(--color--main_7)"} className="flex" />
    );
  return (
    <OverviewComment>
      <H6>Bình luận</H6>
      <Rule rulestyle="solid" />
      {!commentLoading && (
        <>
          {" "}
          <CommentContainer danhSachComment={comment} />
          <CommentFieldContainer refetch={refetch} />
        </>
      )}
    </OverviewComment>
  );
}
function CommentContainer({ danhSachComment }) {
  return (
    <>
      <CommentDiv>
        {danhSachComment?.map((comment) => {
          return (
            <Comment>
              <CommentLeft>
                <img
                  src={comment.hinhanh ? "../" + comment.hinhanh : Logo}
                  alt="logo of avatar"
                />
              </CommentLeft>
              <CommentRight>
                <div className="flex g-24 flexBaseline">
                  <P2 size="1.4" color="var(--color--secondary_10)">
                    {comment.hoTen}
                  </P2>
                  <P2 color="var(--color--secondary_5)" size="1.2">
                    {formatDate(comment.ngay)} / {comment.gio}
                  </P2>
                </div>
                <P2 color="var(--color--secondary_6)" size="1.4">
                  {comment.noiDung}
                </P2>
              </CommentRight>
            </Comment>
          );
        })}
      </CommentDiv>
    </>
  );
}
function CommentFieldContainer({ refetch }) {
  const [noiDung, setNoiDung] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: themComment,
    onSuccess: () => {
      setNoiDung("");
      refetch();
    },
    onError: () => {},
  });
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data: thongTinDoAn } = useQuery({
    queryKey: ["thongTinDoAn"],
  });
  const DoAn = thongTinDoAn;
  function commentHandler(e) {
    e.preventDefault();
    mutate({
      maDoAn: DoAn.maDoAn,
      nguoiGui: thongTinNguoiDung.maGiangVien,
      noiDung,
    });
  }
  return (
    <CommentField onSubmit={(e) => commentHandler(e)}>
      <InputContainer>
        <InputContainer.Textarea
          rows={3}
          placeholder={"Nhập bình luận"}
          id="comment"
          value={noiDung}
          onChange={(e) => setNoiDung(e.target.value)}
        />
      </InputContainer>
      <ButtonGroup>
        <ButtonWithIcons icon={<HiPaperClip />} size="2.2">
          <ButtonWithIcons.Icon />
        </ButtonWithIcons>
        <Button
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
          size="lg"
        >
          Đăng tải
        </Button>
      </ButtonGroup>
    </CommentField>
  );
}
