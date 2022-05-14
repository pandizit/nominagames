import { Form, Input, InputNumber, PageHeader, Button, message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionService } from "redux-react-session";
import Globalvar from "../Globalvar";
import { setUser } from "../redux/reducers/UserReducer";

function RegisterView(){

    const nav = useNavigate();
    const dispatch = useDispatch();
    const finish = e => {        
        if(e['password']!==e['password2']){
            message.error('Password Tidak Sama !');
        } else {
            axios.post(Globalvar.app_url+'/user/register', e).then(res=>{
                if(res.data.status===1){
                    message.success(res.data.message);
                    let user = res.data.user;
                    sessionService.saveUser(user).then(()=>{
                        setTimeout(()=>{
                            dispatch(setUser(user));
                            nav('/');
                        }, 2000);
                    });
                    
                } else {
                    message.warning(res.data.message);
                }
            }).catch(res=>{
                message.error(res.response.data.message);
            });
        }
    }

    return(
        <>
        <PageHeader title='Register' onBack={()=>{ nav(-1) }} />
        <Form onFinish={finish} layout="vertical">
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
            <Form.Item>
                <Button type='primary' htmlType="submit">Register</Button>
            </Form.Item>
        </Form>
        </>
    );
}

export default RegisterView;