import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {paidActions} from "../../redux/slice/paid.slice";
import {axiosService} from "../../services/axios.service";

export default function Form({searchParams,setSearchParams}){

    const dispatch = useDispatch();

    const arr = ['name','age','surname','email','course','status','course_format','course_type','group','start_date','end_date'];


    const {group} = useSelector(state => state.group);

    const {results} = group;

    useEffect(()=>{
        dispatch(paidActions.getGroup());
    },[dispatch]);

    const handleChange = (e)=>{
        if(e.target.value){
            searchParams.set(e.target.name,e.target.value);
            searchParams.set("page",1);
            setSearchParams(searchParams);
        }else{
            searchParams.delete(e.target.name);
            setSearchParams(searchParams)
        }
    }

    const reset = ()=>{
        // eslint-disable-next-line
        arr.map(element=>{
            if(searchParams.get(element)){
                searchParams.delete(element)
                setSearchParams(searchParams)
            }
        })
    }


    const handleDownload = async () => {
        try {
            // Send a request to the backend to generate the Excel file
            const response = await axiosService.get('http://127.0.0.1:8000/api/v1/orders/excel', {
                responseType: 'blob' // Set the response type to 'blob' to handle binary data
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

            // Create a download link element
            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = '<excel>.xls'; // Set the desired filename for the downloaded file
            downloadLink.click();

        } catch (error) {
            console.error('Error downloading Excel file:', error);
        }
    };




    return(
        <div>
            <form >
                <input className="inp" type="type" name="name"  placeholder={'Name'}  onChange={handleChange}/>
                <input className="inp" type="type" name="surname"  placeholder={'Surname'}  onChange={handleChange}/>
                <input className="inp" type="text" placeholder={'Email'} name="email" onChange={handleChange}/>
                <input className="inp" type="text" placeholder={'Age'} name="age" onChange={handleChange}/>

                <select className="inp" name="course"  onChange={handleChange} defaultValue={""}>
                    <option value="" >Course</option>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JCX">JCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                    <option value="JSCX">JSCX</option>
                </select>
                <select className="inp" name="status" onChange={handleChange} defaultValue={''}>
                    <option value="" >Status </option>
                    <option value="Согласен">Согласен</option>
                    <option value="Не согласен">Не согласен</option>
                    <option value="Дубляж">Дубляж</option>
                    <option value="В работе">В работе</option>
                    <option value="Новый">Новый</option>
                </select>

                <select className="inp" name="course_format" onChange={handleChange} defaultValue={''}>
                    <option value="" >Course Format </option>
                    <option value="online">online</option>
                    <option value="static">static</option>
                </select>

                <select className="inp" name="course_type" onChange={handleChange} defaultValue={''}>
                    <option value="" >Course Type </option>
                    <option value="incubator">incubator</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="pro">pro</option>
                    <option value="vip">vip</option>
                </select>

                <select className="inp" name="group" onChange={handleChange} defaultValue={''}>
                    <option value="" >Group </option>
                    {results && results.map((element,index)=><option key={index} value={element.name}>{element.name}</option> )}
                </select>


                <input type="date" name="start_date" onPointerLeave={handleChange}/>
                <input type="date" name="end_date" onPointerLeave={handleChange}/>



                <input type="reset" name="reset" onClick={reset}/>
            </form>
            <button onClick={handleDownload}>excel</button>


        </div>
    );
}