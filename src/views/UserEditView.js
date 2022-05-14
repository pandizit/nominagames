import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";

function UserEditView(){

    const nav = useNavigate();

    return(
        <>
        <PageHeader title='Edit User' onBack={()=>{ nav(-1) }} />
        </>
    );
}

export default UserEditView;