import { useNavigate } from "react-router-dom";

function useDangXuat() {
  const navigate = useNavigate();
  const dangXuat = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return dangXuat;
}

export default useDangXuat;
