import axios from "axios";
import { API_URL } from "./products";
import { type DefaultResponse } from "@/types/Response";
import { type Profile } from "@/store/slices/profile";

export interface LoginData {
    email: string;
    password: string;
}

const profileInstance = axios.create({
    baseURL: `${API_URL}/auth/`,
    withCredentials: true
});

export const profileApi = {
    async login(loginData: LoginData) {
        return await profileInstance
            .post(`login`, loginData)
            .then<DefaultResponse<Profile>>((response) => response.data);
    }
};
