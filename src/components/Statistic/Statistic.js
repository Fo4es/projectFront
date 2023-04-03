import {useSelector} from "react-redux";

export default function Statistic(){

    const {statistic} = useSelector(state => state.statistic);

    return(
        <>
            {statistic.total_count !== 0 ? statistic.statuses && statistic.statuses.map((element,index)=><div key={index}>{element.status}-{element.count}</div>): 'No statistic was found'}
        </>
    );
}