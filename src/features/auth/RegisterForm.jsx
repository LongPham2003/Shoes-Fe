import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../../service/authService";

const schema = yup.object({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Bắt buộc nhập email"),
  userName: yup
    .string()
    .min(3, "Tối thiểu 3 ký tự")
    .required("Bắt buộc nhập tên người dùng"),
  password: yup
    .string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
});

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("Đăng ký thành công!");
      reset();
    } catch (error) {
      alert(error.response?.data?.message || "Đã xảy ra lỗi");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">Đăng ký</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full rounded border border-gray-300 p-2"
          />
          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        {/* Username */}
        <div>
          <label className="mb-1 block text-sm font-medium">
            Tên người dùng
          </label>
          <input
            type="text"
            {...register("userName")}
            className="w-full rounded border border-gray-300 p-2"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.userName?.message}
          </p>
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            {...register("password")}
            className="w-full rounded border border-gray-300 p-2"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-blue-600 p-2 text-white hover:bg-blue-700"
        >
          {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>
    </div>
  );
}
