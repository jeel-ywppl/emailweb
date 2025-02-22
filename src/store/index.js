import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import authReducer from "./auth/authSlice";
import subDomainReducer from "./subDomain/subDomainSlice";
import userReducer from "./user/userSlice";
import emailReducer from "./email/emailSlice";


const reducers = {
    auth: authReducer,
    subDomain: subDomainReducer,
    user: userReducer,
    email: emailReducer,
};

export const rootReducer = combineReducers(reducers);

const resettableRootReducer = (state, action) => {
    if (action.type === "auth/logoutUser/fulfilled") {
        return rootReducer(undefined, action);
    }
    return rootReducer(state, action);
};

export const store = configureStore({
    reducer: resettableRootReducer,
});

export default store;

export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();
