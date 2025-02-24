import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    Navbar,
    Typography,
    Button,
    IconButton,
    Avatar,
} from "@material-tailwind/react";
import { UserCircleIcon, Cog6ToothIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useMaterialTailwindController, setOpenSidenav } from "../context/index";
import { useAppSelector } from "../store";
import NavUserModal from "../model/NavUserModal";
import { useDispatch } from "react-redux";
import { logoutUserFromLoacal } from "../store/auth/authSlice";

const DashboardNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [controller, dis] = useMaterialTailwindController();
    const { fixedNavbar, openSidenav } = controller;
    const { pathname } = useLocation();
    const [ page] = pathname.split("/").filter((el) => el !== "");
    const { accessToken, user: authUser } = useAppSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logoutUserFromLoacal());
        setIsModalOpen(false);
    };

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const getInitials = (fname, lname) => {
        const firstInitial = fname?.charAt(0).toUpperCase() || "";
        const lastInitial = lname?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const handleToggleSidenav = () => setOpenSidenav(dis, !openSidenav);

    return (
        <Navbar className="rounded-xl transition-all w-full px-4 md:px-6 lg:px-8" fullWidth blurred={fixedNavbar}>
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
                    <div className="flex flex-col">
                        <Typography variant="h6" color="blue-gray" className="font-semibold">
                            {page}
                        </Typography>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    {accessToken ? (
                        <div className="relative flex items-center gap-2">
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={handleOpenModal}
                            >
                                {authUser.avatar ? (
                                    <Avatar
                                        src={authUser.avatar}
                                        alt="User Avatar"
                                        size="lg"
                                        variant="circular"
                                        className="h-8 w-8 rounded-full"
                                    />
                                ) : (
                                    <span className="h-10 w-10 rounded-full bg-blue-gray-500 flex items-center justify-center text-white font-bold text-lg ">
                                        {getInitials(authUser?.fname, authUser?.lname)}
                                    </span>
                                )}
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
                            <Button variant="text" color="blue-gray" className="hidden xl:flex normal-case">
                                <UserCircleIcon className="h-10 w-10 text-blue-gray-500" />
                                Sign In
                            </Button>
                            <IconButton variant="text" color="blue-gray" className="xl:hidden">
                                <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
                            </IconButton>
                        </Link>
                    )}
                        <IconButton variant="text" color="blue-gray" onClick={() => navigate("/dashboard/accountsettings")}>
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
