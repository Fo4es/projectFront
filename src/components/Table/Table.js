import TableHead from "./TableHead";
import TableBody from "./TableBody";
import './table.css'


export default function Table({items,search,setSearch}){

    const columns = [
        { label: "Name", accessor: "name" },
        { label: "Surname", accessor: "surname" },
        { label: "Email", accessor: "email" },
        { label: "Age", accessor: "age" },
        { label: "Course", accessor: "course" },
        { label: "Status", accessor: "status" },
        { label: "Course_Format", accessor: "course_format" },
        { label: "Course_Type", accessor: "course_type" },
        { label: "Manager", accessor: "manager.name" },
    ];

    return (
        <div>
            <table className="table">
                <TableHead columns={columns} search={search} setSearch={setSearch}/>
                <TableBody columns={columns} tableData={items}/>
            </table>
        </div>
    );
}
