import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import Table from "../Table/Table";
import {paidActions} from "../../redux/slice/paid.slice";
import Form from "../Forms/Forms";
import NameUser from "../NameUser/NameUser";


export default function Paid(){

    const [searchParams,setSearchParams] = useSearchParams({order:'id'});
    const nameQuery = searchParams.get('name') || '';
    const surnameQuery = searchParams.get('surname') || '';
    const emailQuery = searchParams.get('email') ||  '';
    const ageQuery = searchParams.get('age') || '';

    const {paid} = useSelector(state => state.paid);

    const {results} = paid;

    const dispatch = useDispatch();

    const [query,setQuery] = useSearchParams({page: '1'});

    useEffect(()=>{
        dispatch(paidActions.usersMy())
    },[])

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
                order:searchParams.get('order')
            }))
        },1000)
        return ()=> clearTimeout(delay)
    },[query,dispatch])

    const prevPage = () => {
        const page = +query.get('page')-1;
        query.set("page",page);
        setQuery(query);
    };

    const nextPage = () => {
        const page = +query.get('page')+1;
        query.set("page",page);
        setQuery(query);
    };

    const search = (results)=>{
        return results && results.filter(
            (obj)=>
                obj.name.toLowerCase().includes(nameQuery) &&
                obj.surname.toLowerCase().includes(surnameQuery)&&
                obj.email.toLowerCase().includes(emailQuery) &&
                obj.age.toString().includes(ageQuery)
        )
    }

    return(
        <div>
            <NameUser/>
        <div className="table_container">
            <Form searchParams={searchParams} setSearchParams={setSearchParams}/>
            <Table items={search(results)} search={searchParams} setSearch={setSearchParams}/>
            <button className={'buttonPage'}  onClick={prevPage}>Prev</button>
            <button className={'buttonPage'} onClick={nextPage}>Next</button>
        </div>
        </div>
    );
}