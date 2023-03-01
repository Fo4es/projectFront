import {authServices} from "../../services/auth.service";

import {useNavigate} from "react-router-dom";

export default function NameUser(){

    const user = JSON.parse(authServices.getUser());

    const navigate = useNavigate();
    function submit() {
        navigate('/admin')
    }

    return(
        <div>
            {user.name}
            {user.name ==='admin' ? <button onClick={submit}>{user.name}</button>:null}
        </div>
    );
}