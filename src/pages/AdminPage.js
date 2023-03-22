import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {redirect, useNavigate} from "react-router-dom";

import {paidActions} from "../redux/slice/paid.slice";
import Admin from "../components/Admin/Admin";
import {authServices} from "../services/auth.service";


export default function AdminPage(){

    const {admin} = useSelector(state => state.admin);

    let navigate = useNavigate();

    const {results} =  admin;

    const user = JSON.parse(authServices.getUser())

    const {handleSubmit,register} = useForm();

    const dispatch = useDispatch();

    const submit = async (profile)=>{
        await dispatch(paidActions.createUser({
            user: {profile:{name: profile.name, surname: profile.surname},email: profile.email}
        }));
    }

    useEffect(()=> {
        if (!user.is_superuser) {
            return navigate("/paid");
        }
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
            <button onClick={() => {
                navigate('/paid')
            }}>Back to table
            </button>
            {results && results.map((user,index)=><Admin key={index} user={user}/>)}
        </div>
    );

}