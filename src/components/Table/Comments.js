import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {paidActions} from "../../redux/slice/paid.slice";
import {useEffect, useState} from "react";
import {authServices} from "../../services/auth.service";

export default function Comments({data,setChange,change}){
    const {handleSubmit,register,setValue} = useForm();
    const navigate = useNavigate();
    const {id,manager,comments} = data;
    const user = JSON.parse(authServices.getUser());
    const dispatch = useDispatch();
    const [block,setBlock] = useState(true);

    // const {comments} = useSelector(state => state.comments);

    useEffect(()=>{
        // dispatch(paidActions.getComments({id}));
        if(manager){
            if(manager.name === user.profile.name){
                setBlock(false);
            }
        }else{
            setBlock(false);
        }
    },[block,manager,user.profile.name])

    const submit = async (comment)=> {
        await dispatch(paidActions.createComments({id: id, comment: comment}))
        setValue('comment','');
        setChange(!change);
    }
    return(
        <tr>
            <td>
                {comments && comments.map((comment,index)=> <div key={index}>{comment.comment}</div>)}
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder={'comment'} {...register('comment')}/>
                    <button disabled={block}>ok</button>
                </form>
                <button disabled={block} onClick={()=>{
                    dispatch(paidActions.setUserForUpdate(data))
                    navigate('/edit',{state:{id:id.toString()}})
                }}>Edit</button>
            </td>
        </tr>
    );
}