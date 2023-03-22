export default function TableData({data,accessor}){

    let tData;
    if(accessor ==='managerName'){
        if(data['manager']){
            tData= data['manager']['name']
        }
    }
    else if(accessor ==='groupName') {
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