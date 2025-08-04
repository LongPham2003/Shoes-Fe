import { Navigate } from "react-router-dom";
import { useAuth } from "../authContext";

export default function ProtectedRoute({ children }) {
  // Lấy trạng thái isAuthenticated từ context
  // để kiểm tra xem user có đăng nhập chưa.
  const { isAuthenticated } = useAuth();

  // chưa đăng nhập thì chuyển hướng đến trang đăng nhập
  // nếu đã đăng nhập thì hiển thị children (trang được bảo vệ)
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
