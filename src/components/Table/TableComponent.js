import React, {useState} from "react";

import TableData from "./TableData";
import Comments from "./Comments";
export default function TableComponent({data,columns,setChange,change}){

    const [isSubComponentVisible,setisSubComponentVisible] = useState(false);

    function toggleSubComponent() {
            setisSubComponentVisible(!isSubComponentVisible);
            setChange(!change);

    }
    return(
        <React.Fragment>
            <tr onClick={toggleSubComponent}>
                {columns && columns.map(({accessor},index)=><TableData key={index} data={data} accessor={accessor} />)}
            </tr>
            {
                isSubComponentVisible && <Comments key={data.id} data={data} setChange={setChange} change={change}/>
            }
        </React.Fragment>
    );
}