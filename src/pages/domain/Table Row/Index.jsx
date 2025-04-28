import {Chip, Typography} from "@material-tailwind/react";
import useCheckAccess from "../../../utils/useCheckAccess";
import {useNavigate} from "react-router-dom";
import {Icon} from "@mui/material";
import {Pencil, Settings2, Trash2} from "lucide-react";
import PropTypes from "prop-types";

const Index = ({data, index, openEditModal, openDeleteModal}) => {
    const checkAccess = useCheckAccess();
    const navigate = useNavigate();
    return (
        <tr key={data?._id} className="border-t">
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {index + 1}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {data?.domain_name}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {data?.company_id?.name}
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    <Chip
                        variant="gradient"
                        color={data?.active_status ? "green" : "blue-gray"}
                        value={data?.active_status ? "active" : "inactive"}
                        className="py-0.5 px-2 text-[11px] w-fit"
                    />
                </Typography>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {data?.expiration_date ? data?.expiration_date?.split("T")[0] : "N/A"}
                </Typography>
            </td>
            <td className="py-3 px-5 border-blue-gray-50 flex gap-3">
                {checkAccess("domain", "edit") && (
                    <Icon
                        color="gray"
                        size="sm"
                        onClick={() => openEditModal(data?._id)}
                        className="m-1.5"
                    >
                        <Pencil size={"18px"} strokeWidth={1} />
                    </Icon>
                )}
                {checkAccess("domain", "create") && (
                    <Icon
                        color="gray"
                        size="sm"
                        onClick={() => navigate(`/dashboard/domain/${data?._id}`)}
                        className="m-1.5"
                    >
                        <Settings2 size={"18px"} strokeWidth={1} />
                    </Icon>
                )}
                {checkAccess("domain", "delete") && (
                    <Icon
                        color="red"
                        size="sm"
                        onClick={() => openDeleteModal(data?._id)}
                        className="m-1.5 cursor-pointer "
                    >
                        <Trash2 size={"18px"} strokeWidth={1} />
                    </Icon>
                )}
            </td>
        </tr>
    );
};

Index.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        domain_name: PropTypes.string,
        company_id: PropTypes.shape({
            name: PropTypes.string,
            _id: PropTypes.string,
        }),
        active_status: PropTypes.bool,
        expiration_date: PropTypes.string,
    }),
    index: PropTypes.number,
    openEditModal: PropTypes.func,
    openDeleteModal: PropTypes.func,
};

export default Index;
