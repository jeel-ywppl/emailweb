import {useEffect} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Button, IconButton, Switch, Typography} from "@material-tailwind/react";
import {
    setFixedNavbar,
    setOpenConfigurator,
    setSidenavColor,
    setSidenavType,
    useMaterialTailwindController,
} from "../context";

export function Configurator() {
    const [controller, contextDispatch] = useMaterialTailwindController();
    const {openConfigurator, sidenavColor, sidenavType, fixedNavbar} = controller;

    const sidenavColors = {
        white: "from-gray-100 to-gray-100 border-gray-200",
        midnight: "from-[#24243d] to-[#1a1a2e]",
        indigo: "from-[#547ec0] to-[#3c5ea8]",
        green: "from-green-400 to-green-600",
        orange: "from-orange-400 to-orange-600",
        red: "from-red-400 to-red-600",
        pink: "from-pink-400 to-pink-600",
    };

    useEffect(() => {
        // Retrieve the saved color from localStorage
        const savedColor = localStorage.getItem("sidenavColor");
        if (savedColor) {
            setSidenavColor(contextDispatch, savedColor);
        }
    }, [contextDispatch]);

    useEffect(() => {
        // Save the selected color to localStorage
        localStorage.setItem("sidenavColor", sidenavColor);
    }, [sidenavColor]);

    return (
        <aside
            className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
                openConfigurator ? "translate-x-0" : "translate-x-96"
            } overflow-y-auto`}
        >
            <div className="flex items-start justify-between px-6 pt-8 pb-6">
                <div>
                    <Typography variant="h5" color="blue-gray">
                        Dashboard Configurator
                    </Typography>
                    <Typography className="font-normal text-blue-gray-600">
                        See our dashboard options.
                    </Typography>
                </div>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => setOpenConfigurator(contextDispatch, false)}
                >
                    <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
                </IconButton>
            </div>
            <div className="py-4 px-6">
                <div className="mb-12">
                    <Typography variant="h6" color="blue-gray">
                        Sidenav Colors
                    </Typography>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        {Object.keys(sidenavColors).map((color) => (
                            <span
                                key={color}
                                title={color}
                                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                                    sidenavColors[color]
                                } ${
                                    sidenavColor === color
                                        ? "border-2 border-black ring-2 ring-black"
                                        : "border border-transparent"
                                }`}
                                onClick={() => setSidenavColor(contextDispatch, color)}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <Typography variant="h6" color="blue-gray">
                        Sidenav Types
                    </Typography>
                    <Typography variant="small" color="gray">
                        Choose between 3 different sidenav types.
                    </Typography>
                    <div className="mt-3 flex items-center gap-2">
                        <Button
                            variant={sidenavType === "dark" ? "gradient" : "outlined"}
                            onClick={() => setSidenavType(contextDispatch, "dark")}
                        >
                            Dark
                        </Button>
                        <Button
                            variant={sidenavType === "transparent" ? "gradient" : "outlined"}
                            onClick={() => setSidenavType(contextDispatch, "transparent")}
                        >
                            Transparent
                        </Button>
                        <Button
                            variant={sidenavType === "white" ? "gradient" : "outlined"}
                            onClick={() => setSidenavType(contextDispatch, "white")}
                        >
                            White
                        </Button>
                    </div>
                </div>

                <div className="mb-12">
                    <hr />
                    <div className="flex items-center justify-between py-5">
                        <Typography variant="h6" color="blue-gray">
                            Navbar Fixed
                        </Typography>
                        <Switch
                            id="navbar-fixed"
                            checked={fixedNavbar}
                            onChange={() => setFixedNavbar(contextDispatch, !fixedNavbar)}
                        />
                    </div>
                    <hr />
                </div>
                <div className="p-4 border-t mt-4">
                    <Button
                        variant="outlined"
                        color="red"
                        onClick={() => {
                            localStorage.removeItem("materialTailwindState");
                            window.location.reload();
                        }}
                        fullWidth
                        className="mt-4"
                    >
                        Reset to Default
                    </Button>
                </div>
            </div>
        </aside>
    );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
