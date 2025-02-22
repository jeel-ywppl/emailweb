import PropTypes from "prop-types";
import { FaRegStar, FaStar } from "react-icons/fa";
import { sentEmails } from "../constant";

const Sent = () => {
    const getSenderInitials = (name) => {
        const nameParts = name.split(" ");
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    return (
        <div className="w-full lg:w-96 border rounded-xl p-3 overflow-y-auto bg-white shadow-lg font-sans scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
            <div className="p-3 border-b">
                <h2 className="text-lg font-semibold text-gray-700">Sent Emails</h2>
            </div>

            {sentEmails.length > 0 ? (
                sentEmails.map((email) => (
                    <div
                        key={email.id}
                        className="flex flex-col px-4 py-3 border-b hover:bg-gray-100 cursor-pointer transition-all duration-200 ease-in-out"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center mr-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {email.profilePic ? (
                                        <img
                                            src={email.profilePic}
                                            alt={email.receiver}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-white font-semibold text-lg">
                                            {getSenderInitials(email.receiver)}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col flex-grow">
                                <h4 className="font-semibold text-gray-900">{email.receiver}</h4>
                                <p className="text-xs text-gray-500">{email.receiverEmail}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    className={`text-gray-500 ${
                                        email.isStarred ? "text-yellow-500" : ""
                                    }`}
                                    onClick={() => console.log("Toggle star for:", email.id)}
                                >
                                    {email.isStarred ? <FaStar size={16} /> : <FaRegStar size={16} />}
                                </button>
                                <p className="text-xs text-gray-400 ml-2">{email.time}</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-600 mt-2 overflow-hidden line-clamp-2">
                                {email.snippet}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-4 text-center text-gray-500">No sent emails to display.</div>
            )}
        </div>
    );
};

// PropTypes validation
Sent.propTypes = {
    sentEmails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            receiver: PropTypes.string.isRequired,
            receiverEmail: PropTypes.string.isRequired,
            snippet: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            profilePic: PropTypes.string,
            isStarred: PropTypes.bool, // Optional for starred state
        })
    ).isRequired,
};

export default Sent;
