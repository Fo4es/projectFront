import {useNavigate} from "react-router-dom";

import {authServices} from "../../services/auth.service";


export default function NameUser(){

    const user = JSON.parse(authServices.getUser())

    const {name} = user;

    const navigate = useNavigate();
    function submit() {
        navigate('/admin')
    }

    return(
        <div>
            {name}
            {name ==='admin' ? <button onClick={submit}>{name}</button>:null}
        </div>
    );
}