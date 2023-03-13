import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";

import {paidActions} from "../redux/slice/paid.slice";
import Admin from "../components/Admin/Admin";


export default function AdminPage(){

    const {admin} = useSelector(state => state.admin);

   const {results} =  admin;


    const {handleSubmit,register} = useForm();

    const dispatch = useDispatch();

    const submit = async (profile)=>{
        console.log(await dispatch(paidActions.createUser({
            user: {profile:{name: profile.name, surname: profile.surname},email: profile.email}
        })));
    }

    useEffect(()=> {
        dispatch(paidActions.getAdminUser())
    },[])
    return(
        <div>
            <form onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder={"email"} {...register('email')}/>
                <input type="text" placeholder={"name"} {...register('name')}/>
                <input type="text" placeholder={"surname"} {...register('surname')}/>
                <button>create</button>
            </form>
            {results && results.map((user,index)=><Admin key={index} user={user}/>)}
        </div>
    );
}