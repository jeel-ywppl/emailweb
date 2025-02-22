import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./layouts/dashbord";
import SignIn from "./pages/auth/SignIn";
import { useAppDispatch, useAppSelector } from "./store";
import { getUserInfo } from "./store/auth";
import ProtectedRoute from "./componets/ProtectedRoute";

const App = () => {
    const dispatch = useAppDispatch();
    const { accessToken, user, isLoading } = useAppSelector((state) => state?.auth);

    useEffect(() => {
        if (accessToken) {
            dispatch(getUserInfo());
        }
    }, [dispatch, accessToken]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <Routes>
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute element={<Dashboard />} />
                    }
                />

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
                                <Navigate to="/dashboard/inbox" replace />
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
