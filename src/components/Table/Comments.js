import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import {paidActions} from "../../redux/slice/paid.slice";

export default function Comments({data}){
    const {handleSubmit,register} = useForm();
    const navigate = useNavigate();
    const {comments,id} = data;
    const dispatch = useDispatch();

    const submit = async (comments)=> {
      await dispatch(paidActions.patchComent({id: id, element: {comments}}));
    }

    return(
        <tr>
            <td>
            {comments && comments.map(comment=> <div>{comment.comment}</div>)}
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder={'comment'} {...register('comment')}/>
                    <button>ok</button>
                </form>
                <button onClick={()=>{
                    dispatch(paidActions.setUserForUpdate(data))
                    navigate('/edit',{state:{id:id.toString()}})
                }}>Edit</button>
            </td>
        </tr>
    );
}