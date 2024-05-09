import { H6, P2 } from "../../../ui/Typography";
import { Button } from "../../../ui/Button";
import { Container, MemberAvatar } from "./OverviewRight";
import useThongTinDoAn from "../../../hooks/useThongTinDoAn";
import useSearchParamGet from "../../../hooks/useSearchParamGet";
import Logo from "../../../../public/hinhanh/iuh_logo_2.png";
export function MemberContainer() {
  const maDoAn = useSearchParamGet("maDoAn");

  const { data: DoAn } = useThongTinDoAn({ maDoAn });

  return (
    <Container>
      <div className="flex g-spaceBetween flexCenter">
        <H6 className="bold">Member</H6>
      </div>
      <div className="flex g-8 flexCenter">
        <MemberAvatar>
          <img
            src={DoAn.hinhAnhSinhVien1 || Logo}
            alt="avatar"
            width={"100%"}
            height={"100%"}
          />
        </MemberAvatar>
        <P2 color="var(--color--secondary_8)" size="1.4">
          {DoAn.tenSinhVien1}
        </P2>
        <Button shadow="none" bgcolor="var(--color--secondary_3)" size="sm">
          Message
        </Button>
      </div>
      {DoAn.maSinhVien2 && (
        <div className="flex g-8 flexCenter">
          <MemberAvatar>
            <img
              src={DoAn.hinhAnhSinhVien2 || Logo}
              alt="avatar"
              width={"100%"}
              height={"100%"}
            />
          </MemberAvatar>
          <P2 color="var(--color--secondary_8)" size="1.4">
            {DoAn.tenSinhVien2}
          </P2>
          <Button shadow="none" bgcolor="var(--color--secondary_3)" size="sm">
            Message
          </Button>
        </div>
      )}
      <div className="flex g-8 flexCenter">
        <MemberAvatar>
          <img
            src={DoAn.hinhAnhGiangVienHD || Logo}
            alt="avatar"
            width={"100%"}
            height={"100%"}
          />
        </MemberAvatar>
        <div>
          <P2 color="var(--color--secondary_8)" size="1.4">
            {DoAn.giangVienHD}
          </P2>
        </div>
      </div>
    </Container>
  );
}
