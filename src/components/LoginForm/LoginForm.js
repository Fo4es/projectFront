import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux/slice/auth.slices";
import {paidActions} from "../../redux/slice/paid.slice";
import "./style.css";


export default function LoginForm(){

    const {register,handleSubmit} = useForm();

    const {error} = useSelector(state => state.auth);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const submit = async (data) => {
        const {error} = await  dispatch(authActions.login({user:data}));
        if(!error){
            await dispatch(paidActions.usersMy())
            navigate('/paid')
        }
    };
    const renderErrorMessage = () =>  error && error.detail &&  <div className="error">{error.detail}</div>;
    return(
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container">
                            {renderErrorMessage()}
                            <label>Email </label>
                            <input type="text" placeholder={'email'} {...register('email')}/>
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            <input type="password" placeholder={'password'} {...register('password')}/>
                        </div>
                        <div className="button-container">
                            <input type="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}