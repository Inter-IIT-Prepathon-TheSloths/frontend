// src/utils/axiosInstance.ts

import axiosLib from "axios";
import toast from "react-hot-toast";

const axios = axiosLib.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        let error_message = "";
        if (error.response) {
            console.error("Error response:", error.response.data);
            error_message =
                error.response.data.error || "An unexpected error occurred";
        } else {
            console.error("Error:", error.message);
            error_message = error.message;
        }
        toast.error(error_message);
        return Promise.reject(error);
    },
);

export default axios;
