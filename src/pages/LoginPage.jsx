import styled from "styled-components";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";

import Form from "../ui/Form";
import { H4 } from "../ui/Typography";
import { InputContainer } from "../ui/Input";
import { Button, ButtonWithIcons } from "../ui/Button";
import { dangNhap } from "../API/DangNhap";
import { Spinner } from "../ui/Spinner";

const LoginCOntainer = styled.section`
  width: 100%;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 3.2rem;
`;
const ImageArticle = styled.article`
  width: 75%;
  height: 100%;
`;
const LoginFormContainer = styled.article`
  width: 25%;
  height: 90%;
  background-color: var(--color--secondary_1);
  box-shadow: 0 0.3rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.6rem;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: transparent;
`;
function LoginPage() {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const userCookie = cookies.get("user");
    if (userCookie?.taiKhoan) {
      navigateToHome(userCookie.vaiTro);
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate, isLoading } = useMutation({
    mutationFn: dangNhap,
    onSuccess: (data) => {
      const cookieOptions = rememberMe
        ? { path: "/", maxAge: 259200 }
        : { path: "/", maxAge: 3600 };
      cookies.set(
        "user",
        { taiKhoan: data.MaTaiKhoan, vaiTro: data.VaiTro },
        cookieOptions
      );
      cookies.set("token", data.token, cookieOptions);
      navigateToHome(data.VaiTro);
      toast.success("Đăng nhập thành công");
    },
    onError: (error) => {
      toast.error("Đăng nhập thất bại: " + error.message);
    },
  });

  function navigateToHome(vaiTro) {
    if (vaiTro === 0) navigate("/sinhVien");
    if (vaiTro > 0) navigate("/giangVien");
  }

  function loginSubmit(data) {
    const { taiKhoan, matKhau, ghinho } = data;

    if (Object.keys(errors).length > 0) {
      console.log("Form errors", errors);
      return;
    }

    if (!kiemTraHopLeMatKhau(matKhau) || !kiemTraHopLeTaiKhoan(taiKhoan)) {
      toast.error("Invalid username or password format.");
      return;
    }
    if (ghinho) setRememberMe(true);
    mutate({ taiKhoan, matKhau, thoiGian: ghinho ? 259200 : 3600 });
  }
  function kiemTraHopLeTaiKhoan(taiKhoan) {
    const pattern = /^\d{8,10}$/;
    return pattern.test(taiKhoan);
  }
  function kiemTraHopLeMatKhau(matKhau) {
    const pattern = /[A-z0-9]{8,}/i;
    return pattern.test(matKhau);
  }
  return (
    <LoginCOntainer>
      <ImageArticle>
        <Image src="./src/assets/Mobile login-rafiki.svg" />
      </ImageArticle>
      <LoginFormContainer>
        <Form method="post" onSubmit={handleSubmit(loginSubmit)}>
          <H4 className="gradient-text ">Đăng ký học phần</H4>
          <H4 color="var(--color--main_8)" className="bold">
            Đăng nhập
          </H4>
          <InputContainer type="float">
            <InputContainer.Input
              type="text"
              placeholder="Tài khoản"
              id="taikhoan"
              required={errors?.taiKhoan && true}
              register={{
                ...register("taiKhoan", {
                  required: "Vui lòng nhập mật khẩu",
                }),
              }}
            />
            <InputContainer.Label htmlFor="taikhoan">
              Tài khoản
            </InputContainer.Label>
          </InputContainer>
          <InputContainer type="float">
            <InputContainer.Input
              type="password"
              placeholder="Mật khẩu"
              id="matkhau"
              required={errors?.taiKhoan && true}
              register={{
                ...register("matKhau", {
                  required: "Vui lòng nhập mật khẩu",
                }),
              }}
            />

            <InputContainer.Label htmlFor="matkhau">
              Mật khẩu
            </InputContainer.Label>
          </InputContainer>
          <div className="flex flexCenter w-100">
            <InputContainer.Checkbox
              size={"1.8"}
              register={{
                ...register("ghinho"),
              }}
            />
            <InputContainer.Label>Ghi nhớ tài khoản</InputContainer.Label>
          </div>
          {isLoading ? (
            <ButtonWithIcons
              bgcolor="var(--color--main_7)"
              color="var(--color--secondary_1)"
              Spinner={<Spinner size="1.6" />}
              size="block"
              type="submit"
            >
              <ButtonWithIcons.Spinner />
              Loading...
            </ButtonWithIcons>
          ) : (
            <Button
              size="block"
              bgcolor="var(--color--main_7)"
              color="var(--color--secondary_1)"
              className="bold"
            >
              Đăng nhập
            </Button>
          )}
        </Form>
      </LoginFormContainer>
    </LoginCOntainer>
  );
}

export default LoginPage;
