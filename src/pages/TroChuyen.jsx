import React, { useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  guiTinNhan,
  layDanhSachLienLac,
  layDanhSachLienLacChoGiangVien,
  layNoiDungTinNhan,
} from "../API/ApiChat";
import { Spinner } from "../ui/Spinner";
import Loading from "./Loading";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const Main = styled.div`
  width: 95%;
  max-width: 1200px;
  height: 90vh;
  margin: auto;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  overflow: hidden;
  ${({ isloading }) =>
    isloading
      ? css`
          align-items: center;
          justify-content: center;
        `
      : ""}
`;

const Side = styled.div`
  padding: 20px;
  overflow: auto;
  &.left {
    width: 35%;
    border-right: 2px solid #ececec;
  }
  &.right {
    width: 65%;
    display: flex;
    flex-direction: column;
  }
`;

const Contact = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #e9e9e9;
  }
  &.active {
    background-color: #dedede;
  }
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChatArea = styled.div`
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8px;
  border-bottom: 1px solid var(--color--secondary_4);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MessageInput = styled.div`
  display: flex;
  padding-top: 12px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1.6rem;
  padding: 1.2rem 1.6rem;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 0.8rem;
`;

const SendButton = styled.button`
  padding: 1rem 1.5rem;
  border-radius: 2rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  cursor: pointer;
`;

const Message = styled.div`
  max-width: 60%;
  padding: 1.2rem 1.6rem;
  border-radius: 2rem;
  color: white;
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  line-height: 1.4;
  word-break: break-word;
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

  &.received {
    background-color: var(--color--secondary_4);
    color: var(--color--secondary_10);
    align-self: flex-start;
  }

  &.sent {
    background-color: var(--color--main_7);
    align-self: flex-end;
  }
`;
const ChatApp = () => {
  const { data: thongTinNguoiDung } = useQuery({
    queryKey: ["thongTinTaiKhoan"],
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lienLac"],
    queryFn: () => {
      const vaiTro = thongTinNguoiDung.vaiTro;
      return +vaiTro === 0
        ? layDanhSachLienLac(thongTinNguoiDung.maSinhVien)
        : layDanhSachLienLacChoGiangVien(thongTinNguoiDung.maGiangVien);
    },
  });

  const danhSachLienLac = useMemo(() => {
    if (isError) return null;
    return isLoading ? null : data.filter((d) => d.ma !== null);
  }, [isError, isLoading, data]);
  const [nguoiNhan, setNguoiNhan] = useState(null);

  useEffect(() => {
    if (danhSachLienLac?.length > 0) {
      setNguoiNhan(danhSachLienLac[0].ma);
    }
  }, [danhSachLienLac]);
  return (
    <Container>
      <Main isloading={isLoading}>
        {!isLoading && danhSachLienLac === null && (
          <Spinner color="var(--color--main_7)" />
        )}
        {isLoading && <Spinner color="var(--color--main_7)" />}
        {!isLoading && danhSachLienLac !== null && (
          <>
            <Side className="left">
              {isLoading && <Spinner />}
              {data &&
                danhSachLienLac.map(
                  (contact, index) =>
                    contact.ten && (
                      <Contact
                        className={nguoiNhan === contact.ma ? "active" : ""}
                        onClick={() => setNguoiNhan(contact.ma)}
                        key={index}
                      >
                        <Avatar
                          src={
                            contact.hinhanh ||
                            "../public/hinhanh/iuh_logo_1.png"
                          }
                          alt="User 1"
                        />
                        <span id={contact.id}>{contact.ten}</span>
                      </Contact>
                    )
                )}
            </Side>
            {nguoiNhan === null && (
              <Side className="right">
                <Spinner />
              </Side>
            )}
            {nguoiNhan !== null && (
              <Right
                nguoiGui={
                  thongTinNguoiDung.maSinhVien || thongTinNguoiDung.maGiangVien
                }
                nguoiNhan={nguoiNhan}
              />
            )}
          </>
        )}
      </Main>
    </Container>
  );
};

function Right({ nguoiGui, nguoiNhan }) {
  const {
    data: messages,
    isLoading: waitingMessages,
    refetch,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: () => layNoiDungTinNhan(nguoiGui, nguoiNhan),
  });
  useEffect(() => {
    refetch();
  }, [nguoiNhan, refetch]);
  const tinNhan = useRef(null);
  const quyeryClient = useQueryClient();
  const { mutate, isLoading: sendingLoading } = useMutation({
    mutationFn: guiTinNhan,
    onSuccess: (data) => {
      tinNhan.current.value = "";
      quyeryClient.invalidateQueries("messages");
    },
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    mutate({ nguoiGui, nguoiNhan, noiDung: tinNhan.current.value });
  };
  return (
    <Side className="right">
      {waitingMessages && <Loading size={4.8} color="var(--color--main_7)" />}
      {!waitingMessages && (
        <>
          <ChatArea>
            {messages.map((message, index) => (
              <Message
                key={index}
                className={
                  message.nguoiGui === +nguoiGui ? "sent" : "received "
                }
              >
                {message.noiDung}
              </Message>
            ))}
          </ChatArea>
          <form onSubmit={handleSubmit}>
            <MessageInput>
              <Input ref={tinNhan} placeholder="Type a message..." />
              <SendButton disabled={sendingLoading}>
                {sendingLoading ? <Spinner size="1" color="white" /> : "Send"}
              </SendButton>
            </MessageInput>
          </form>
        </>
      )}
    </Side>
  );
}

export default ChatApp;
