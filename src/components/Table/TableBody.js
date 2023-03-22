import TableComponent from "./TableComponent";

export default function TableBody({tableData,columns,setChange,change}){

    return(
        <tbody>
        {tableData && tableData.map((data,index)=><TableComponent key={index} data={data} columns={columns} setChange={setChange} change={change}/>)}
        </tbody>
    );
}

