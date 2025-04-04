import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {FaPaperclip} from "react-icons/fa";
import DOMPurify from "dompurify";
import {Box, TablePagination} from "@mui/material";
import Loader from "../../componets/Loader";
import {ArrowLeft} from "lucide-react";
import {setCurrentPage, setLimit, setSkip} from "../../store/backup/backupSlice";
import {config} from "../../utils/util";
import {findBackupEmails} from "../../store/backup";
import {useAppDispatch, useAppSelector} from "../../store";
import {Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const BackupMail = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const [emailType, setEmailType] = useState("received");
    const [search, setSearch] = useState("");

    const {data, totalEmails, currentPage, limit, isLoading, isError, errorMessage} =
        useAppSelector((state) => state.backup);

    useEffect(() => {
        dispatch(
            findBackupEmails({
                page: currentPage,
                userEmail: email,
                limit,
                status: `${emailType}_status=true`,
            }),
        );
    }, [dispatch, limit, currentPage, email, emailType]);

    const handlePageChange = (_, newPage) => {
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;
        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage(adjustedPage));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({limit: event.target.value}));
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader />
            </div>
        );
    if (isError) return <p>Error: {errorMessage}</p>;

    return (
        <div className="w-full h-full border rounded-xl p-3 bg-white shadow-lg font-sans mt-2 ">
            <div className="p-3 border-b flex justify-between items-center text-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-gray-600 hover:text-black"
                        title="Go Back"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div className="relative w-full max-w-sm">
                        <Input
                            type="text"
                            label="Search Email"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        className={`p-2 font-semibold relative ${
                            emailType === "received" ? "text-blue-500" : "text-black"
                        }`}
                        onClick={() => setEmailType("received")}
                    >
                        View Received Mails by {email}
                        {emailType === "received" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                        )}
                    </button>
                    <div className="border-l border-gray-800 h-6 mx-2" />
                    <button
                        className={`p-2 font-semibold relative ${
                            emailType === "send" ? "text-blue-500" : "text-black"
                        }`}
                        onClick={() => setEmailType("send")}
                    >
                        View Sent Mails by {email}
                        {emailType === "send" && (
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500" />
                        )}
                    </button>
                </div>
            </div>
            {data
                .filter(
                    (email) =>
                        email?.sender_email?.toLowerCase().includes(search.toLowerCase()) ||
                        email?.subject?.toLowerCase().includes(search.toLowerCase()) ||
                        email?.body?.toLowerCase().includes(search.toLowerCase()),
                )
                .map((email) => (
                    <div
                        key={email?._id}
                        className={`flex flex-col px-5 py-4 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-in-out rounded-lg mt-2 ${
                            !email?.read_status ? "bg-lightblue-100" : "bg-white"
                        }`}
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                    {email?.profilePic ? (
                                        <img
                                            src={
                                                email?.avatar.startsWith("http")
                                                    ? email?.avatar
                                                    : `${config.BASE_URL}/${email?.avatar}`
                                            }
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-semibold text-xl">
                                            {email?.sender_email?.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col flex-grow ml-4">
                                <h4 className="font-semibold text-base text-gray-900 hover:text-primary-700 truncate">
                                    {email?.sender_email}
                                </h4>
                            </div>
                            <div className="flex items-center gap-3 relative">
                                <p className="text-xs text-gray-400">
                                    {email?.updatedAt ? email?.updatedAt.split("T")[0] : ""}
                                </p>
                            </div>
                        </div>
                        <Link
                            to={`/dashboard/backup/backup_emails/${email?._id}`}
                            state={{...email}}
                            className="mt-2 flex items-center gap-3"
                        >
                            <h5 className="text-sm font-light text-gray-700 line-clamp-2 overflow-hidden">
                                <span className="text-sm text-gray-800 font-semibold">
                                    {email?.subject.slice(0, 30)}
                                </span>{" "}
                                {email?.body ? (
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(email.body.slice(0, 50)),
                                        }}
                                    />
                                ) : (
                                    <span>No content available</span>
                                )}
                                ...
                            </h5>
                            {email?.attachments.length > 0 && (
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <FaPaperclip className="mr-1" /> {email.attachments.length}{" "}
                                    Attachment&apos;s
                                </div>
                            )}
                        </Link>
                    </div>
                ))}
            <Box sx={{position: "relative"}}>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={totalEmails}
                    rowsPerPage={limit}
                    page={Math.max(0, currentPage - 1)}
                    onPageChange={handlePageChange}
                    onRowsPerPageChange={handleRowsPerPageChange}
                />
            </Box>
        </div>
    );
};

export default BackupMail;
