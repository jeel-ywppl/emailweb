import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Button, IconButton, Typography} from "@material-tailwind/react";
import {useEffect, useRef} from "react";
// import {useAppSelector} from "../store";
import {setOpenSidenav, useMaterialTailwindController} from "../context";
import useCheckAccess from "../utils/useCheckAccess";

const Sidenav = ({routes}) => {
    const [controller, dispatch] = useMaterialTailwindController();
    const {sidenavColor, sidenavType, openSidenav} = controller;
    const sidenavRef = useRef(null);
    const checkAccess = useCheckAccess();

    // const {user} = useAppSelector((state) => state.auth);

    const sidenavTypes = {
        white: "bg-white shadow-sm",
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
                setOpenSidenav(dispatch, false);
            }
        };

        if (openSidenav) {
            document.addEventListener("mousedown", handleOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [openSidenav, dispatch]);

    console.log("dmnjsbnjdnsjdnjsnd", checkAccess(routes[0]?.pages[0]?.name, "view"));
    console.log("sddjhjhdsjdjsd", routes[0]?.pages[0]?.name);
    console.log("🍔 routes", routes[0]?.pages[0]?.name);

    return (
        <aside
            ref={sidenavRef}
            className={`${sidenavTypes[sidenavType]} ${
                openSidenav ? "translate-x-0" : "-translate-x-80"
            } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[250px] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100 force-overflow overflow-y-auto scrollbar`}
            id="style-4"
        >
            <div className="">
                <Typography className="text-center p-1" variant="h6" color="white">
                    <img src="/imgs/klogo.png" alt="" className="rounded-lg " />
                </Typography>
                <IconButton
                    variant="text"
                    color="white"
                    size="sm"
                    ripple={false}
                    className="grid rounded-br-none rounded-tl-none xl:hidden"
                    onClick={() => setOpenSidenav(dispatch, false)}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
                </IconButton>
            </div>
            <div className="m-4 ">
                {routes.map(({layout, title, pages}, key) => (
                    <ul key={key} className="mb-4 flex flex-col gap-1 force-overflow">
                        {title && (
                            <li className="mx-3 mt-4 mb-2">
                                <Typography
                                    variant="small"
                                    color={sidenavType === "white" ? "blue-gray" : "white"}
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
                                                        color={isActive ? sidenavColor : "#192230"}
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
