export default function TableData({data,accessor}){
    return(
        <td>
            {
                data[accessor]
            }
        </td>
    );
}