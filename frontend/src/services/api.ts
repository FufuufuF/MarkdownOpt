import axios, { AxiosError, AxiosResponse } from "axios";

export const API_CONFIG = {
    BASE_URL: "http://localhost:8080",
    TIMEOUT: 10000,
    ENDPOINTS: {
        OPTIMIZE: {
            BATCH: "/api/v1/optimize/batch",
            STREAM: "/api/v1/optimize/stream",
        },
        HEALTH: "/api/v1/health",
    }
} as const;

export const axiosApiClient = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosApiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response.data;
        } 
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)


