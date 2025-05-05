import {MdOutlineFileDownload} from "react-icons/md";
import {config} from "../../../utils/util";
import PropTypes from "prop-types";

const AttachmentItem = ({file}) => {
    const handleDownload = async () => {
        const response = await fetch(`${config.LIVE_URL}/${file.file_path}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.original_name;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="border p-2 rounded-lg">
            {file.contentType?.startsWith("image/") && file.showData ? (
                <img
                    src={file.showData}
                    alt={file.original_name}
                    className="w-24 h-24 object-cover rounded"
                />
            ) : (
                <p>{file.original_name}</p>
            )}
            <div onClick={handleDownload} className="mt-1 text-blue-500 cursor-pointer">
                <MdOutlineFileDownload className="w-5 h-5" />
            </div>
        </div>
    );
};

AttachmentItem.propTypes = {
    file: PropTypes.shape({
        contentType: PropTypes.string,
        showData: PropTypes.string,
        file_path: PropTypes.string.isRequired,
        original_name: PropTypes.string.isRequired,
    }).isRequired,
};

export default AttachmentItem;
