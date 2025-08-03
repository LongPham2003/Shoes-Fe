import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { login as loginUser } from "../../service/authService";

const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      setErrorMessage("");
      const res = await loginUser(data);
      if (res.status !== 200) {
        throw new Error("Đăng nhập không thành công");
      }
      // Lưu token
      localStorage.setItem("accessToken", res.data.accessToken);
      alert("Đăng nhập thành công!");
      reset();
      // Có thể redirect sang trang chủ
    } catch (err) {
      setErrorMessage("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Login error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md space-y-4 rounded border p-4"
    >
      <h2 className="text-center text-xl font-semibold">Đăng nhập</h2>

      <div>
        <label className="mb-1 block">Email</label>
        <input
          {...register("email")}
          className="w-full rounded border p-2"
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block">Mật khẩu</label>
        <input
          {...register("password")}
          className="w-full rounded border p-2"
          type="password"
          placeholder="Mật khẩu"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
}
