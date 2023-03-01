import TableComponent from "./TableComponent";

export default function TableBody({tableData,columns}){

    return(
        <tbody>
        {tableData && tableData.map((data,index)=><TableComponent key={index} data={data} columns={columns}/>)}
        </tbody>
    );
}

