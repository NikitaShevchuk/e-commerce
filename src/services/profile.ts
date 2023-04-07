import axios, { type AxiosResponse } from "axios";
import { API_URL } from "./products";
import { type DefaultResponse } from "@/types/Response";
import { type Profile } from "@/store/slices/profile";

export interface LoginData {
    email: string;
    password: string;
}

export interface SignUpData extends LoginData {
    name: string;
    image?: string;
}

const profileInstance = axios.create({
    baseURL: `${API_URL}/auth/`,
    withCredentials: true
});

const extractData = async (response: AxiosResponse<DefaultResponse<Profile>>) => response.data;

export const profileApi = {
    async login(loginData: LoginData) {
        return await profileInstance
            .post<DefaultResponse<Profile>>(`login`, loginData)
            .then(extractData);
    },
    async me() {
        return await profileInstance.get<DefaultResponse<Profile>>(`me`).then(extractData);
    },
    async logout() {
        return await profileInstance
            .delete<DefaultResponse<undefined>>(`logout`)
            .then((res) => res.data);
    },
    async signup(signupData: SignUpData) {
        return await profileInstance
            .post<DefaultResponse<Profile>>(`signup`, signupData)
            .then(extractData);
    }
};
