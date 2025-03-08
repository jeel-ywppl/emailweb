import {getSinglMail} from "../store/email";
import {useAppDispatch} from "../store/index";
import {config} from "../utils/util";
import {Archive, ArrowLeft, ArrowRight, Clock, Mail, Tag, Trash} from "lucide-react";
import {useEffect, useState} from "react";
import {FaRegStar, FaShareSquare} from "react-icons/fa";
import {MdOutlineFileDownload} from "react-icons/md";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import DOMPurify from "dompurify";

const EmailView = () => {
    const [email, setEmail] = useState();
    const {id} = useParams();
    const {state} = useLocation();
    console.log("statestate", state);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    console.log("emailsemailsemails", id);

    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        const fetchEmail = async () => {
            const respose = await dispatch(getSinglMail(id));
            if (respose?.payload) {
                setEmail(respose?.payload?.data?.email);
            }
        };

        fetchEmail();
    }, [id, dispatch, state]);

    const getSenderInitials = (fname) => {
        if (!fname) {
            return "";
        }
        const nameParts = fname.split(" ");
        const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "";
        const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const handleDownload = async (imageUrl, filename) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
    };

    return (
        <div className="pt-5 pl-5">
            <div className="w-full h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 font-sans rounded-lg">
                <div className="flex justify-between items-center border-b px-4 py-3 bg-white shadow-sm">
                    <div className="flex items-center sm:space-x-10 space-x-2">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-600 hover:text-black"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button className="text-gray-600 hover:text-black" title="Archive">
                            <Archive className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-black" title="Delete">
                            <Trash className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-black" title="Mark as Unread">
                            <Mail className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-black" title="Snooze">
                            <Clock className="w-5 h-5" />
                        </button>
                        <button className="text-gray-600 hover:text-black" title="Label">
                            <Tag className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-b-lg shadow-md p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center pb-4 border-b">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                {email?.profilePic ? (
                                    <img
                                        src={email?.profilePic}
                                        alt={email?.sender_email}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-white font-semibold text-lg">
                                        {getSenderInitials(email?.sender_email)}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900">
                                    {email?.sender_email}
                                </h4>
                                <p className="text-xs text-gray-500">{email?.senderEmail}</p>
                            </div>
                        </div>
                        <div className="flex items-center text-gray-500 space-x-3">
                            <span className="text-sm">{email?.time}</span>
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <FaRegStar size={15} />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-200">
                                <FaShareSquare size={15} />
                            </button>
                        </div>
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-gray-800">{email?.subject}</h1>

                    <div className="mt-4 text-gray-700 leading-relaxed">
                        {email?.body ? (
                            <div
                                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(email.body)}}
                            />
                        ) : (
                            <p>No content available</p>
                        )}
                    </div>

                    {email?.attachments?.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold">Attachments:</h3>
                            <div className="flex flex-wrap gap-3 mt-2">
                                {email?.attachments.map((file, index) => {
                                    console.log(file, "attachmants");
                                    return (
                                        <div key={index} className="border p-2 rounded-lg">
                                            {file?.file_type ? (
                                                <img
                                                    src={
                                                        file?.file_path.startsWith("http")
                                                            ? file?.file_path
                                                            : `${config.BASE_URL}/${file?.file_path}`
                                                    }
                                                    alt={file?.original_name}
                                                    className="w-24 h-24 object-cover rounded cursor-pointer"
                                                    onClick={() => {
                                                        setPreviewImage(
                                                            `${config.BASE_URL}/${file?.file_path}`,
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <p>{file?.original_name || "Unknown File"}</p>
                                            )}
                                            <div
                                                onClick={() =>
                                                    handleDownload(
                                                        `${config.BASE_URL}/${file?.file_path}`,
                                                        file?.original_name,
                                                    )
                                                }
                                                className="block mt-1 text-blue-500"
                                            >
                                                <MdOutlineFileDownload className="w-5 h-5" />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {previewImage && (
                        <div
                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                            onClick={() => {
                                console.log("Closing Preview Modal");
                                setPreviewImage(null);
                            }}
                        >
                            <div className="bg-white p-4 rounded-lg">
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="max-w-full max-h-[80vh]"
                                />
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex space-x-4 mt-6 px-4">
                    <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                        <ArrowLeft className="w-4 h-4" />
                        <span>Reply</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-100">
                        <span>Forward</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>{" "}
        </div>
    );
};

export default EmailView;
