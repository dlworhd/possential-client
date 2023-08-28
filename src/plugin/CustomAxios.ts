import { Store } from "vuex";
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import store from "@/store";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

/**
 *
 * Request Interceptors
 *
 * HTTP
 * withCredentials: 쿠키, 인증 헤더 및 기타 인증 정보를 자동으로 포함시켜 서버로 전송
 * Authorization: 접두사 'Bearer '를 붙인 후 JWT Access Token을 HTTP Request Header에 담아서 전송
 *
 */
const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function accessToken(): string | null {
  return localStorage.getItem("accessToken");
}

//Request Interceptors
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = accessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 *
 * Response Interceptors
 *
 * Status Code
 * 403 FORBIDDEN: Access Token이 존재하지 않을 때
 * 401 UNAUTHORIZED: 권한이 없는 경우(Access Token이 존재하지만 만료된 경우 또는 Authorization과 함께 공백이 가는 경우)
 * 400 BAD_REQUEST: Refresh Token이 존재하지 않을 때
 *
 * EndPoint
 * 토큰 재발급: /api/auth/reissue
 *
 */
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const errorResponse = error.response;

    if (errorResponse) {
      if (errorResponse.status === 401 || errorResponse.status === 403) {
        try {
          //
          localStorage.removeItem("accessToken");
          const reissueResponse = await instance.post("/api/auth/reissue");
          const newAccessToken = reissueResponse.data.value;

          // 새로 발급받은 액세스 토큰을 로컬 스토리지에 저장
          localStorage.setItem("accessToken", newAccessToken);

          // 원래 요청을 수정하고 새 액세스 토큰을 사용하여 다시 요청 보냄
          if (error.config) {
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance.request(error.config);
          }
          store.commit("setLogin", true);
        } catch (reissueError) {
          console.log("토큰 재발급 실패:", reissueError);
          store.commit("setLogin", false);
          return Promise.reject(error);
        }
      }
    } else {
      console.log('Error:',error)
      return Promise.reject(error);
    }
  }
);
export default instance;
