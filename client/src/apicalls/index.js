import axios from "axios";

export const axiosInstances = axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
        withCredentials: true,
        "Content-Type": "application/json",
    }
});
