import {useEffect, useState, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {Link} from "react-router-dom";
import ComposeEmailModal from "../../model/ComposeEmailModal";
import {config} from "../../utils/util";
import {FaPaperclip, FaEllipsisV, FaTrashAlt} from "react-icons/fa";
import {toast} from "react-toastify";
import {changeEmailStatus, getAllEmailbyUser} from "../../store/email";
import DOMPurify from "dompurify";
import {MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from "react-icons/md";
import {Box, TablePagination} from "@mui/material";
import {setCurrentPage, setLimit, setSkip} from "../../store/email/emailSlice";
import Loader from "../../componets/Loader";
import {RotateCcw} from "lucide-react";

const Trash = () => {
    const dispatch = useAppDispatch();
    const {emails, totalEmails, currentPage, limit, isLoading, isError, errorMessage} =
        useAppSelector((state) => state.email);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        dispatch(getAllEmailbyUser({page: currentPage, limit, status: "trash_status=true"}));
    }, [dispatch, currentPage, limit]);

    const handleCheckboxChange = (emailId) => {
        setSelectedEmails((prevSelected) =>
            prevSelected.includes(emailId)
                ? prevSelected.filter((id) => id !== emailId)
                : [...prevSelected, emailId],
        );
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(emails.map((email) => email?._id));
        }
        setSelectAll(!selectAll);
    };

    const habdleDelete = (emailId) => {
        const payload = {
            email_id: [emailId],
            delete_status: true,
        };
        dispatch(changeEmailStatus(payload))
            .unwrap()
            .then(() => {
                console.log("Email Deleted successfully!");
                dispatch(
                    getAllEmailbyUser({page: currentPage, limit, status: "trash_status=true"}),
                );
            })
            .catch((error) => {
                toast.error(error || "Failed to update email status");
            });
    };

    const handleDropdownToggle = (emailId) => {
        setDropdownOpen(dropdownOpen === emailId ? null : emailId);
    };

    const handleDropdownAction = async (action, emailId = null) => {
        let emailIds = selectedEmails.length > 0 ? selectedEmails : emailId ? [emailId] : [];
        if (emailIds.length === 0) {
            toast.error("Please select at least one email.");
            return;
        }

        const actionMap = {
            archive: {archive_status: true},
            markAsread: {read_status: true},
            trash: {trash_status: false},
            spam: {spam_status: true},
        };

        const payload = {
            email_id: emailIds,
            ...actionMap[action],
        };

        try {
            const response = await dispatch(changeEmailStatus(payload));
            if (response?.payload?.success) {
                console.log(response?.message || `Emails ${action}d successfully!`);
                setDropdownOpen(null);
                dispatch(
                    getAllEmailbyUser({page: currentPage, limit, status: "trash_status=true"}),
                );
            } else {
                console.error("Failed to send reply:", response.message || "Unknown error");
            }
        } catch (error) {
            toast.error(error || "Failed to update email status");
        }
    };

    const handlePageChange = (event, newPage) => {
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;
        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage({currentPage: adjustedPage}));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({limit: event.target.value}));
    };

    const refreshInbox = () => {
        dispatch(getAllEmailbyUser({page: currentPage, limit, status: "trash_status=true"}));
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader />
            </div>
        );
    if (isError) return <p>Error: {errorMessage}</p>;

    return (
        <div className="w-full h-full border rounded-xl p-3 bg-white shadow-lg font-sans mt-2">
            <div className="p-3 border-b flex justify-between items-center">
                <div className="flex items-center ">
                    <button
                        className=" p-2 text-black  font-semibold  flex items-center gap-2 mr-5"
                        onClick={refreshInbox}
                        disabled={isLoading}
                    >
                        <RotateCcw
                            className={`w-5 h-5 transition-transform duration-500 ${
                                isLoading ? "animate-spin" : ""
                            }`}
                        />
                    </button>
                    <button
                        className="p-2.5 bg-primary1 text-white rounded-lg font-semibold hover:bg-secondary2 shadow-lg"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Compose Email
                    </button>
                    <ComposeEmailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>
                <div className="flex items-center gap-3 p-3 relative">
                    <button onClick={handleSelectAll} className="p-2.5 font-semibold">
                        {selectAll ? (
                            <MdOutlineCheckBox size={20} />
                        ) : (
                            <MdOutlineCheckBoxOutlineBlank size={20} />
                        )}
                    </button>
                    {selectedEmails.length > 0 && (
                        <button
                            onClick={() => setDropdownOpen(dropdownOpen === "bulk" ? null : "bulk")}
                            className="p-2 text-black rounded-lg "
                        >
                            <FaEllipsisV />
                        </button>
                    )}
                    {dropdownOpen === "bulk" && (
                        <div
                            ref={dropdownRef}
                            className="absolute right-3 top-14 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                        >
                            <div className="py-1">
                                <button
                                    onClick={() => handleDropdownAction("archive")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Archive
                                </button>
                                <button
                                    onClick={() => handleDropdownAction("markAsread")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Mark as unread
                                </button>
                                <button
                                    onClick={() => handleDropdownAction("trash")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Mark as Untrash
                                </button>
                                <button
                                    onClick={() => handleDropdownAction("spam")}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Mark as Spam
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {emails.map((email) => (
                <div
                    key={email?._id}
                    className={`flex flex-col px-5 py-4 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-in-out rounded-lg mt-2 ${
                        !email.read_status ? "bg-lightblue-100" : "bg-white"
                    }`}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedEmails.includes(email?._id)}
                                onChange={() => handleCheckboxChange(email?._id)}
                                className="form-checkbox h-4 w-4 text-primary1 transition duration-150 ease-in-out"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    habdleDelete(email?._id);
                                }}
                                className="text-gray-600 hover:text-yellow-500 transition-colors duration-200 "
                            >
                                <FaTrashAlt size={18} />
                            </button>
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
                            <button
                                onClick={() => handleDropdownToggle(email?._id)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <FaEllipsisV />
                            </button>
                            {dropdownOpen === email?._id && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute right-3 top-5 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                >
                                    <div className="py-1">
                                        <button
                                            onClick={() =>
                                                handleDropdownAction("archive", email?._id)
                                            }
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Archive
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDropdownAction("markAsread", email?._id)
                                            }
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Mark as read
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDropdownAction("trash", email?._id)
                                            }
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Mark as Untrash
                                        </button>
                                        <button
                                            onClick={() => handleDropdownAction("spam", email?._id)}
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Mark as Spam
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Link
                        to={`/dashboard/trash/${email?._id}`}
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
                                        __html: DOMPurify.sanitize(email?.body.slice(0, 50)),
                                    }}
                                />
                            ) : (
                                <span>No content available</span>
                            )}
                            ...
                        </h5>
                        {email?.attachments?.length > 0 && (
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <FaPaperclip className="mr-1" /> {email?.attachments?.length}{" "}
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

export default Trash;
