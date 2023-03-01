import {useDispatch, useSelector} from "react-redux";

import {paidActions} from "../../redux/slice/paid.slice";

export default function Admin({user}){
    const {id,email,profile,is_active} = user;

    const {token} = useSelector(state => state.token);

    const dispatch = useDispatch();

    const submit = async ()=> {
       await dispatch(paidActions.activateUser({id:id}))
       navigator.clipboard.writeText(`http://localhost:3000/activate/${token}`);
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
            is_active-{is_active}
            <br/>
            <button onClick={submit}>{token ? "Copy":"Activate"}</button>
            <hr/>
        </div>
    );
}