import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {adminActions} from "../redux/slice/admin.slice";
import "./page.css"


export default function ActivatePage(){

    const {handleSubmit,register,formState:{errors}} = useForm();

    const {error} = useSelector(state => state.paid);

    let navigate = useNavigate();

    const params = useParams();

    const dispatch = useDispatch();

    const {token} = params;

    const submit = async (data)=> {

        await dispatch(adminActions.activateToken({token:token, ActivateUser:data }))
        if(!error){
            navigate('/login')
        }

    }

    // const renderErrorMessage = () =>  error && error.password &&  error.password.map(element=>  <div className="error">{element}</div>);
    return(
        <div className="app">
            <div className="login-form">
                <div className="title">Enter a password</div>
                <div className="form">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container">
                            <input type="password"  placeholder='password' {...register('password',{
                                required: 'This field is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters',
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                                    message:
                                        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
                                },
                            })}/>
                            {error ? error.password && error.password.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.password && <div className="error">{errors.password.message}</div>}

                        </div>
                        <div className="button-container">
                            <button>save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}