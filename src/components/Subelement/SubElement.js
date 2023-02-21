import Onetd from "./Onetd";

export default function SubElement({showResults,items}){
    return(

        <div>
            {showResults ? <Onetd items={items}/>:null}
        </div>

    );
}