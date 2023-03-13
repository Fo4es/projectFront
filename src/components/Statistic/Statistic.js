export default function Statistic({data}){

    const {statuses} = data

    return(
        <div>
            {statuses && statuses.map((element,index)=><div key={index}>{element.status}-{element.count}</div>)}
        </div>
    );
}