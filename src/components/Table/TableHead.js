import {useState} from "react";

export default function TableHead({columns,setSearch,search}){

    const [sort,setSort] = useState('');

    function sortOrder(e) {
        const element = e && e.target.getAttribute('data-item');
        if(element){
            setSearch({order:`${sort}${element}`});
            console.log(search.get('order'));
            if(sort===''){
                setSort('-');
            }else{
                setSort('');
            }
        }else{
            search.delete('order');
        }
    }

    return(
        <thead >
        <tr>
        {columns && columns.map(({ label, accessor }) =>
            <th key={accessor}  data-item={accessor} onClick={sortOrder}>{label}</th>
        )}
        </tr>
        </thead>
    );
}