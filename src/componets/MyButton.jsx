import PropTypes from "prop-types";
import {BUTTONS} from "../context/theme";
import {useMaterialTailwindController} from "../context";

const MyButton = ({
    label,
    icon,
    type = "primary",
    onClick,
    title,
    fullWidth = false,
    disabled = false,
    isLoading = false,
    className = "",
    htmlType = "button",
}) => {
    const [controller] = useMaterialTailwindController();
    const {sidenavColor = "midnight"} = controller;

    // fallback to BUTTONS.primary if color is not found
    const resolvedType =
        type === "sidenav"
            ? BUTTONS[sidenavColor] || BUTTONS["primary"]
            : BUTTONS[type] || BUTTONS["primary"];

    return (
        <button
            type={htmlType}
            onClick={onClick}
            title={title}
            disabled={disabled || isLoading}
            className={`
                ${BUTTONS.base}
                ${resolvedType}
                ${BUTTONS[type]}
                ${fullWidth ? "w-full" : ""}
                ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}
        >
            {isLoading ? (
                <span className="animate-pulse">Loading...</span>
            ) : (
                <>
                    {icon && <span className="mr-2">{icon}</span>}
                    {label}
                </>
            )}
        </button>
    );
};

MyButton.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.node,
    type: PropTypes.oneOf([
        "primary",
        "red",
        "secondary",
        "black",
        "white",
        "outlineBlue",
        "outlineGray",
        "outlineBlack",
        "ghost",
        "ghostBlue",
        "danger",
        "blue",
        "gray",
        "green",
        "action",
        "indigo",
        "sidenav",
    ]),
    onClick: PropTypes.func,
    title: PropTypes.string,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    htmlType: PropTypes.oneOf(["button", "submit", "reset"]),
};

export default MyButton;
