import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/auth",
  withCredentials: true, // để gửi cookie chứa refreshToken
});

// Gắn accessToken
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Tự refresh token nếu 401
instance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const res = await axios.post(
          "/api/auth/refresh",
          {},
          { withCredentials: true },
        );
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Gửi lại request cũ
        err.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(err.config);
      } catch (refreshErr) {
        localStorage.removeItem("accessToken");
        console.error("Refresh token failed:", refreshErr);
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);

export default instance;
