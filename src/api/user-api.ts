import axiosClient from "./axios-client";

export type UserProfile = {
    id: string,
    name: string,
    city: string,
    emai: string,
}


const userApi = {
    getProfile: (): Promise<UserProfile> => axiosClient.get('/public-profile'),
}


export default userApi;