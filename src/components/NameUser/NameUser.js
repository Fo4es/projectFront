import {useNavigate} from "react-router-dom";

import {authServices} from "../../services/auth.service";


export default function NameUser(){

    const user = JSON.parse(authServices.getUser())

    const {profile} = user;

    const navigate = useNavigate();
    function submit() {
        navigate('/admin')
    }

    return(
        <div>
            {profile.name}
            {profile.name ==='admin' ? <button onClick={submit}>{profile.name}</button>:null}
        </div>
    );
}