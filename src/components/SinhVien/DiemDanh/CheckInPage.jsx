import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ghiNhanDiemDanh } from "../../../API/sinhVien/DeTai";
import { Spinner } from "../../../ui/Spinner";
import toast from "react-hot-toast";

export function CheckInPage({ data }) {
  const [status, setStatus] = useState({
    status: "loading",
    message: "Đang xác minh vị trí...",
  });
  const eventLocation = { latitude: data.lat, longitude: data.lon };
  const allowedDistance = 0.5;
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: ghiNhanDiemDanh,
    onSuccess: () => {
      toast.success(status.message);
      navigate("sinhvien/trangchu");
    },
    onError: () => {
      toast.error(status.message);
      navigate("sinhvien/trangchu");
    },
  });
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const distance = calculateDistance(
            parseFloat(latitude),
            parseFloat(longitude),
            parseFloat(eventLocation.latitude),
            parseFloat(eventLocation.longitude)
          );
          if (distance <= allowedDistance) {
            setStatus((status) => ({
              ...status,
              status: true,
              message: "Điểm danh thành công.",
            }));
          } else {
            setStatus((status) => ({
              ...status,
              status: false,
              message: `Bạn không trong phạm vi điểm danh. Khoảng cách là ${distance.toFixed(
                3
              )} km.`,
            }));
          }
        },
        () => {
          setStatus((status) => ({
            ...status,
            status: false,
            message:
              "Không thể truy cập vị trí. Vui lòng cho phép truy cập vị trí và thử lại.",
          }));
        },
        { enableHighAccuracy: true }
      );
    } else {
      setStatus((status) => ({
        ...status,
        status: false,
        message: "Trình duyệt không hỗ trợ Geolocation.",
      }));
    }
  }, []);

  useEffect(() => {
    if (status.status !== "loading") {
      mutate({ maDiemDanh: data.maDiemDanh, maSinhVien: data.maSinhVien });
    }
  }, [status]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Bán kính Trái Đất theo km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Khoảng cách theo km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  if (status === "Đang xác minh vị trí...") {
    return (
      <div className="flex flexCenter g-center h-100">
        <Spinner color="var(--color--main_7)" />
      </div>
    );
  }
  return null;
}
