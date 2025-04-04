import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import authReducer from "./auth/authSlice";
import domainReducer from "./Domain/domainSlice";
import userReducer from "./user/userSlice";
import emailReducer from "./email/emailSlice";
import companyReducer from "./company/companySlice";
import backupReducer from "./backup/backupSlice";
import draftReducer from "./draft/draftSlice";
import roleReducer from "./roles/rolesSlice";
import permissionRedicers from "./permissions/permissionSlice";
import moduleRedicers from "./modules/modualSlice";

const reducers = {
    auth: authReducer,
    domain: domainReducer,
    user: userReducer,
    email: emailReducer,
    company: companyReducer,
    backup: backupReducer,
    draft: draftReducer,
    roles: roleReducer,
    permission: permissionRedicers,
    modules: moduleRedicers,
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
