import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosApiClient = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10000,
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


