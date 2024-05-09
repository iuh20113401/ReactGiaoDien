import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { P2 } from "../../../ui/Typography";
import { Button, OutlineButton } from "../../../ui/Button";
import useThongTinDoAn from "../../../hooks/useThongTinDoAn";
import useSearchParamGet from "../../../hooks/useSearchParamGet";
import { InputContainer } from "../../../ui/Input";
import Modal from "../../../ui/Modal";
import { duyetPhanBien } from "../../../API/giangVien/DoAn";
import { Container } from "./OverviewRight";

export function DuyetDoAn() {
  const maDoAn = useSearchParamGet("maDoAn");
  const { data: DoAn, isLoading, isError, error } = useThongTinDoAn({ maDoAn });
  const [isDuyet, setIsDuyet] = useState(DoAn.trangThai);
  return (
    <Container>
      <InputContainer type="checkbox">
        <InputContainer.Label>
          <P2>Cho ra phản biện</P2>
        </InputContainer.Label>
        <InputContainer.Checkbox
          checked={isDuyet}
          onChange={() => setIsDuyet(true)}
          disabled={isDuyet}
        />
      </InputContainer>
      {isDuyet === true && <ModalDuyet setActive={setIsDuyet} />}
    </Container>
  );
}
function ModalDuyet({ setActive }) {
  const maDoAn = useSearchParamGet("maDoAn");
  const {
    mutate,
    isLoading: mutateLoading,
    error,
  } = useMutation({
    mutationFn: duyetPhanBien,
    onSuccess: () => {
      toast.success("Duyệt đồ án thành công");
    },
    onError: (error) => {
      toast.error("Duyệt đồ án thất bại");
    },
  });
  function handleDuyet() {
    mutate({ maDoAn });
    setActive(false);
  }
  return (
    <Modal
      onclick={() => {
        setActive(false);
      }}
    >
      <Container className="flex flexColumn flexCenter g-center">
        <P2>Bạn có chắc muốn xác nhận phê duyệt đồ án này ra phản biện?</P2>
        <div className="flex g-24">
          <OutlineButton
            color="var(--color--main_7)"
            onClick={() => {
              setActive(false);
            }}
          >
            Hủy
          </OutlineButton>
          <Button
            bgcolor="var(--color--main_7)"
            color="var(--color--secondary_1)"
            onClick={() => handleDuyet()}
          >
            {mutateLoading ? "Loading...." : "Xác nhận"}
          </Button>
        </div>
      </Container>
    </Modal>
  );
}
