// import {Route, Navigate, useNavigate} from "react-router-dom";
// import PropTypes from "prop-types";
// import {getItem} from "../utils/localStorage";

// const ProtectedRoute = ({element, ...rest}) => {
//     const navigate = useNavigate();

//     const token = getItem("AUTH_KEY");

//     if (!token) {
//         return navigate("/sign-in");
//     } else {
//         return navigate("/sign-in");
//     }
// };

// ProtectedRoute.propTypes = {
//     element: PropTypes.element.isRequired,
//     ...Route.propTypes,
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { getItem } from "../utils/localStorage";

const ProtectedRoute = ({ element }) => {
    const token = getItem("AUTH_KEY");

    if (!token) {
        return <Navigate to="/auth/sign-in" replace />;
    }

    return element;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
};

export default ProtectedRoute;



// import { Navigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import { useAppSelector } from "../store";

// const ProtectedRoute = ({ element, roles }) => {
//     const { accessToken, user } = useAppSelector((state) => state.auth);

//     if (!accessToken) {
//         return <Navigate to="/auth/sign-in" replace />;
//     }

//     if (roles && !roles.includes(user?.role_id?.role_name)) {
//         return <Navigate to="/dashboard/inbox" replace />; 
//     }

//     return element;
// };

// ProtectedRoute.propTypes = {
//     element: PropTypes.element.isRequired,
//     roles: PropTypes.arrayOf(PropTypes.string),
// };

// export default ProtectedRoute;
