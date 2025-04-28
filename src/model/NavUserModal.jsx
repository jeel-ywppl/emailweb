import {Avatar, Typography} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {config} from "../utils/util";
import MyButton from "../componets/MyButton";

const NavUserModal = ({isOpen, onClose, user, onLogout}) => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleOutsideClick = (event) => {
        if (event.target.id === "modal-overlay") {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div
            id="modal-overlay"
            className="absolute top-14 right-0 z-50 w-64 "
            onClick={handleOutsideClick}
        >
            <div className="relative z-50 w-64 p-4 bg-white shadow-xl rounded-lg border border-gray-200">
                <button
                    className="absolute text-2xl top-0 right-2 text-gray-400 hover:text-gray-600"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="flex flex-col items-center gap-4">
                    <div className="relative">
                        {user?.avatar ? (
                            <Avatar
                                src={
                                    user?.avatar.startsWith("http")
                                        ? user?.avatar
                                        : `${config.BASE_URL}/${user?.avatar}`
                                }
                                alt={user?.fname}
                                size="xl"
                                variant="rounded"
                                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                            />
                        ) : (
                            <div className="w-8 h-8 flex items-center justify-center rounded-full shadow-lg shadow-blue-gray-500/40 bg-gray-200">
                                <Typography variant="h6" color="blue-gray">
                                    {user?.fname?.charAt(0).toUpperCase()}
                                    {user?.lname?.charAt(0).toUpperCase()}
                                </Typography>
                            </div>
                        )}
                    </div>
                    <h2 className="text-lg font-semibold text-blue-gray-800">
                        {user.fname} {user.lname}
                    </h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <MyButton
                        label="Profile"
                        onClick={() => {
                            onClose();
                            navigate("/dashboard/profile");
                        }}
                        type="outlineBlack"
                        fullWidth
                    />

                    <MyButton
                        label="Logout"
                        onClick={() => {
                            onClose();
                            onLogout();
                        }}
                        type="outlineBlack"
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
};

NavUserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        email: PropTypes.string.isRequired,
        fname: PropTypes.string.isRequired,
        lname: PropTypes.string.isRequired,
    }).isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default NavUserModal;
