import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {adminActions} from "../../redux/slice/admin.slice";
import BasicModal from "../modal";

export default function Admin({user,setActive}){

    // let {statistic} = useSelector(state => state.statistic);

    const {id,email,profile,is_active} = user;

    const [show,setShow] = useState('Activate');

    const {token} = useSelector(state => state.token);

    const dispatch = useDispatch();

    const submit = async ()=> {
        await dispatch(adminActions.activateUser({id:id}))
        navigator.clipboard.writeText(`http://localhost:3000/activate/${token}`);
        setShow('Copy');
    }
    // const submit1 = async ()=> {
    //         await dispatch(adminActions.userStatistic({id: id}));
    //         // setVisible(!visible);
    // }
    const submit2 = async ()=> {
        await dispatch(adminActions.banUser({id: id,select:is_active ? 'ban' : 'unban'}));
        setActive(is_active)
        // window.location.reload(false)
    }

    return(
        <div>
            id-{id}
            <br/>
            name-{profile.name}
            <br/>
            surname-{profile.surname}
            <br/>
            email-{email}
            <br/>
            is_active-{is_active.toString()}
            <br/>
            <button onClick={submit}>{show}</button>
            <BasicModal id={id}/>
            <button onClick={submit2}>{is_active ? 'Block' : 'Unblock'}</button>
            {/*{*/}
            {/*}*/}
            <hr/>
        </div>
    );
}