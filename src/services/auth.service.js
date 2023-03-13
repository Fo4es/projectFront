import {axiosService} from "./axios.service";
import {urls} from "../urls/usrls";

const _accessToken = 'access'
const _refreshToken = 'refresh'
const _user = 'user'

const authServices = {
    login:(user)=>axiosService.post(urls.auth, user),
    refresh:(refresh)=>axiosService.post(`${urls.auth}/refresh`, {refresh}),

    setTokens:({access, refresh})=>{
        localStorage.setItem(_accessToken,access)
        localStorage.setItem(_refreshToken,refresh)
    },

    setUser:({profile})=>{
        localStorage.setItem(_user,JSON.stringify(profile))
    },

    deleteTokens:()=>{
        localStorage.removeItem(_accessToken)
        localStorage.removeItem(_refreshToken)
    },

    getAccessToken:()=>localStorage.getItem(_accessToken),
    getRefreshToken:()=>localStorage.getItem(_refreshToken),
    getUser:()=>localStorage.getItem(_user)
}

export {authServices}