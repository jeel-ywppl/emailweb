import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { emailList } from "../constant";

const StarredEmails = ({  onSelectEmail }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <div className="flex items-center bg-white p-4 shadow-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 text-lg text-gray-600 rounded-full hover:bg-gray-200"
                >
                    <IoIosArrowRoundBack />
                </button>
                <h1 className="text-xl font-bold ml-4">Starred Emails</h1>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
                {emailList.length === 0 ? (
                    <p className="text-center text-gray-600">No starred emails available.</p>
                ) : (
                    emailList.map((email) => (
                        <div
                            key={email.id}
                            className="p-4 bg-white rounded-lg shadow-md mb-4 hover:bg-gray-50 cursor-pointer"
                            onClick={() => onSelectEmail(email)}
                        >
                            <h2 className="text-lg font-semibold text-gray-800">{email.subject}</h2>
                            <p className="text-sm text-gray-600">
                                {email.sender} - {email.time}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

StarredEmails.propTypes = {
    starredEmails: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            subject: PropTypes.string.isRequired,
            sender: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
        })
    ).isRequired,
    onSelectEmail: PropTypes.func.isRequired,
};

export default StarredEmails;
