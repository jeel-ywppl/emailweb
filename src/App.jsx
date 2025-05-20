import {Routes, Route, Navigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./layouts/dashbord";
import SignIn from "./pages/auth/SignIn";
import {useAppSelector} from "./store";
import ProtectedRoute from "./componets/ProtectedRoute";
import Loader from "./componets/Loader";
import MailToast from "./pages/MailToast";

const App = () => {
    const {accessToken, user, isLoading} = useAppSelector((state) => state?.auth);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <MailToast />
            <Routes>
                <Route path="/dashboard/*" element={<ProtectedRoute element={<Dashboard />} />} />

                <Route
                    path="/auth/*"
                    element={
                        accessToken ? (
                            user?.role_id?.role_name === "user" ? (
                                <Navigate to="/dashboard/home" replace />
                            ) : (
                                <Navigate to="/dashboard/inbox" replace />
                            )
                        ) : (
                            <SignIn />
                        )
                    }
                />

                <Route
                    path="*"
                    element={
                        accessToken ? (
                            user?.role_id?.role_name === "user" ? (
                                <Navigate to="/dashboard/inbox" replace />
                            ) : (
                                <Navigate to="/dashboard/home" replace />
                            )
                        ) : (
                            <SignIn />
                        )
                    }
                />
            </Routes>

            <ToastContainer position="top-right" autoClose={1000} hideProgressBar={false} />
        </>
    );
};

export default App;
