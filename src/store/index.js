import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import authReducer from "./auth/authSlice";
import domainReducer from "./Domain/domainSlice";
import userReducer from "./user/userSlice";
import emailReducer from "./email/emailSlice";
import companyReducer from "./company/companySlice"


const reducers = {
    auth: authReducer,
    subDomain: domainReducer,
    user: userReducer,
    email: emailReducer,
    company: companyReducer,
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
