import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useNavigate, useSearchParams} from "react-router-dom";

import Admin from "../components/Admin/Admin";
import {authServices} from "../services/auth.service";
import OrdersStatistic from "../components/Statistic/OrdersStatistic";
import {adminActions} from "../redux/slice/admin.slice";
import "./page.css"




export default function AdminPage(){

    const {admin,prevAdmin,nextAdmin,error} = useSelector(state => state.admin);

    const [active,setActive] = useState();

    const [visible,setVisible] = useState(false);

    const [queryP,setQueryP] = useSearchParams({page: '1',size:'10'});

    let navigate = useNavigate();

    const {results} =  admin;

    const user = JSON.parse(authServices.getUser())

    const {handleSubmit,register,formState: { errors }} = useForm();
    const dispatch = useDispatch();

    const submit = async (profile)=>{
        await dispatch(adminActions.createUser({
            user: {profile:{name: profile.name, surname: profile.surname},email: profile.email}
        }));
    }

    useEffect(()=> {
        if (!user.is_superuser) {
            return navigate("/paid");
        }
        dispatch(adminActions.getAdminUser({
            page:queryP.get('page'),
        }))
    },[queryP,dispatch,user.is_superuser,navigate,active])

    const prevP = () => {
        const page = +queryP.get('page')-1;
        queryP.set("page",page);
        setQueryP(queryP);
        // setSize(size=10*query.get('page'));
    };

    const nextP = () => {
        const page = +queryP.get('page')+1;
        queryP.set("page",page);
        setQueryP(queryP);
        // setSize(size=10*query.get('page'));
    };

    // console.log(error["profile"]["name"][0]);

    return(
        <div>
            <OrdersStatistic/>
            <form onSubmit={handleSubmit(submit)}>
                <div >
                <div>
                <input type="text" placeholder={"email"} {...register('email',{
                    required: {
                        value: true,
                        message: "You need to specify a valid email address"
                    },
                    pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Dont valid email address"
                    }
                })}/>
                    {error ? error.email && error.email.map((obj,index)=>  <div key={index} className="error">{obj}</div>):errors && errors.email && <div className="error">{errors.email.message}</div> }
                </div>
                <div>
                <input type="text" placeholder={"name"} {...register('name',{
                    required: {
                        value:true,
                        message: "Please, add your name"
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-Я]+$/,
                        message: "Dont valid name?"
                    },
                    maxLength: {
                        value: 100,
                        message: "too long name, try again"
                    }
                })}/>
                    {error ? error.profile && error.profile.name && error.profile.name.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.name && <div className="error">{errors.name.message}</div>}
                </div>
                <div>
                <input type="text" placeholder={"surname"} {...register('surname',{
                    required: {
                        value:true,
                        message: "Please, add your surname"
                    },
                    pattern: {
                        value: /^[a-zA-Zа-яА-Я]+$/,
                        message: "Dont valid surname?"
                    },
                    maxLength: {
                        value: 100,
                        message: "too long surname, try again"
                    }
                })}/>
                    {error ? error.profile && error.profile.surname && error.profile.surname.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.surname && <div className="error">{errors.surname.message}</div>}
                </div>
                <button>create</button>
                </div>
            </form>
            <button onClick={() => {
                navigate('/paid')
            }}>Back to table
            </button>
            {results && results.map((user,index)=><Admin  key={index} setActive={setActive} user={user} setVisible={setVisible} visible={visible}/>)}
            <button  disabled={!prevAdmin}  onClick={prevP}>Prev</button>
            <button  disabled={!nextAdmin} onClick={nextP}>Next</button>
        </div>
    );

}