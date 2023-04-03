import {useState} from "react";

export default function TableHead({columns,setSearch,search}){

    const [sort,setSort] = useState('');

    function sortOrder(e) {
        const element = e && e.target.getAttribute('data-item');
        if(element){
            search.set("order",`${sort}${element}`);
            search.set("page",1);
            setSearch(search);
            // setSearch({order:`${sort}${element}`});
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