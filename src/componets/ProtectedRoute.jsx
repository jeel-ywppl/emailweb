import {Navigate} from "react-router-dom";
import PropTypes from "prop-types";
import {getItem} from "../utils/localStorage";

const ProtectedRoute = ({element}) => {
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
