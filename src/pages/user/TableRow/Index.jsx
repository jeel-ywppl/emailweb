import {Avatar, Chip, Typography} from "@material-tailwind/react";
import {CloudDownload, EyeIcon, Pencil, Trash2} from "lucide-react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import useCheckAccess from "../../../utils/useCheckAccess";
import {config} from "../../../utils/util";

const Index = ({item, idx, openModal}) => {
    const checkAccess = useCheckAccess();
    const navigate = useNavigate();
    const getInitials = (fname, lname) => `${fname?.[0] || ""}${lname?.[0] || ""}`.toUpperCase();

    return (
        <tr key={item?._id}>
            <td className="py-3 px-5 border-b border-blue-gray-50 text-sm">{idx}</td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex items-center gap-4">
                    {item?.img ? (
                        <Avatar
                            src={
                                item?.avatar?.startsWith("http")
                                    ? item?.avatar
                                    : `${config.BASE_URL}/${item?.avatar}`
                            }
                            alt={`${item?.fname} ${item?.lname}`}
                            size="sm"
                            variant="rounded"
                        />
                    ) : (
                        <span className="h-8 w-8 rounded bg-blue-gray-500 flex items-center justify-center text-white font-bold">
                            {getInitials(item?.fname, item?.lname)}
                        </span>
                    )}
                    <div>
                        <Typography variant="small" className="font-semibold">
                            {item?.fname} {item?.lname}
                        </Typography>
                        <Typography className="text-xs text-blue-gray-500">
                            {item?.phone_number}
                        </Typography>
                    </div>
                </div>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs font-semibold">
                {item?.email}
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs font-semibold">
                {item?.role_id?.role_name}
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Chip
                    variant="gradient"
                    color={item?.active_status ? "green" : "blue-gray"}
                    value={item?.active_status ? "active" : "inactive"}
                    className="py-0.5 px-2 text-[11px] w-fit"
                />
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50 text-xs">
                {new Date(item?.createdAt).toLocaleDateString()  || "N/A"} 
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <div className="flex items-center gap-3 text-black">
                    {checkAccess("user", "view") && (
                        <button onClick={() => navigate(`/dashboard/user/${item?._id}`)}>
                            <EyeIcon size="20px" strokeWidth={1} />
                        </button>
                    )}

                    {checkAccess("user", "edit") && (
                        <button onClick={() => openModal("edit", item)}>
                            <Pencil size="20px" strokeWidth={1} />
                        </button>
                    )}

                    {checkAccess("user", "delete") && (
                        <button onClick={() => openModal("delete", item)}>
                            <Trash2 size="20px" strokeWidth={1} />
                        </button>
                    )}
                    {checkAccess("user", "create") && (
                        <button onClick={() => openModal("backup", item)}>
                            <CloudDownload size="20px" strokeWidth={1} />{" "}
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

Index.propTypes = {
    item: PropTypes.object,
    idx: PropTypes.number,
    openModal: PropTypes.func,
};

export default Index;
