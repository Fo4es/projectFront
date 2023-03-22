import axios from "axios";
import {createBrowserHistory} from 'history';

import {baseURL} from "../urls/usrls";
import {authServices} from "./auth.service";


const axiosService = axios.create({baseURL});

const history = createBrowserHistory();

axiosService.interceptors.request.use((config) => {
    const access = authServices.getAccessToken();

    if (access) {
        config.headers.Authorization = `Bearer ${access}`
    }
    return config
})
//
let isRefreshing = false
axiosService.interceptors.response.use((config) => {
        return config
    },
    async (error) => {
        const refresh = authServices.getRefreshToken();
//
        if (error.response?.status === 401 && error.config && !isRefreshing && refresh) {
            isRefreshing = true
            try {
                const {data} = await authServices.refresh(refresh);
                authServices.setTokens(data)
            } catch (e) {
                authServices.deleteTokens()
                return history.replace('/login?ExpSession=true')
            }

            isRefreshing = false
            // return axiosService(error.config)
        }
        return Promise.reject(error)

    }
)

export {
    axiosService
}