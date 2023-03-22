import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";

import {paidActions} from "../redux/slice/paid.slice";


export default function ActivatePage(){

    const {handleSubmit,register} = useForm();

    const {error} = useSelector(state => state.paid);

    let navigate = useNavigate();

    const params = useParams();

    const dispatch = useDispatch();

    const {token} = params;

    const submit = async (data)=> {

        await dispatch(paidActions.activateToken({token:token, ActivateUser:data }))
        if(!error){
            navigate('/login')
        }

    }

    const renderErrorMessage = () =>  error && error.password &&  error.password.map(element=>  <div className="error">{element}</div>);
    return(
        <div className="app">
            <div className="login-form">
                <div className="title">Enter a password</div>
                <div className="form">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container">
                            <input placeholder='password' {...register('password')}/>
                            {renderErrorMessage()}
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