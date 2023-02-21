import {axiosService} from "./axios.service";
import {urls} from "../urls/usrls";

const _accessToken = 'access'
const _refreshToken = 'refresh'

const authServices = {
    login:(user)=>axiosService.post(urls.auth, user),

    setTokens:({access, refresh})=>{
        localStorage.setItem(_accessToken,access)
        localStorage.setItem(_refreshToken,refresh)
    },

    deleteTokens:()=>{
        localStorage.removeItem(_accessToken)
        localStorage.removeItem(_refreshToken)
    },

    getAccessToken:()=>localStorage.getItem(_accessToken),
    getRefreshToken:()=>localStorage.getItem(_refreshToken)
}

export {authServices}