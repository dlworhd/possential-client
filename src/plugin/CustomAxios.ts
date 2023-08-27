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
    
    store.commit('setLogin', true)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      try {
        localStorage.removeItem("accessToken");
        // "/api/auth/reissue" 엔드포인트로 요청을 보내서 토큰 재발급 받기

        const reissueResponse = await instance.post("/api/auth/reissue");
        const newAccessToken = reissueResponse.data.value;

        // 재발급받은 엑세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("accessToken", newAccessToken);

        // 기존 요청을 수정하여 재발급받은 엑세스 토큰을 사용하여 다시 요청 보내기
        if (error.config) {
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance.request(error.config);
        }
      } catch (reissueError) {
        console.log("토큰 재발급 실패:", reissueError);
        return Promise.reject(error);
      }
    } else {
        console.log('실행');
        router.push("/login");
    }
  }
);

export default instance;
