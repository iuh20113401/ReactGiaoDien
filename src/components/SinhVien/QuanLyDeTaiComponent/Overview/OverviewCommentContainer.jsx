import styled from "styled-components";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { HiPaperClip } from "react-icons/hi";

import { H6, P2 } from "../../../../ui/Typography";
import { Button, ButtonWithIcons } from "../../../../ui/Button";
import { InputContainer } from "../../../../ui/Input";
import { layDanhSachComment, themComment } from "../../../../API/ApiComment";
import { formatDate } from "../../../../utils/formatDate";
import useThongTinDoAn from "../../../../hooks/sinhVien/useThongTinDoAn";
import { Rule } from "./OverviewLeft";

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
export function OverviewCommentContainer() {
  const { data: thongTinDoAn } = useThongTinDoAn();

  const DoAn = thongTinDoAn.thongTinDoAn;
  const {
    data: comment,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => {
      return layDanhSachComment(DoAn.maDoAn);
    },
  });
  return (
    <OverviewComment>
      <H6>Bình luận</H6>
      <Rule rulestyle="solid" />
      {!isLoading && (
        <>
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
        {danhSachComment.map((comment) => {
          return (
            <Comment>
              <CommentLeft>
                <img
                  src={comment.hinhanh || "../public/hinhanh/iuh_logo_1.png"}
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
    queryKey: ["thongtindoan"],
  });
  const DoAn = thongTinDoAn.thongTinDoAn;
  function commentHandler(e) {
    e.preventDefault();
    mutate({
      maDoAn: DoAn.maDoAn,
      nguoiGui: thongTinNguoiDung.maSinhVien,
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
