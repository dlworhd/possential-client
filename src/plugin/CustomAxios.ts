import router from '../router/index';
import { mapMutations, Store } from 'vuex';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import store from '@/store';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<any>;
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

function accessToken(): string | null {
  return localStorage.getItem("accessToken");
}

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

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 403: Access Token이 존재하지 않을 때
    // 401: Access Token이 존재하지만 만료된 경우
    // Refresh Token이 존재하지 않을 때 400 에러
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      try {
        localStorage.removeItem("accessToken");
        // "/api/auth/reissue" 엔드포인트로 요청을 보내 새 토큰을 발급받음

        const reissueResponse = await instance.post("/api/auth/reissue");
        const newAccessToken = reissueResponse.data.value;

        // 새로 발급받은 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 원래 요청을 수정하고 새 액세스 토큰을 사용하여 다시 요청 보냄
        if (error.config) {
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance.request(error.config);
        }
        store.commit('setLogin', true);
      } catch (reissueError) {
        console.log("토큰 재발급에 실패했습니다:", reissueError);
        store.commit('setLogin', false);
        return Promise.reject(error);
      }
    } else if (error.response && error.response.status === 400) {
      // 400 에러일 경우에는 인터셉터 로직을 적용하지 않음
      return Promise.reject(error);
    }
    // 그 외의 에러 처리 로직
    return Promise.reject(error);
  }
);
export default instance;
