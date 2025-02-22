import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AttachmentInput = ({ attachments, setAttachments }) => {
    const handleAttachmentChange = (e) => {
        const files = Array.from(e.target.files).filter(file => {
            if (file.type.startsWith("image/")) {
                return file.size <= 1024 * 1024; // 1MB for images
            }
            return file.size <= 5 * 1024 * 1024; // 5MB for other files
        });
        setAttachments([...attachments, ...files]);
    };

    const removeAttachment = (index) => {
        setAttachments(attachments.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-2">
            <Typography variant="small" color="blue-gray">Attachments</Typography>
            <div className="flex items-center gap-2">
                <input
                    id="attachment-input"
                    type="file"
                    onChange={handleAttachmentChange}
                    multiple
                    className="hidden"
                />
                <label
                    htmlFor="attachment-input"
                    className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                >
                    <PaperClipIcon className="h-5 w-5 text-gray-600" />
                </label>
                <div className="flex flex-wrap gap-2">
                    {attachments.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                        >
                            <span>{file.name} ({(file.size / 1024).toFixed(2)} KB)</span>
                            <button onClick={() => removeAttachment(index)} className="ml-2">
                                <XMarkIcon className="h-4 w-4 text-red-600 cursor-pointer" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

AttachmentInput.propTypes = {
    attachments: PropTypes.array.isRequired,
    setAttachments: PropTypes.func.isRequired,
};

export default AttachmentInput;



