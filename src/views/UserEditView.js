import { Button, Checkbox, Form, Input, InputNumber, message, PageHeader } from "antd";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Globalvar from "../Globalvar";

function UserEditView(){

    const nav = useNavigate();
    const param = useParams();
    const ref = useRef();
    const [hobby, setHobby] = useState([]);
    const hobby_list = hobby.map( (e,i)=>(
        <Checkbox value={e['id']} onChange={f=>{ hobby[i]['checked'] = f.target.checked; setHobby([...hobby]) }} checked={ JSON.parse(e['checked'])}>{e['name']}</Checkbox>
    ));

    const finish = e => {
        e['id'] = param.id;
        e['hobby'] = JSON.stringify(hobby);
        axios.post(Globalvar.app_url+'/user/edit', e).then(res=>{
            console.log(res.data);
            if(res.data.status===1){
                message.success(res.data.message);
            } else {
                message.warning(res.data.message);
            }
        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }

    function findArray(array, id) {
        let cek = array.filter((element) => {
            return element.idhobby === id;
        })
        if(cek.length>0){
            return true;
        } else {
            return false;
        }
    }

    function isihoby(arr){
        axios(Globalvar.app_url+'/hobby/list_active').then(res2=>{
                
            let json2 = res2.data;
            for(let a=0; a<json2.length; a++){
                json2[a]['checked'] = findArray(arr, json2[a]['id']);
            }
            setHobby(json2);

        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }

    useEffect(()=>{
        axios(Globalvar.app_url+'/user/info/'+param.id).then(res=>{
            let json = res.data;
            ref.current.setFieldsValue({
                'firstname': json['firstname'],
                'lastname': json['lastname'],
                'age': json['age'],
                'email': json['email'],
            });

            axios(Globalvar.app_url+'/user/hobby/'+param.id).then(res2=>{
                let json2 = res2.data;
                isihoby(json2);
                
            }).catch(res=>{
                message.error(res.response.data.message);
            }); 

        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }, []);

    return(
        <>
        <PageHeader title='Edit User' onBack={()=>{ nav(-1) }} />
        <Form onFinish={finish} layout="vertical" ref={ref}>
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
            <Form.Item label='Age' name='age'>
                <InputNumber min={0} className='w-100' />
            </Form.Item>
            <Form.Item label='Email' name='email' rules={[{required: true, message: 'Email tidak boleh kosong !'}]}>
                <Input type='email' />
            </Form.Item>
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

export default UserEditView;