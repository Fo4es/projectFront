import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import Table from "../Table/Table";
import {paidActions} from "../../redux/slice/paid.slice";
import Form from "../Forms/Forms";
import Header from "../../pages/Header";
import './style.css'


export default function Paid(){

    const [searchParams,setSearchParams] = useSearchParams({order:'-id'});

    const [change,setChange] = useState(false);


    const {paid,prev,next} = useSelector(state => state.paid);

    const {results} = paid;


    const dispatch = useDispatch();

    const [query,setQuery] = useSearchParams({page: '1',size:'10'});

    // let [size,setSize] = useState(10*query.get('page'));

    useEffect(()=>{
        const delay = setTimeout(()=>{
            dispatch(paidActions.getAll({
                page:query.get('page'),
                name:searchParams.get('name'),
                surname:searchParams.get('surname'),
                email:searchParams.get('email'),
                age:searchParams.get('age'),
                course:searchParams.get('course'),
                status:searchParams.get('status'),
                course_format:searchParams.get('course_format'),
                course_type:searchParams.get('course_type'),
                order:searchParams.get('order'),
                size:query.get('size'),
                start_date:searchParams.get('start_date'),
                group:searchParams.get('group'),
                end_date:searchParams.get('end_date'),
            }))
        },500)
        return ()=> clearTimeout(delay)
    },[query,dispatch,change,searchParams])

    const prevPage = () => {
        const page = +query.get('page')-1;
        query.set("page",page);
        setQuery(query);
        // setSize(size=10*query.get('page'));
    };

    const nextPage = () => {
        const page = +query.get('page')+1;
        query.set("page",page);
        setQuery(query);
        // setSize(size=10*query.get('page'));
    };


    return(
        <div>
            <Header/>
            <div className="table_container">
                <Form searchParams={searchParams} setSearchParams={setSearchParams}/>
                <Table items={results} search={searchParams} setSearch={setSearchParams} setChange={setChange} change={change}/>
                <div className="pagination">
                    <button className={'buttonPage'} disabled={!prev}  onClick={prevPage}>Prev</button>
                    <button className={'buttonPage'} disabled={!next} onClick={nextPage}>Next</button>
                    <div>items for page: {query.get('size')}         {paid.count ? `${query.get('page')} page`:0} of {paid.count}</div>

                </div>
            </div>
        </div>
    );
}