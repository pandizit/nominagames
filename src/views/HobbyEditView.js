import { Button, Form, Input, message, PageHeader, Radio } from "antd";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Globalvar from "../Globalvar";

function HobbyEditView(){

    const param = useParams();
    const nav = useNavigate();
    const ref = useRef();

    useEffect(()=>{
        axios(Globalvar.app_url+'/hobby/info/'+param.id).then(res=>{
            let json = res.data;
            ref.current.setFieldsValue({
                name: json['name'],
                active: json['active'],
            });
        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }, []);

    const finish = e => {
        e['id'] = param.id;
        axios.post(Globalvar.app_url+'/hobby/edit', e).then(res=>{
            if(res.data.status===1){
                message.success(res.data.message);
                setTimeout(()=>{
                    nav('/hobby');
                }, 1000);
            } else {
                message.warning(res.data.message);
            }
        }).catch(res=>{
            message.error(res.response.data.message);
        });
    }

    return(
        <>
        <PageHeader title='Edit Hobby' onBack={()=>{ nav(-1) }} />
        <Form layout="vertical" ref={ref} onFinish={finish}>
            <Form.Item name='name' label='Name'>
                <Input />
            </Form.Item>
            <Form.Item name='active' label='Active'>
                <Radio.Group>
                    <Radio value='true'>Active</Radio>
                    <Radio value='false'>Inactive</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
            </Form.Item>
        </Form>
        </>
    );
}

export default HobbyEditView;