import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { H5, P2 } from "../ui/Typography";
import UseThongTinTaiKhoan from "../hooks/UseThongTinTaiKhoan";
import { OutlineButton } from "../ui/Button";
import { ThemLichHop } from "../components/GiangVien/LichHop/ThemLichHop";
import { layDanhSachLichHop } from "../API/LichHop";

const localizer = momentLocalizer(moment);
const LichHopContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  padding: 1.6rem 0;
  gap: 1.6rem;
`;
const Container = styled.article`
  width: 98%;
  margin: auto;
  background-color: #fff;
  padding: 3.2rem;
  box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.1);
`;

const LichHop = () => {
  const { data } = UseThongTinTaiKhoan();
  console.log(data);
  const vaiTro = data.vaiTro;

  const [active, setActive] = useState(false);
  const {
    data: events,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["lichHop"],
    queryFn: () =>
      layDanhSachLichHop({
        loai: +vaiTro === 0 ? "sinhVien" : "giangVien",
        ma: data.maGiangVien || data.maSinhVien,
      }),
    select: (data) => {
      const groupedEvents = data.reduce((acc, curr) => {
        const datetime = `${curr.ngay}T${curr.gio}`;
        if (!acc[datetime]) {
          acc[datetime] = {
            title: curr.tieuDe,
            start: new Date(datetime),
            end: new Date(moment(datetime).add(2, "hours").toDate()),
            ghiChu: curr.ghiChu,
            phong: curr.phong,
            gio: curr.gio,
            deTais: [curr.tenDeTai],
            doAns: [curr.maDoAn],
            tenSinhVien1: [curr.tenSinhVien1],
            tenSinhVien2: [curr.tenSinhVien2],
          };
        } else {
          acc[datetime].deTais.push(curr.tenDeTai);
          acc[datetime].doAns.push(curr.maDoAn);
          acc[datetime].tenSinhVien1.push(curr.tenSinhVien1);
          acc[datetime].tenSinhVien2.push(curr.tenSinhVien2);
        }
        return acc;
      }, {});
      return Object.values(groupedEvents).map((event) => ({
        ...event,
        title: event.title,
        ghiChu: event.ghiChu,
        phong: event.phong,
      }));
    },
  });

  return (
    <LichHopContainer>
      <H5>Lịch họp</H5>
      {vaiTro > 0 && (
        <div>
          <OutlineButton
            size="lg"
            color="var(--color--main_7)"
            onClick={() => setActive(true)}
          >
            Thêm lịch họp
          </OutlineButton>
        </div>
      )}
      <Container>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 1000 }}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView="week"
          components={{
            event: EventComponent,
            agenda: {
              event: AgendaEvent, // Use custom event component for agenda view
            },
            // Custom event component for tooltips
          }}
        />
      </Container>
      {active && <ThemLichHop setActive={setActive} />}
    </LichHopContainer>
  );
};
const EventComponent = ({ event }) => {
  return (
    <div
      title={`Phòng: ${event.phong}\nGhi Chú: ${event.ghiChu}`}
      placement="top"
    >
      <div>
        <P2 size="1.4" color="var(--color--secondary_1)">
          <strong>{event.title}</strong>
        </P2>
        <P2 size="1.4" color="var(--color--secondary_1)">
          {event.ghiChu}
        </P2>
        <P2 size="1.4" color="var(--color--secondary_1)">
          Phòng: {event.phong}
        </P2>
        <div>
          <P2 size="1.4" color="var(--color--secondary_1)">
            Giờ: {event.gio}
          </P2>
        </div>
      </div>
    </div>
  );
};
const AgendaEvent = ({ event }) => {
  return (
    <div>
      <P2>
        {moment(event.start).format("HH:mm")} -{" "}
        {moment(event.end).format("HH:mm")}
      </P2>
      <P2>{event.title}</P2>
      <P2>{event.phong}</P2>
      <P2>{event.ghiChu}</P2>
      <P2>
        <strong> Danh sách sinh viên họp</strong>
      </P2>
      {event.deTais.map((deTai, index) => {
        return (
          <div className="mb-3">
            <P2>
              Mã đồ án:
              <strong>{event.doAns[index]}</strong>
            </P2>
            <P2>
              <strong>Tên sinh viên 1: </strong>
              {event.tenSinhVien1[index]}
            </P2>
            {event.tenSinhVien2[index] && (
              <P2>
                <strong>Tên sinh viên 2: </strong>
                {event.tenSinhVien2[index]}
              </P2>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LichHop;
