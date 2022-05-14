import { Button, Form, Input, message, PageHeader, Radio } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Globalvar from "../Globalvar";

function HobbyAddView(){

    const nav = useNavigate();

    const finish = e => {
        axios.post(Globalvar.app_url+'/hobby/add', e).then(res=>{
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
        <PageHeader title='Add New Hobby' onBack={()=>{ nav(-1) }} />
        <Form layout="vertical" onFinish={finish}>
            <Form.Item name='name' label='Name' rules={[{required: true, message: 'Nama Hobi tidak boleh kosong !'}]}>
                <Input />
            </Form.Item>
            <Form.Item name='active' label='Active' rules={[{required: true, message: 'Status Aktif tidak boleh kosong !'}]}>
                <Radio.Group>
                    <Radio value='true'>Active</Radio>
                    <Radio value='false'>Inactive</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">Save</Button>
            </Form.Item>
        </Form>
        </>
    );
}

export default HobbyAddView;