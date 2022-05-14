import { Divider, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import { sessionService } from "redux-react-session";
import { setUser } from "./redux/reducers/UserReducer";
import HobbyAddView from "./views/HobbyAddView";
import HobbyEditView from "./views/HobbyEditView";
import HobbyView from "./views/HobbyView";
import LoginView from "./views/LoginView";
import LogoutView from "./views/LogoutView";
import RegisterView from "./views/RegisterView";
import UserAddView from "./views/UserAddView";
import UserEditView from "./views/UserEditView";
import UserView from "./views/UserView";

function App(){

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    sessionService.loadUser().then(e=>{
        dispatch(setUser(e));
    }).catch((e)=>{
        //console.log(e);
    });

    return(
        <div className="container">
            {user.id===0 ?
                <Routes>
                    <Route path="/" element={<LoginView />} />
                    <Route path="/register" element={<RegisterView />} />
                </Routes>
            :
                <>
                <Menu mode="horizontal">
                    <Menu.Item><Link to='/'>Users List</Link></Menu.Item>
                    <Menu.Item><Link to='/hobby'>Hobby</Link></Menu.Item>
                    
                    <Menu.Item><Link to='/logout'>Log Out</Link></Menu.Item>
                </Menu>
                <Routes>
                    <Route path="/" element={<UserView />} />

                    <Route path="/user/add" element={<UserAddView />} />
                    <Route path="/user/edit/:id" element={<UserEditView />} />

                    <Route path="/hobby" element={<HobbyView />} />
                    <Route path="/hobby/add" element={<HobbyAddView />} />
                    <Route path="/hobby/edit/:id" element={<HobbyEditView />} />

                    <Route path="/logout" element={<LogoutView />} />
                </Routes>
                </>
            }
        </div>
    );
}

export default App;