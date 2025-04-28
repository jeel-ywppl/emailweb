import { Chip, Typography} from "@material-tailwind/react";
import {EyeIcon, Pencil, Trash2} from "lucide-react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import useCheckAccess from "../../../utils/useCheckAccess";

const ClientRow = ({item, idx, openModal}) => {
    const checkAccess = useCheckAccess();
    const navigate = useNavigate();
    const getInitials = (fname, lname) => `${fname?.[0] || ""}${lname?.[0] || ""}`.toUpperCase();

    return (
        <tr key={item?._id}>
            <td className="py-3 px-5 border-b border-blue-gray-50 text-sm">{idx + 1}</td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex flex-col">
                    <Typography variant="small" className="font-semibold">
                        {item?.company_name}
                    </Typography>
                    <Typography className="text-xs text-blue-gray-500">
                        {item?.subdomain}
                    </Typography>
                </div>
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex items-center gap-4">
                    <span className="h-8 w-8 rounded bg-blue-gray-500 flex items-center justify-center text-white font-bold">
                        {getInitials(item?.fname, item?.lname)}
                    </span>
                    <div>
                        <Typography variant="small" className="font-semibold">
                            {item?.fname} {item?.lname}
                        </Typography>
                        <Typography className="text-xs text-blue-gray-500">
                            {item?.email}
                        </Typography>
                    </div>
                </div>
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs">{item?.client_email}</td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Chip
                    variant="gradient"
                    color={item?.active_status ? "green" : "blue-gray"}
                    value={item?.active_status ? "active" : "inactive"}
                    className="py-0.5 px-2 text-[11px] w-fit"
                />
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs capitalize">
                {item?.deploymentStatus || "N/A"}
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs">
                {item?.updatedAt ? new Date(item?.updatedAt).toISOString().split("T")[0] : "N/A"}
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 text-black">
                    {checkAccess("client", "view") && (
                        <button onClick={() => navigate(`/dashboard/client/${item?._id}`)}>
                            <EyeIcon size="20px" strokeWidth={1} />
                        </button>
                    )}
                    {checkAccess("client", "edit") && (
                        <button onClick={() => openModal("edit", item)}>
                            <Pencil size="20px" strokeWidth={1} />
                        </button>
                    )}
                    {checkAccess("client", "delete") && (
                        <button onClick={() => openModal("delete", item)}>
                            <Trash2 size="20px" strokeWidth={1} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

ClientRow.propTypes = {
    item: PropTypes.object,
    idx: PropTypes.number,
    openModal: PropTypes.func,
};

export default ClientRow;
