import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";

import {authActions} from "../../redux/slice/auth.slices";
import {paidActions} from "../../redux/slice/paid.slice";
import "./style.css";


export default function LoginForm(){

    const {register,handleSubmit,formState: { errors }} = useForm();

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
    //const renderErrorMessage = () =>  error && error.detail &&  <div className="error">{error.detail}</div>;
    return(
        <div className="app">
            <div className="login-form">
                <div className="title">Sign In</div>
                <div className="form">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container">
                            {/*{renderErrorMessage()}*/}
                            {error ? error.detail && <div className="error">{error.detail}</div>:errors && errors.email && <div className="error">{errors.email.message}</div>}
                            <label>Email </label>
                            <input type="text" placeholder={'email'} {...register('email',{
                                required: {
                                    value: true,
                                    message: "You need to specify a valid email address"
                                },
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Dont valid email address"
                                }
                            })}/>
                        </div>
                        <div className="input-container">
                            <label>Password </label>
                            {errors && errors.password && <div className="error">{errors.password.message}</div>}
                            <input type="password" placeholder={'password'} {...register('password',{
                                required: 'This field is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must contain at least 8 numbers',
                                },
                                maxLength: {
                                    value: 128,
                                    message: 'Password is very big',
                                },
                            })}/>
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