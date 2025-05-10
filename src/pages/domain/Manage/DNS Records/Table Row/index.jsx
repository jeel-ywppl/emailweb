import {Tooltip} from "@material-tailwind/react";
import PropTypes from "prop-types";
import {Pencil, Trash2} from "lucide-react";

const UserTableRow = ({record, index, handleEditClick, handleDeleteClick}) => {
    return (
        <tr key={index} className="even:bg-blue-gray-50/50">
            <td className="px-6 py-3 text-sm">{record?.record_name || record?.type}</td>
            <td className="px-6 py-3 text-sm">{record?.type}</td>
            <td className="px-6 py-3 text-sm">{record?.name}</td>
            <td className="px-6 py-3 text-sm">{record?.priority || "0"}</td>
            <td className="px-6 py-3 text-sm break-words whitespace-pre-wrap max-w-xs md:max-w-sm lg:max-w-md">
                {record?.content}
                {record?.type === "A" || record?.type === "AAAA"
                    ? record?.pointsTo
                    : record?.type === "MX"
                    ? record?.mailserver
                    : record?.type === "CNAME"
                    ? record?.target
                    : record?.type === "TXT"
                    ? record?.txtvalue
                    : record?.content}
            </td>
            <td className="px-6 py-3 text-sm">{record?.ttl}</td>
            <td className="px-6 py-3 flex items-center justify-center gap-2">
                <Tooltip content="Edit">
                    <button onClick={() => handleEditClick(record)}>
                        <Pencil size={20} strokeWidth={1} />
                    </button>
                </Tooltip>
                <Tooltip content="Delete">
                    <button onClick={() => handleDeleteClick(record?._id)}>
                        <Trash2 size={20} strokeWidth={1} />
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
};

UserTableRow.propTypes = {
    record: PropTypes.shape({
        _id: PropTypes.string,
        record_name: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string,
        priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        content: PropTypes.string,
        pointsTo: PropTypes.string,
        mailserver: PropTypes.string,
        target: PropTypes.string,
        txtvalue: PropTypes.string,
        ttl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    index: PropTypes.number.isRequired,
    handleEditClick: PropTypes.func.isRequired,
    handleDeleteClick: PropTypes.func.isRequired,
};

export default UserTableRow;
