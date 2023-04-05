import {axiosService} from "./axios.service";
import {urls} from "../urls/usrls";
import {authServices} from "./auth.service";

const paidService = {
    getAll:(page=1,name='',surname='',email='',age='',course='',status='',course_format='',course_type='',order='-id',size=10,start_date='',group='',end_date='') => axiosService.get(urls.paid,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`,
        },
        params:{page,name,surname,email,age,course,status,course_format,course_type,order,size,start_date,group,end_date}
    }),
    patchByID:(id,data) => axiosService.patch(`${urls.paid}/${id}`,data,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    createUser:(user)=> axiosService.post(urls.admin,user,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    getAdminUsers:(page=1)=> axiosService.get(urls.admin,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        },
        params:{page}
    }),
    activateUser:(id)=> axiosService.get(`${urls.admin}/${id}/re_token`,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    activateToken:(token,ActivateUser)=> axiosService.post(`${urls.activate}/${token}`,ActivateUser,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    usersMy:()=> axiosService.get(urls.my,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    usersStatistic:(id)=> axiosService.get(`${urls.statistic}/${id}`,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    banUsers:(id,select)=> axiosService.patch(`${urls.admin}/${id}/${select}`),

    createComments:(id,comment)=> axiosService.post(`${urls.paid}/${id}/comments`,comment,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    getComments:(id) => axiosService.get(`${urls.paid}/${id}/comments`, {
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    getGroup:()=> axiosService.get(urls.groups,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    postGroup:(group)=> axiosService.post(urls.groups,group,{
        headers:{
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    }),
    getOrdersStatistic:()=> axiosService.get(urls.ordersStatistic, {
        headers: {
            Authorization: `Bearer ${authServices.getAccessToken()}`
        }
    })

}

export {
    paidService
}

