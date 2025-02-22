import PropTypes from "prop-types";
import {useState, useEffect, useRef} from "react";
import ComposeEmailModal from "../model/ComposeEmailModal";
import {FaRegStar, FaStar, FaEllipsisV} from "react-icons/fa";
import {MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox} from "react-icons/md";
import {Archive, Clock, Mail, Tag, Trash} from "lucide-react";
import {Link} from "react-router-dom";

const Emaillist = ({
    emailList,
    selectedEmails,
    onToggleSelectEmail,
    onToggleSelectAll,
    isAllSelected,
    onDeleteSelected,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openSelectAllMenu, setOpenSelectAllMenu] = useState(false);
    const [openMenuEmailId, setOpenMenuEmailId] = useState(null);
    const menuRef = useRef(null);
    const selectAllMenuRef = useRef(null);

    const [starredEmails, setStarredEmails] = useState(
        emailList.filter((email) => email?.star_status).map((email) => email?._id),
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenuEmailId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleMenu = (emailId) => {
        setOpenMenuEmailId((prevId) => (prevId === emailId ? null : emailId));
    };

    const getSenderInitials = (fname) => {
        if (!fname) {
            return "";
        }

        const nameParts = fname.split(" ");
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const handleStarToggle = (emailId) => {
        setStarredEmails((prev) =>
            prev.includes(emailId) ? prev.filter((id) => id !== emailId) : [...prev, emailId],
        );
    };

    const handleStarAll = () => {
        const nonStarred = emailList
            .filter((email) => !starredEmails.includes(email?._id))
            .map((email) => email._id);
        setStarredEmails((prev) => [...new Set([...prev, ...nonStarred])]);
    };

    const handleUnstarAll = () => {
        setStarredEmails([]);
    };

    const handleSend = (emailData) => {
        console.log(emailData, "emailDataemailData123");
    };

    return (
        <div className="w-full h-full border rounded-xl p-3 bg-white shadow-lg font-sans ">
            <div className="p-3 border-b">
                <div className="flex justify-between items-center mt-2 gap-2">
                    <button
                        className="p-2.5 bg-primary1 text-white rounded-lg font-semibold hover:bg-secondary2 shadow-lg w-full sm:w-auto whitespace-nowrap"
                        aria-label="Compose Email"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Compose Email
                    </button>
                    <ComposeEmailModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSend={handleSend}
                    />

                    <div className="relative flex items-center gap-2">
                        <button onClick={onToggleSelectAll} className="p-2.5 font-semibold">
                            {isAllSelected ? (
                                <MdOutlineCheckBox size={20} />
                            ) : (
                                <MdOutlineCheckBoxOutlineBlank size={20} />
                            )}
                        </button>
                        {isAllSelected && (
                            <button
                                onClick={() => setOpenSelectAllMenu((prev) => !prev)}
                                className="p-2.5"
                            >
                                <FaEllipsisV size={20} />
                                {openSelectAllMenu && (
                                    <div
                                        ref={selectAllMenuRef}
                                        className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 z-50"
                                    >
                                        <button
                                            onClick={handleStarAll}
                                            className="block w-full text-left px-4 py-2 text-yellow-600 hover:bg-gray-100"
                                        >
                                            Star All
                                        </button>
                                        <button
                                            onClick={handleUnstarAll}
                                            className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                                        >
                                            Unstar All
                                        </button>
                                        <button
                                            onClick={onDeleteSelected}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                        >
                                            Delete All
                                        </button>
                                    </div>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
            {emailList.map((email) => (
                <Link
                    key={email?._id}
                    className="flex flex-col px-5 py-4 border border-gray-200 hover:bg-gray-50 cursor-pointer transition-all duration-200 ease-in-out rounded-lg"
                    to={`/dashboard/inbox/${email?._id}`}
                    state={{...email}}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={selectedEmails.includes(email?._id)}
                                onClick={(e) => e.stopPropagation()}
                                onChange={() => onToggleSelectEmail(email?._id)}
                                className="mr-2 text-primary-600"
                            />
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleStarToggle(email?._id);
                                }}
                                className={`text-gray-600 hover:text-yellow-500 transition-colors duration-200 ${
                                    starredEmails.includes(email?._id) ? "text-yellow-500" : ""
                                }`}
                            >
                                {starredEmails.includes(email?._id) ? (
                                    <FaStar size={18} />
                                ) : (
                                    <FaRegStar size={18} />
                                )}
                            </button>
                            <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                                {email?.profilePic ? (
                                    <img
                                        src={email?.profilePic}
                                        alt={email?.sender_email}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-semibold text-xl">
                                        {getSenderInitials(email?.sender_email)}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col flex-grow ml-4">
                            <h4 className="font-semibold text-lg text-gray-900 hover:text-primary-700 truncate">
                                {email?.sender_email}
                            </h4>
                            <p className="text-xs font-light text-gray-500 truncate">
                                {email?.sender_email}
                            </p>
                        </div>

                        <div className="relative flex items-center gap-3">
                            <p className="text-xs text-gray-400">
                                {email?.updatedAt ? email?.updatedAt.split("T")[0] : ""}
                            </p>

                            <button
                                className=" p-2.5 border"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMenu(email?._id);
                                }}
                            >
                                <FaEllipsisV className="text-gray-500 cursor-pointer" size={16} />
                            </button>

                            {/* Dropdown Menu */}
                            <div
                                ref={menuRef}
                                className={`absolute right-1 top-4 mt-2 bg-white border rounded-md shadow-lg w-44 z-50 transition-transform duration-200 ease-in-out ${
                                    openMenuEmailId === email?._id
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                }`}
                            >
                                <button className="text-gray-600 hover:text-black flex gap-2 p-3 text-sm">
                                    <Archive className="w-5 h-5" /> Archive
                                </button>
                                <button className="text-gray-600 hover:text-black flex gap-2 p-3 text-sm">
                                    <Trash className="w-5 h-5" /> Delete
                                </button>
                                <button className="text-gray-600 hover:text-black flex gap-2 p-3 text-sm">
                                    <Mail className="w-5 h-5" /> Mark as Unread
                                </button>
                                <button className="text-gray-600 hover:text-black flex gap-2 p-3 text-sm">
                                    <Clock className="w-5 h-5" /> Snooze
                                </button>
                                <button className="text-gray-600 hover:text-black flex gap-2 p-3 text-sm">
                                    <Tag className="w-5 h-5" /> Label
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2">
                        <h5 className=" text-sm font-light text-gray-700 line-clamp-2 overflow-hidden">
                            <span className="text-sm text-gray-800 font-semibold">
                                {email?.subject.slice(0, 50)}
                            </span>{" "}
                            {email?.body.slice(0, 100)}...
                        </h5>
                    </div>
                </Link>
            ))}
        </div>
    );
};

Emaillist.propTypes = {
    emailList: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            sender: PropTypes.string.isRequired,
            sender_email: PropTypes.string.isRequired,
            body: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
            profilePic: PropTypes.string,
            star_status: PropTypes.bool,
        }),
    ).isRequired,
    onSelectEmail: PropTypes.func.isRequired,
    selectedEmails: PropTypes.array.isRequired,
    onToggleSelectEmail: PropTypes.func.isRequired,
    onToggleSelectAll: PropTypes.func.isRequired,
    isAllSelected: PropTypes.bool.isRequired,
    onDeleteSelected: PropTypes.func.isRequired,
};

export default Emaillist;
