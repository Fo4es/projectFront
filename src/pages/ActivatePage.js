import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

import {paidActions} from "../redux/slice/paid.slice";


export default function ActivatePage(){

    const {handleSubmit,register} = useForm();

    const params = useParams();

    const dispatch = useDispatch();

    const {token} = params;

    const submit = async (data)=> {
       await dispatch(paidActions.activateToken({token:token, ActivateUser:data }))
    }

    return(
        <div>
                 <form onSubmit={handleSubmit(submit)}>
                     <input placeholder='password' {...register('password')}/>
                     <button>save</button>
                 </form>
        </div>
    );
}