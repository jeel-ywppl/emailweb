import {Routes, Route} from "react-router-dom";
import routes from "../routes";
import Sidenav from "../layout/Sidenav";
import DashboardNavbar from "../layout/dashboard-navbar";
import {useAppSelector, useAppDispatch} from "../store";
import {logoutUserFromLoacal} from "../store/auth/authSlice";

export function Dashboard() {
    const {user} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    console.log("useruser", user , );

    const onLogout = () => {
        dispatch(logoutUserFromLoacal());
    };

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav routes={routes} />
            <div className="p-4 xl:ml-[16rem]">
                <DashboardNavbar onLogout={onLogout} />
                <Routes>
                    {routes.map(
                        ({layout, pages}) =>
                            layout === "dashboard" &&
                            pages.map(
                                ({path, element, roles, name}) =>
                                    user?.permissions?.find((x) => x.model === name)?.view && (
                                        <Route key={path} exact path={path} element={element} />
                                    ),
                            ),
                    )}
                </Routes>
            </div>
        </div>
    );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
