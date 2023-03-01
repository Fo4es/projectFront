import React, {useState} from "react";

import TableData from "./TableData";
import Comments from "./Comments";
export default function TableComponent({data,columns}){

    const [isSubComponentVisible,setisSubComponentVisible] = useState(false);

    function toggleSubComponent() {
        setisSubComponentVisible(!isSubComponentVisible)
    }
    return(
        <React.Fragment>
        <tr onClick={toggleSubComponent}>
            {columns && columns.map(({accessor},index)=><TableData key={index} data={data} accessor={accessor} />)}
        </tr>
            {
                isSubComponentVisible && <Comments data={data}/>
            }
        </React.Fragment>
    );
}