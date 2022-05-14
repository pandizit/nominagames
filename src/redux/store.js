import { configureStore } from "@reduxjs/toolkit";
import { sessionReducer } from "redux-react-session";
import UserReducer from "./reducers/UserReducer";



export const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: UserReducer
    }
});