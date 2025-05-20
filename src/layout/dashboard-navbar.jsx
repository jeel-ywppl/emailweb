import {useState} from "react";
import PropTypes from "prop-types";
import {useLocation, Link, useNavigate} from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Avatar,
    Breadcrumbs,
} from "@material-tailwind/react";
import {UserCircleIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon} from "@heroicons/react/24/solid";
import {useMaterialTailwindController, setOpenSidenav} from "../context/index";
import {useAppSelector} from "../store";
import NavUserModal from "../model/NavUserModal";
import {useDispatch} from "react-redux";
import {config} from "../utils/util";
import {logOutUser} from "../store/auth";

const DashboardNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [controller, dis] = useMaterialTailwindController();
    const {fixedNavbar, openSidenav} = controller;
    const {pathname} = useLocation();
    const [page, layout] = pathname.split("/").filter((el) => el !== "");
    const {accessToken, user: authUser} = useAppSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        await dispatch(logOutUser());
        localStorage.removeItem("sidenavColor");
        setIsModalOpen(false);
        navigate("/auth/sign-in");
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleToggleSidenav = () => setOpenSidenav(dis, !openSidenav);

    return (
        <Navbar
            color={fixedNavbar ? "white" : "transparent"}
            className={`rounded-xl transition-all ${
                fixedNavbar
                    ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
                    : "px-0 py-1"
            }`}
            fullWidth
            blurred={fixedNavbar}
        >
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={handleToggleSidenav}
                    >
                        {openSidenav ? (
                            <XMarkIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                        ) : (
                            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                        )}
                    </IconButton>
                    <div className="capitalize">
                        <Breadcrumbs
                            className={`bg-transparent p-0 transition-all ${
                                fixedNavbar ? "mt-1" : ""
                            }`}
                        >
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                {page}
                            </Typography>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
                            >
                                {layout}
                            </Typography>
                        </Breadcrumbs>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {accessToken ? (
                        <div className="relative flex items-center gap-2">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleOpenModal}
                            >
                                <div className="relative">
                                    {authUser?.avatar ? (
                                        <Avatar
                                            src={
                                                authUser?.avatar.startsWith("http")
                                                    ? authUser?.avatar
                                                    : `${config.BASE_URL}/${authUser?.avatar}`
                                            }
                                            alt={authUser?.fname}
                                            size="md"
                                            variant="rounded"
                                            className="rounded-full shadow-lg shadow-blue-gray-500/40"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 flex items-center justify-center rounded-lg shadow-lg shadow-blue-gray-500/40 bg-gray-200">
                                            <Typography variant="h6" color="blue-gray">
                                                {authUser?.fname?.charAt(0).toUpperCase()}
                                                {authUser?.lname?.charAt(0).toUpperCase()}
                                            </Typography>
                                        </div>
                                    )}
                                </div>
                                <div className="hidden md:flex flex-col">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-semibold"
                                    >
                                        {authUser.fname}
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="text-xs text-gray-500"
                                    >
                                        {authUser.email}
                                    </Typography>
                                </div>
                            </div>
                            <NavUserModal
                                isOpen={isModalOpen}
                                onClose={handleCloseModal}
                                user={authUser}
                                onLogout={handleLogout}
                            />
                        </div>
                    ) : (
                        <Link to="/auth/sign-in" className="flex items-center gap-2">
                            <Button
                                variant="text"
                                color="blue-gray"
                                className="hidden xl:flex normal-case"
                            >
                                <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
                                Sign In
                            </Button>
                            <IconButton variant="text" color="blue-gray" className="xl:hidden">
                                <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
                            </IconButton>
                        </Link>
                    )}
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => navigate("/dashboard/accountsettings")}
                    >
                        <Cog6ToothIcon className="h-8 w-8 text-blue-gray-500" />
                    </IconButton>
                </div>
            </div>
        </Navbar>
    );
};

DashboardNavbar.propTypes = {
    user: PropTypes.shape({
        avatar: PropTypes.string,
        fname: PropTypes.string.isRequired,
        lname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }),
    onLogout: PropTypes.func.isRequired,
};

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
