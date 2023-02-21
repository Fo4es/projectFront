import {useState} from "react";
import Onetd from "../Subelement/Onetd";
import EventHandler from "bootstrap/js/src/dom/event-handler";
import TableComponent from "./TableComponent";

export default function TableBody({tableData,columns}){



    return(
        <tbody>
        {tableData && tableData.map((data)=><TableComponent data={data} columns={columns}/>)}

        </tbody>
    );
}

// const [showResults, setShowResults] = useState(false)
//     const handleClick = () => {
//         if (showResults === false) {
//             setShowResults(true);
//         } else {
//             setShowResults(false);
//         }
//     }
// {tableData && tableData.map((items) => {
//             return (
//                 <tr key={items.id} onClick={handleClick}>
//                     {columns && columns.map(({ accessor }) => {
//                         const tData = items[accessor] ? items[accessor] : "——";
//                         return <td key={accessor}>{tData} <Onetd/></td>
//
//                     })}
//                 </tr>
//
//             );
//         })}
//         <div>
//             {showResults ? <Onetd />:null}
//         </div>