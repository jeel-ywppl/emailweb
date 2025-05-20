import {createContext, useContext, useMemo, useReducer, useEffect} from "react";
import PropTypes from "prop-types";

export const MaterialTailwind = createContext(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

export function reducer(state, action) {
    switch (action.type) {
        case "OPEN_SIDENAV":
            return {...state, openSidenav: action.value};
        case "SIDENAV_TYPE":
            return {...state, sidenavType: action.value};
        case "SIDENAV_COLOR":
            return {...state, sidenavColor: action.value};
        case "TRANSPARENT_NAVBAR":
            return {...state, transparentNavbar: action.value};
        case "FIXED_NAVBAR":
            return {...state, fixedNavbar: action.value};
        case "OPEN_CONFIGURATOR":
            return {...state, openConfigurator: action.value};
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export function MaterialTailwindControllerProvider({children}) {
    const initialState = {
        openSidenav: false,
        sidenavColor: "midnight", 
        sidenavType: "white",
        transparentNavbar: true,
        fixedNavbar: false,
        openConfigurator: false,
    };

    // Retrieve saved state from localStorage
    let savedState = null;
    try {
        savedState = JSON.parse(localStorage.getItem("materialTailwindState")) || null;
    } catch (error) {
        console.warn("Failed to parse materialTailwindState from localStorage", error);
    }

    const [controller, contextDispatch] = useReducer(reducer, savedState || initialState);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("materialTailwindState", JSON.stringify(controller));
    }, [controller]);

    const value = useMemo(() => [controller, contextDispatch], [controller, contextDispatch]);

    return <MaterialTailwind.Provider value={value}>{children}</MaterialTailwind.Provider>;
}

export function useMaterialTailwindController() {
    const context = useContext(MaterialTailwind);

    if (!context) {
        throw new Error(
            "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider.",
        );
    }

    return context;
}

MaterialTailwindControllerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const setOpenSidenav = (contextDispatch, value) =>
    contextDispatch({type: "OPEN_SIDENAV", value});
export const setSidenavType = (contextDispatch, value) =>
    contextDispatch({type: "SIDENAV_TYPE", value});
export const setSidenavColor = (contextDispatch, value) =>
    contextDispatch({type: "SIDENAV_COLOR", value});
export const setTransparentNavbar = (contextDispatch, value) =>
    contextDispatch({type: "TRANSPARENT_NAVBAR", value});
export const setFixedNavbar = (contextDispatch, value) =>
    contextDispatch({type: "FIXED_NAVBAR", value});
export const setOpenConfigurator = (contextDispatch, value) =>
    contextDispatch({type: "OPEN_CONFIGURATOR", value});
