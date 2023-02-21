import {axiosService} from "./axios.service";
import {urls} from "../urls/usrls";
import {authServices} from "./auth.service";

const paidService = {
    getAll:(page=1,name='',email='',age='',course='',status='',course_format='',course_type='',order='id') => axiosService.get(urls.paid,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        },
        params:{page,name,email,age,course,status,course_format,course_type,order}
    }),
    patchByID:(id,data) => axiosService.patch(`${urls.paid}/${id}`,data,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    })
}


export {
    paidService
}


// course_type='', course_type,