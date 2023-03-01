export default function Form({searchParams,setSearchParams}){

    return(
        <div>
            <form >
                <input className="inp" type="type"  placeholder={'Name'} onChange={(e)=>{

                    if(e.target.value){
                        searchParams.set("name",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("name");
                        setSearchParams(searchParams)
                    }

                }}/>
                <input className="inp" type="text" placeholder={'Email'} name="email" onChange={(e)=>{
                    if(e.target.value){
                        searchParams.set("email",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("email");
                        setSearchParams(searchParams)
                    }
                }}/>
                <input className="inp" type="text" placeholder={'Age'} name="age" onChange={(e)=>{
                    if(e.target.value){
                        searchParams.set("age",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("age");
                        setSearchParams(searchParams)
                    }
                }}/>
                <select className="inp" onClick={(e)=>{
                    if(e.target.value){
                        searchParams.set("course",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("course");
                        setSearchParams(searchParams)
                    }
                }}>
                    <option value=""> </option>
                    <option value="FS">FS</option>
                    <option value="QACX">QACX</option>
                    <option value="JCX">JCX</option>
                    <option value="FE">FE</option>
                    <option value="PCX">PCX</option>
                    <option value="JSCX">JSCX</option>
                    <option value="" selected="selected" hidden="hidden">Course</option>
                </select>

                <select className="inp" onClick={(e)=>{
                    if(e.target.value){
                        searchParams.set("status",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("status");
                        setSearchParams(searchParams)
                    }
                }}>
                    <option value=""> </option>
                    <option value="Согласен">Согласен</option>
                    <option value="Не согласен">Не согласен</option>
                    <option value="Дубляж">Дубляж</option>
                    <option value="В работе">В работе</option>
                    <option value="Новый">Новый</option>
                    <option value="" selected="selected" hidden="hidden">Status</option>
                </select>

                <select className="inp" onClick={(e)=>{
                    if(e.target.value){
                        searchParams.set("course_format",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("course_format");
                        setSearchParams(searchParams)
                    }
                }}>
                    <option value=""> </option>
                    <option value="online">online</option>
                    <option value="static">static</option>
                    <option value="" selected="selected" hidden="hidden">Course Format</option>
                </select>
                <select className="inp" onClick={(e)=>{
                    if(e.target.value){
                        searchParams.set("course_type",e.target.value);
                        setSearchParams(searchParams)
                    }else{
                        searchParams.delete("course_type");
                        setSearchParams(searchParams)
                    }
                }}>
                    <option value=""> </option>
                    <option value="incubator">incubator</option>
                    <option value="minimal">minimal</option>
                    <option value="premium">premium</option>
                    <option value="pro">pro</option>
                    <option value="vip">vip</option>
                    <option value="" selected="selected" hidden="hidden">Course Type</option>
                </select>
            </form>

        </div>
    );
}