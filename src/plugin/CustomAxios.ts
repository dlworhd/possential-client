import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";


import store from "@/store";


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
  // baseURL: `https://possential.site`,
  baseURL: `http://localhost:8080`,
  withCredentials: true,
});

function accessToken(): string | null {
  return localStorage.getItem("accessToken");
}

//Request Interceptors
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = accessToken();
    console.log('Request URL:', config.headers);

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

interface ApiResponse<T>{
  data: T;
  status: number;
  error: string
}

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<ApiResponse<any>>) => {
      const errorResponse = error.response;

      if (errorResponse) {
        if (errorResponse.status === 401 || errorResponse.status === 403) {
          try {
            //
            localStorage.removeItem("accessToken");
            const reissueResponse = await instance.post("/api/auth/reissue");
            if(reissueResponse){
              const newAccessToken = reissueResponse.data.value;
              localStorage.setItem("accessToken", newAccessToken);
              if (error.config) {
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                  instance.request(error.config).then(() => {
                    store.commit("setLogin", true);
                  })
                }
              }
            } catch(error) {
              alert(error)
          }
        } else if(errorResponse.status === 400 && errorResponse.data) {
          if(!(errorResponse.data.error === 'REFRESH_TOKEN_NOT_FOUND')){
            alert(errorResponse.data?.error)
            return Promise.reject(error);
          }
        }
      }
    }
  );
export default instance;
