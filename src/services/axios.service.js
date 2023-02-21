import axios from "axios";
import {baseURL} from "../urls/usrls";

const axiosService = axios.create({baseURL});

export {
    axiosService
}