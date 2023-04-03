import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import "./style.css"
import {adminActions} from "../../redux/slice/admin.slice";

export default function OrdersStatistic(){

    const {ordersStatistic} = useSelector(state => state.ordersStatistic);

    const dispatch = useDispatch();

    const {statuses,total_count} = ordersStatistic;

    useEffect(()=>{
        dispatch(adminActions.ordersStatistic())
    },[dispatch])


    return(
        <div>
            <div className='mainBlock'>Orders statistic</div>
            <div className="blockOrders">
                <div className='blockOrder'>total:{total_count}</div>
                {statuses && statuses.map((element,index)=><div className="blockOrder" key={index}>{element.status ? element.status: 'null'}:{element.count}</div>)}
            </div>
        </div>
    );
}