import NameUser from "../components/NameUser/NameUser";
import {useNavigate} from "react-router-dom";
import {authServices} from "../services/auth.service";
import './page.css'

export default function Header(){

    let navigate = useNavigate();
    function handlSubmit() {
        authServices.deleteTokens();
        authServices.deleteUser();
        navigate('/login');
    }
    return(
        <div className='header'>
            <NameUser/>
            <button onClick={handlSubmit}>logout</button>
        </div>
    );
}