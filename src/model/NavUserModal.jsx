import PropTypes from "prop-types";

const NavUserModal = ({ isOpen, onClose, user, onLogout }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-14 right-0 z-50 w-64 p-4 bg-white shadow-xl rounded-lg border border-gray-200">
            <button
                className="absolute text-2xl top-0 right-2 text-gray-400 hover:text-gray-600"
                onClick={onClose}
            >
                &times;
            </button>
            <div className="flex flex-col items-center gap-4">
                {/* User Avatar */}
                <div className="relative h-16 w-16 rounded-full bg-blue-gray-500 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.fname}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        user.email.charAt(0).toUpperCase()
                    )}
                </div>

                {/* User Info */}
                <h2 className="mt-2 text-lg font-semibold text-blue-gray-800">
                    {user.fname} {user.lname}
                </h2>
                <p className="text-sm text-gray-500">{user.email}</p>

                {/* Logout Button */}
                <button
                    className="mt-4 w-full px-4 py-2 bg-secondary2 text-white rounded-lg hover:bg-primary1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onLogout}
                >
                    Logout
                </button>
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
