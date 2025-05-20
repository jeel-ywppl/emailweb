import {Routes, Route} from "react-router-dom";
import routes from "../routes";
import Sidenav from "../layout/Sidenav";
import DashboardNavbar from "../layout/dashboard-navbar";
import {useAppSelector, useAppDispatch} from "../store";
import {logoutUserFromLoacal} from "../store/auth/authSlice";
import {setOpenConfigurator, useMaterialTailwindController} from "../context";
import Configurator from "../layout/Configurator";
import {IconButton} from "@material-tailwind/react";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";

export function Dashboard() {
    const [controller, contextDispatch] = useMaterialTailwindController();
    const {sidenavType} = controller;

    const {user} = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch(logoutUserFromLoacal());
    };

    return (
        <div className="min-h-screen bg-blue-gray-50/50">
            <Sidenav
                routes={routes}
                brandImg={sidenavType === "dark" ? "/imgs/innvox01.png" : "/imgs/innvox0101.png"}
            />
            <div className="p-4 xl:ml-[16rem]">
                <DashboardNavbar onLogout={onLogout} />
                <Configurator />
                <IconButton
                    size="lg"
                    color="white"
                    className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
                    ripple={false}
                    onClick={() => setOpenConfigurator(contextDispatch, true)}
                >
                    <Cog6ToothIcon className="h-5 w-5" />
                </IconButton>
                <Routes>
                    {routes.map(
                        ({layout, pages}) =>
                            layout === "dashboard" &&
                            pages.map(
                                ({path, element, name}) =>
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
