import {useDispatch, useSelector} from "react-redux";

import {paidActions} from "../../redux/slice/paid.slice";
import {useState} from "react";
import Statistic from "../Statistic/Statistic";

export default function Admin({user}){

    const {statistic} = useSelector(state => state.statistic);

    const {id,email,profile,is_active} = user;

    const [show,setShow] = useState('Activate');

    const [visible,setVisible] = useState(false);

    const {token} = useSelector(state => state.token);

    const dispatch = useDispatch();

    const submit = async ()=> {
        await dispatch(paidActions.activateUser({id:id}))
        navigator.clipboard.writeText(`http://localhost:3000/activate/${token}`);
        setShow('Copy');
    }
    const submit1 = async ()=> {
        await dispatch(paidActions.userStatistic({id: id}));
        setVisible(!visible);
    }
    const submit2 = async ()=> {
        await dispatch(paidActions.banUser({id: id,select:is_active ? 'ban' : 'unban'}));
        window.location.reload(false)
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
            <button onClick={submit1}>statistic</button>
            <button onClick={submit2}>{is_active ? 'Block' : 'Unblock'}</button>
            {
                visible && <Statistic data={statistic}/>
            }
            <hr/>
        </div>
    );
}