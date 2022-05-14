import { Button, Divider, Form, Input, message, PageHeader } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sessionService } from "redux-react-session";
import Globalvar from "../Globalvar";
import { setUser } from "../redux/reducers/UserReducer";

function LoginView(){

    const nav = useNavigate();
    const dispatch = useDispatch();

    const finish = e => {
        axios.post(Globalvar.app_url+'/user/login', e).then(res=>{
            if(res.data.status===1){
                message.success(res.data.message);
                sessionService.saveUser(res.data.user).then(()=>{
                    setTimeout(()=>{
                        dispatch(setUser(res.data.user));
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

    return(
        <>
        <PageHeader title='Login' />
        <div className="row">
            <div className="col-md-6 col-12">
                <Form layout='vertical' onFinish={finish}>
                    <Form.Item name='email' label='Email' rules={[{required: true, message: 'Email tidak boleh kosong !'}]}>
                        <Input allowClear type='email' />
                    </Form.Item>
                    <Form.Item name='password' label='Password' rules={[{required: true, message: 'Password tidak boleh kosong !'}]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Login</Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="col-md-6 col-12 text-center">
                Atau Register disini:<br /><br />
                <Link to='/register'><Button type="primary">Register</Button></Link>
            </div>
        </div>
        
        </>
    );
}

export default LoginView;