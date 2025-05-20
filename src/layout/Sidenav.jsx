import {XMarkIcon} from "@heroicons/react/24/outline";
import {Button, IconButton, Typography} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {useEffect, useRef} from "react";
import {NavLink} from "react-router-dom";
import {setOpenSidenav, useMaterialTailwindController} from "../context";
import useCheckAccess from "../utils/useCheckAccess";

const Sidenav = ({brandImg, brandName, routes}) => {
    const [controller, contextDispatch] = useMaterialTailwindController();
    const {sidenavColor, sidenavType, openSidenav} = controller;
    const sidenavRef = useRef(null);
    const checkAccess = useCheckAccess();

    const sidenavTypes = {
        dark: "bg-gradient-to-br from-gray-800 to-gray-900",
        white: "bg-white shadow-sm",
        transparent: "bg-transparent",
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
                setOpenSidenav(contextDispatch, false);
            }
        };

        if (openSidenav) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openSidenav, contextDispatch]);

    return (
        <aside
            ref={sidenavRef}
            className={`${sidenavTypes[sidenavType]} ${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 ml-4 mt-4 h-[calc(100vh-32px)] w-[250px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
            id="style-4"
        >
            <div className={`relative`}>
                <Typography
                    className="text-center p-1 relative"
                    variant="h6"
                    color={sidenavType === "dark" ? "white" : "midnight"}
                >
                    <img
                        src={brandImg || "/imgs/innvox0101.png"}
                        alt={brandName}
                        className="rounded-lg "
                    />
                </Typography>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="absolute top-1 right-1 rounded-br-none rounded-tl-none xl:hidden"
                    onClick={() => setOpenSidenav(contextDispatch, false)}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
                </IconButton>
            </div>
            <div className="mx-4 ">
                {routes.map(({layout, title, pages}, key) => (
                    <ul key={key} className="flex flex-col gap-1 force-overflow">
                        {title && (
                            <li className="mx-3 mt-4 mb-2">
                                <Typography
                                    variant="small"
                                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                                    className="font-black uppercase opacity-75"
                                >
                                    {title}
                                </Typography>
                            </li>
                        )}
                        {pages.map(
                            ({icon, name, path, isSideNav}, pageKey) =>
                                checkAccess(name, "view") && (
                                    <li key={pageKey}>
                                        {isSideNav && (
                                            <NavLink to={`/${layout}${path}`}>
                                                {({isActive}) => (
                                                    <Button
                                                        variant={isActive ? "gradient" : "text"}
                                                        color={
                                                            isActive
                                                                ? sidenavColor
                                                                : sidenavType === "dark"
                                                                ? "white"
                                                                : "blue-gray"
                                                        }
                                                        className="flex items-center gap-4 px-4 capitalize"
                                                        fullWidth
                                                    >
                                                        {icon}
                                                        <Typography
                                                            color="inherit"
                                                            className="font-medium capitalize"
                                                        >
                                                            {name}
                                                        </Typography>
                                                    </Button>
                                                )}
                                            </NavLink>
                                        )}
                                    </li>
                                ),
                        )}
                    </ul>
                ))}
            </div>
        </aside>
    );
};

Sidenav.propTypes = {
    brandImg: PropTypes.string,
    brandName: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
