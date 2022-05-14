import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, message, PageHeader, Table, Tooltip } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Globalvar from "../Globalvar";

function HobbyView(){


    const [hobby, setHobby] = useState([]);
    const column = [
        {title: 'Name', dataIndex: 'name'},
        {title: 'Active', render: e=>(
            e['active']==='true' ? <><FontAwesomeIcon icon={faCheck} color='green' /></> : <><FontAwesomeIcon icon={faTimes} color='red' /></>
        )},
        {title: 'Options', render: e=>(
            <Tooltip title='Ubah Hobi'><Link to={'/hobby/edit/'+e['id']}><Button size="small" type="dashed">Edit</Button></Link></Tooltip>
        )}
    ]

    useEffect(()=>{
        axios(Globalvar.app_url+'/hobby/list').then(res=>{
            setHobby(res.data);
        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }, []);

    return(
        <>
        <PageHeader title='Hobby' extra={ <Link to='/hobby/add'><Button type='primary'>Add</Button></Link> } />
        <Table dataSource={hobby} columns={column} />
        </>
    );
}

export default HobbyView;