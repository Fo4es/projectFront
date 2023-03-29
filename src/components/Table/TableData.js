export default function TableData({data,accessor}){

    let tData;
    if(accessor ==='manager'){
        if(data['manager']){
            tData= data['manager']['name']
        }
    }
    else if(accessor ==='group') {
        if(data['group']){
            tData= data['group']['name']
        }
    }
    else{
        tData = data[accessor] ? data[accessor] : "——";
    }

    return(
        <td key={accessor}>
            {
                tData
            }
        </td>
    );
}