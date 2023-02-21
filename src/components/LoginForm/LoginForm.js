import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux/slice/auth.slices";

export default function LoginForm(){

    const {register,handleSubmit} = useForm();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submit = async (data) => {
        const {error} = await  dispatch(authActions.login({user:data}));
        if(!error){
            navigate('/paid')
        }


    };

    return(
        <form onSubmit={handleSubmit(submit)}>
            <input type="text" placeholder={'email'} {...register('email')}/>
            <input type="text" placeholder={'password'} {...register('password')}/>
            <button>Login</button>

        </form>
    );
}