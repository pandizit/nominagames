import { Form, Input, PageHeader, Button, message, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Globalvar from "../Globalvar";

function UserAddView(){

    const nav = useNavigate();
    const [hobby, setHobby] = useState([]);
    const hobby_list = hobby.map( (e,i)=>(
            <Checkbox value={e['id']} onChange={f=>{ hobby[i]['checked'] = f.target.checked; setHobby([...hobby]) }} checked={ JSON.parse(e['checked'])}>{e['name']}</Checkbox>
        )
    );

    const finish = e => {
        if(e['password']!==e['password2']){
            message.error('Password Tidak Sama !');
        } else {
            e['hobby'] = JSON.stringify(hobby);
            axios.post(Globalvar.app_url+'/user/add', e).then(res=>{
                //console.log(res.data);
                if(res.data.status===1){
                    message.success(res.data.message);
                    setTimeout(()=>{
                        nav('/');
                    }, 1000);
                } else {
                    message.warning(res.data.message);
                }
            }).catch(res=>{
                message.error(res.response.data.message);
            });
        }
    }

    useEffect(()=>{
        axios(Globalvar.app_url+'/hobby/list_active').then(res=>{
            let json = res.data;
            for(let a=0; a<json.length; a++){
                json[a]['checked'] = false;
            }
            setHobby(json);
        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }, []);

    return(
        <>
        <PageHeader title='User Add' onBack={()=>{ nav(-1) }} />
        <Form layout="vertical" onFinish={finish}>
            <div className="row">
                <div className="col-md-6 col-12">
                    <Form.Item label='First Name' name='firstname' rules={[{required: true, message: 'First Name tidak boleh kosong !'}]}>
                        <Input />
                    </Form.Item>
                </div>
                <div className="col-md-6 col-12">
                    <Form.Item label='Last Name' name='lastname' rules={[{required: true, message: 'Last Name tidak boleh kosong !'}]} >
                        <Input />
                    </Form.Item>
                </div>
            </div>
            <Form.Item label='Email' name='email' rules={[{required: true, message: 'Email tidak boleh kosong !'}]}>
                <Input type='email' />
            </Form.Item>
            <div className="row">
                <div className="col-md-6 col-12">
                    <Form.Item label='Password' name='password' rules={[{required: true, message: 'Password tidak boleh kosong !'}]}>
                        <Input.Password />
                    </Form.Item>
                </div>
                <div className="col-md-6 col-12">
                    <Form.Item label='Ketik Ulang Password' name='password2' rules={[{required: true, message: 'Ketik ulang Password tidak boleh kosong !'}]} >
                        <Input.Password />
                    </Form.Item>
                </div>
            </div>
            <Form.Item label='Hobby'>
                {hobby_list}
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
        </>
    );
}

export default UserAddView;