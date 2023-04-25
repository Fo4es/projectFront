import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {paidActions} from "../redux/slice/paid.slice";

export default function EditPage() {

    const {register, setValue, handleSubmit,getValues, formState: { errors }} = useForm();

    const {register:register2,handleSubmit: handleSubmit2} = useForm();

    const {userForUpdate,error} = useSelector(state => state.paid);

    const {group} = useSelector(state => state.group);

    const fields = ['surname','name','email','phone','course','phone','status','group']

    const {results} = group;

    const dispatch = useDispatch();

    const location = useLocation();

    const navigate = useNavigate();

    const {state} = location;

    useEffect(() => {
        if (userForUpdate) {
            setValue('name', userForUpdate.name)
            setValue('email', userForUpdate.email)
            setValue('surname', userForUpdate.surname)
            setValue('course', userForUpdate.course)
            setValue('phone', userForUpdate.phone)
            setValue('status', userForUpdate.status)
            setValue('group', userForUpdate.group ? userForUpdate.group.id :userForUpdate.group)
        }
    }, [setValue, userForUpdate]);




    const submit = async (data) => {
         // fields.map(obj=> console.log(setValue(obj,'nope')))
        fields.map(obj=> getValues(obj) === '' ?  data[obj] = null:null)
        // if(getValues("surname") === ''){
        //     data.surname = null;
        // }
        await dispatch(paidActions.patchComent({id: state.id, element: data}));
        navigate(-1)
    }
    //getValues(obj)?setValue(obj,'nope'):null
    const [visible,setVisible] = useState(false);


    function groupHandle() {
        setVisible(!visible)
    }

    const createGroup = async (group)=> {
        await dispatch(paidActions.postGroup({group}))
        setVisible(!visible)
    }

    const renderErrorMessage = (element) =>  error && error[element] &&  error[element].map((obj,index)=>  <div key={index} className="error">{obj}</div>);


    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Edit page</div>
                <div className="form">
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="input-container">
                            <input type="text" placeholder="name" {...register("name",{
                                pattern: {
                                    value: /^[a-zа-яёіA-ZА-ЯЇЁ]+$/,
                                    message: "Dont valid name?"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "too long name, try again"
                                }
                            })}/>
                            {error ? error.name && error.name.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.name && <div className="error">{errors.name.message}</div>}
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="email" {...register("email",{
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Dont valid email address"
                                }
                            })}/>
                            {error ? error.email && error.email.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.email && <div className="error">{errors.email.message}</div>}
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="surname"  {...register("surname",{
                                pattern: {
                                    value: /^[a-zа-яёіA-ZА-ЯЇЁ]+$/,
                                    message: "Dont valid surname?"
                                },
                                maxLength: {
                                    value: 100,
                                    message: "too long surname, try again"
                                }
                            })}/>
                            {error ? error.surname && error.surname.map((obj,index)=><div key={index} className="error">{obj}</div>):errors && errors.surname && <div className="error">{errors.surname.message}</div>}
                        </div>
                        <div className="input-container">
                            <select className="inp" {...register("course")}>
                                <option value=""> </option>
                                <option value="FS">FS</option>
                                <option value="QACX">QACX</option>
                                <option value="JCX">JCX</option>
                                <option value="FE">FE</option>
                                <option value="PCX">PCX</option>
                                <option value="JSCX">JSCX</option>
                            </select>
                        </div>
                        <div className="input-container">
                            <select className="inp" {...register("group")}>
                                {results && results.map((element,index)=><option key={index} value={element.id}>{element.name}</option>)}

                            </select>
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="phone" {...register("phone",{
                                pattern: {
                                    value: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
                                    message: "Dont valid phone?"
                                },
                            })}/>
                            {renderErrorMessage("phone")}
                        </div>
                        <div className="input-container">
                            <select className="inp" {...register("status")}>
                                <option value=""> </option>
                                <option value="В работе">В работе</option>
                                <option value="Согласен">Согласен</option>
                                <option value="Не согласен">Не согласен</option>
                                <option value="Дубляж">Дубляж</option>
                                <option value="Новый">Новый</option>
                            </select>
                        </div>
                        <div className="button-container">
                            <button>Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <button onClick={() => {
                navigate(-1)
            }}>Back to table
            </button>
            <button onClick={groupHandle}>Create Group</button>
            <br/>
            {visible && <form onSubmit={handleSubmit2(createGroup)}>
                <input type="text" placeholder="name" {...register2("name")}/>
                <button>create</button>
            </form>}

        </div>
    );
}