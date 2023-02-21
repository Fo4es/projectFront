import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {paidActions} from "../../redux/slice/paid.slice";

export default function Comments({data}){
    const {handleSubmit,register} = useForm();
    const {comments,id} = data;
    const dispatch = useDispatch();
    const submit = async (data)=> {
        await dispatch(paidActions.patchComent({id: id, comments:data}))

    }

    return(
        <tr>
            <td>
            {comments && comments.map(comment=> <div>{comment.comment}</div>)}
                <form onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder={'comment'} {...register('comment')}/>
                    <button>ok</button>
                </form>
            </td>
        </tr>
    );
}