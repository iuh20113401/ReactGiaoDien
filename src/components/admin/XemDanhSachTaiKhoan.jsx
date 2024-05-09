import { useState } from "react";
import { BiReset, BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, OutlineButton } from "../../ui/Button";
import Table, { Col, Col2, Col3, Row, TieuDe } from "../../ui/Table";
import { P2 } from "../../ui/Typography";
import { Tooltip } from "../../ui/Tooltip";
import { InputContainer } from "../../ui/Input";
import {
  capNhatLaiMatKhau,
  capNhatNhieuMatKhau,
  xoaNhieuTaiKhoan,
  xoaTaiKhoan,
} from "../../API/taiKhoan/TaiKhoan";
import { Spinner } from "../../ui/Spinner";

function XemDanhSachTaiKhoan({ title, vaiTro, data }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: suaNhieuTaiKhoanMutate, isLoading: suaNhieuPending } =
    useMutation({
      mutationFn: capNhatNhieuMatKhau,
      onSuccess: () => {
        toast.success("Cập nhật mật khẩu thành công");
      },

      onError: () => {
        toast.error("Cập nhật mật khẩu thất bại");
      },
    });
  const { mutate: xoaNhieuMutate, isLoading: xoaNhieuPending } = useMutation({
    mutationFn: xoaNhieuTaiKhoan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["danhSachTaiKhoan"] });
      toast.success("Xóa tài khoản thành công");
    },
    onError: () => {
      toast.error("Xóa tài khoản thất bại");
    },
  });
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    if (newSelectAll) {
      setSelectedItems(data.map((item) => item.maTaiKhoan));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(id);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.length === data.length);
  };
  const handleSuaNhieuTaiKhoan = () => {
    suaNhieuTaiKhoanMutate({ maTaiKhoanArray: selectedItems, vaiTro });
  };
  const handleXoaNhieuTaiKhoan = () => {
    xoaNhieuMutate({ maTaiKhoanArray: selectedItems });
  };

  const isLoading = suaNhieuPending || xoaNhieuPending;

  return (
    !data.length && <P2>Không có dữ liệu</P2>,
    data && (
      <>
        <div className="flex g-8 flexEnd">
          <OutlineButton
            color="var(--color--main_7)"
            disabled={selectedItems.length === 0 || isLoading}
            onClick={handleSuaNhieuTaiKhoan}
          >
            {suaNhieuPending ? (
              <Spinner size="1.4" color="var(--color--main_7)" />
            ) : (
              "Cập nhật mật khẩu tài khoản"
            )}
          </OutlineButton>
          <Button
            bgcolor="var(--color--red_7)"
            color="var(--color--secondary_1)"
            disabled={selectedItems.length === 0 || isLoading}
            onClick={handleXoaNhieuTaiKhoan}
          >
            {xoaNhieuPending ? (
              <Spinner size="1.4" color="var(--color--secondary_1)" />
            ) : (
              "Vô hiệu hóa tài khoản"
            )}
          </Button>
        </div>
        <Table>
          <TieuDe>
            <Col className=" g-center">
              <InputContainer.Checkbox
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </Col>
            <Col2 className=" g-center">
              <P2 size="1.4rem">
                {vaiTro === 0 ? "Mã sinh viên" : "Mã giảng viên"}
              </P2>
            </Col2>
            <Col3 className=" g-center">
              <P2 size="1.4rem">
                {vaiTro === 0 ? "Tên sinh viên" : "Tên giảng viên"}
              </P2>
            </Col3>
            <Col2 className=" g-center">
              <P2 size="1.4rem">Email</P2>
            </Col2>
            <Col2 className=" g-center">
              <P2 size="1.4rem">Số điện thoại</P2>
            </Col2>
            <Col2 className=" g-center">
              <P2 size="1.4rem">Hành động</P2>
            </Col2>
          </TieuDe>
          <DanhSachTaiKhoan
            data={data}
            selectedItems={selectedItems}
            queryClient={queryClient}
            handleSelectItem={handleSelectItem}
          />
        </Table>
      </>
    )
  );
}
function DanhSachTaiKhoan({
  data,
  selectedItems,
  handleSelectItem,
  queryClient,
}) {
  return data.map((item, index) => {
    return (
      <ChiTietThongTin
        key={index}
        {...{ item, selectedItems, handleSelectItem, queryClient }}
      />
    );
  });
}
function ChiTietThongTin({
  item,
  selectedItems,
  handleSelectItem,
  queryClient,
}) {
  const { mutate: xoaMutate, isLoading: xoaPending } = useMutation({
    mutationFn: xoaTaiKhoan,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["danhSachTaiKhoan"] });
      toast.success("Xóa tài khoản thành công");
    },
  });
  const { mutate: capNhatMatKhauMutate, isLoading: capNhatMatKhauPending } =
    useMutation({
      mutationFn: capNhatLaiMatKhau,
      onSuccess: () => {
        toast.success("Cập nhật mật khẩu thành công");
      },
    });
  const handleCapNhatMatKhau = () => {
    capNhatMatKhauMutate({ maTaiKhoan: item.maTaiKhoan, vaiTro: item.vaiTro });
  };
  const handleXoaTaiKhoan = () => {
    xoaMutate({ maTaiKhoan: item.maTaiKhoan });
  };
  const isLoading = capNhatMatKhauPending || xoaPending;
  return (
    <Row key={item.maTaiKhoan}>
      <Col className=" g-center">
        <InputContainer.Checkbox
          checked={selectedItems.includes(item.maTaiKhoan)}
          onChange={() => handleSelectItem(item.maTaiKhoan)}
        />
      </Col>
      <Col2 className=" g-center">
        <P2 size="1.4rem">{item.maTaiKhoan}</P2>
      </Col2>
      <Col3 className=" g-center">
        <P2 size="1.4rem">{item.hoTen}</P2>
      </Col3>
      <Col2 className=" g-center">
        <P2 size="1.4rem">{item.email ?? "Rỗng"}</P2>
      </Col2>
      <Col2 className=" g-center">
        <P2 size="1.4rem">{item.soDienThoai ?? "Rỗng"}</P2>
      </Col2>
      <Col2 className=" flexColumn g-8">
        <Tooltip
          content="Cập nhật lại mật khẩu"
          direction="top"
          bgcolor="var(--color--main_7)"
          color="var(--color--secondary_1)"
          tcolor="true"
          size="sm"
          disabled={isLoading}
          onClick={handleCapNhatMatKhau}
        >
          {capNhatMatKhauPending ? (
            <Spinner size="1.4" color="var(--color--secondary_1)" />
          ) : (
            <BiReset />
          )}
        </Tooltip>
        <Tooltip
          content="Vô hiệu hóa tài khoản"
          direction="top"
          bgcolor="var(--color--red_7)"
          color="var(--color--secondary_1)"
          tcolor="true"
          size="sm"
          disabled={isLoading}
          onClick={handleXoaTaiKhoan}
        >
          {xoaPending ? (
            <Spinner size="1.4" color="var(--color--secondary_1)" />
          ) : (
            <BiTrash />
          )}
        </Tooltip>
      </Col2>
    </Row>
  );
}
export default XemDanhSachTaiKhoan;
