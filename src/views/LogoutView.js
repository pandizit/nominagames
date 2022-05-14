import { Button, message, PageHeader } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sessionService } from "redux-react-session";
import { clearUser } from "../redux/reducers/UserReducer";


function LogoutView(){

    const dispatch = useDispatch();
    const nav = useNavigate();

    const logout = () => {
        sessionService.deleteUser().then(e=>{
            dispatch(clearUser());
            message.warning('Logout Berhasil !');
            setTimeout(()=>{
                nav('/');
            }, 1000);
        });    
    }

    return(
        <>
        <PageHeader title='Confirm Logout ?' />
        <div className="text-center"><Button onClick={logout} type='primary'>Yes Logout</Button></div>
        </>
    );
}

export default LogoutView;