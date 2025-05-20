import {useEffect} from "react";
import socket from "../context/SocketProvider";
import {useAppDispatch, useAppSelector} from "../store";
import {getUserInfo} from "../store/auth";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";
import {getAllEmailbyUser} from "../store/email";

const MailToast = () => {
    const dispatch = useAppDispatch();
    const loggedInUserEmail = useAppSelector((state) => state.auth.user?.email);
    const {accessToken} = useAppSelector((state) => state?.auth);
    const location = useLocation();

    useEffect(() => {
        if (accessToken && !loggedInUserEmail) {
            dispatch(getUserInfo());
        }
    }, [dispatch, accessToken, loggedInUserEmail]);

    useEffect(() => {
        if (loggedInUserEmail) {
            const userEmail = loggedInUserEmail;
            socket.emit("join_user", userEmail);

            socket.on("new_email", (email) => {
                console.log("📬 New email received:", email);

                const senderName = email?.sender_name || email?.sender_email || "Someone";

                toast(
                    () => (
                        <div className=" px-4 py-2 bg-yellow-200 text-black rounded-lg shadow-md w-full max-w-xs">
                            <span className="font-medium text-sm">
                                You got new mail from <strong>{senderName}</strong>
                            </span>
                        </div>
                    ),
                    {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        closeButton: false,
                        style: {
                            background: "transparent",
                            boxShadow: "none",
                            padding: 0,
                            margin: 0,
                        },
                        bodyStyle: {
                            padding: 0,
                            margin: 0,
                        },
                    },
                );

                if (location.pathname === "/dashboard/inbox") {
                    dispatch(
                        getAllEmailbyUser({
                            page: 1,
                            limit: 10,
                            status: "received_status=true",
                        }),
                    );
                }
            });

            return () => {
                socket.off("new_email");
            };
        }
    }, [loggedInUserEmail]);

    return null; // No need to render anything visually
};

export default MailToast;
