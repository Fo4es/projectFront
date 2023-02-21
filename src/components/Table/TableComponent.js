import TableData from "./TableData";
import React, {useState} from "react";
import Comments from "./Comments";
import {useDispatch} from "react-redux";
export default function TableComponent({data,columns}){

    const [isSubComponentVisible,setisSubComponentVisible] = useState(false);

    function toggleSubComponent() {
        setisSubComponentVisible(!isSubComponentVisible)
    }
    return(
        <React.Fragment>
        <tr onClick={toggleSubComponent}>
            {columns && columns.map(({accessor})=><TableData data={data} accessor={accessor}/>)}
        </tr>
            {
                isSubComponentVisible && <Comments data={data}/>
            }
        </React.Fragment>
    );
}