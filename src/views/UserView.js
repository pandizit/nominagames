import { Button, PageHeader, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Globalvar from "../Globalvar";

function UserView(){

    const [users, setUsers] = useState([]);
    const column = [
        {title: 'First Name', dataIndex: 'firstname'},
        {title: 'Last Name', dataIndex: 'lastname'},
        {title: 'Age', render: e=>( e['age'] + ' Year' )},
        {title: 'Option', render: e=>(
            <Link to={'/user/edit/'+e['id']}><Button size="small" type="dashed">Edit</Button></Link>
        )}
    ]

    useEffect(()=>{
        axios(Globalvar.app_url+'/user').then(res=>{
            setUsers(res.data);
        }).catch();
    }, []);

    return(
        <>
        <PageHeader title='Users' extra={<Link to='/user/add'><Button type="primary">Add</Button></Link>} />
        <Table dataSource={users} columns={column} />
        </>
    );
}

export default UserView;