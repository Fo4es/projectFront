import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";

import {paidActions} from "../redux/slice/paid.slice";

export default function EditPage() {

    const {register, setValue, handleSubmit,getValues} = useForm();

    const {register:register2,handleSubmit: handleSubmit2} = useForm();

    const {userForUpdate,error} = useSelector(state => state.paid);

    const {group} = useSelector(state => state.group);


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
        await dispatch(paidActions.patchComent({id: state.id, element: data}));
    }
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
                            <input type="text" placeholder="name" {...register("name")}/>
                            {renderErrorMessage("name")}
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="email" {...register("email")}/>
                            {renderErrorMessage("email")}
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="surname" {...register("surname")}/>
                            {renderErrorMessage("surname")}
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
                            <input type="text" placeholder="phone" {...register("phone")}/>
                            {renderErrorMessage("phone")}
                        </div>
                        <div className="input-container">
                            <input type="text" placeholder="status" {...register("status")}/>
                            {renderErrorMessage("status")}
                        </div>
                        <div className="button-container">
                            <button>Update</button>
                        </div>
                    </form>
                </div>
            </div>
            <button onClick={() => {
                navigate('/paid')
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