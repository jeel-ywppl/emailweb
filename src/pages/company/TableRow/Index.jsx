import {Chip} from "@material-tailwind/react";
import {EyeIcon, Pencil, Trash2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import useCheckAccess from "../../../utils/useCheckAccess";
import PropTypes from "prop-types";

const Index = ({item, index, openEditModal, openDeleteModal}) => {
    const navigate = useNavigate();
    const checkAccess = useCheckAccess();

    return (
        <tr key={index} className="">
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <tr className="text-xs font-semibold text-blue-gray-600">{index + 1}</tr>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <tr className="text-xs font-semibold text-blue-gray-600">{item?.name}</tr>

                <tr className="text-xs text-blue-gray-500">{item?.phone}</tr>
            </td>

            <td className="py-3 px-5 border-b border-blue-gray-50">
                <tr className="text-xs font-semibold text-blue-gray-600">{item?.email}</tr>
            </td>
            <td className="py-3 px-5 border-b border-blue-gray-50">
                <tr className="text-xs font-semibold text-blue-gray-600">{item?.industry}</tr>
            </td>
            <td className="py-3  border-b border-blue-gray-50">
                <tr className="text-xs font-semibold text-blue-gray-600">
                    <Chip
                        variant="gradient"
                        color={item?.active_status ? "green" : "blue-gray"}
                        value={item?.active_status ? "active" : "inactive"}
                        className="py-0.5 px-2 text-[11px] w-fit"
                    />
                </tr>
            </td>
            <td className="flex space-x-4 px-4 items-center justify-start flex-nowrap py-5 border-b border-blue-gray-50">
                {checkAccess("company", "view") && (
                    <button
                        onClick={() => navigate(`/dashboard/company/${item?._id}`)}
                        size="sm"
                        className="text-black bg-transparent"
                    >
                        <EyeIcon className="w-5 h-5" strokeWidth={1} />
                    </button>
                )}
                {checkAccess("company", "edit") && (
                    <button
                        size="sm"
                        onClick={() => openEditModal(index)}
                        className="text-black bg-transparent"
                    >
                        <Pencil className="w-5 h-5" strokeWidth={1} />
                    </button>
                )}
                {checkAccess("company", "delete") && (
                    <button
                        size="sm"
                        onClick={() => openDeleteModal(item?._id)}
                        className="text-black bg-transparent"
                    >
                        <Trash2 className="w-5 h-5" strokeWidth={1} />
                    </button>
                )}
            </td>
        </tr>
    );
};

Index.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string,
        industry: PropTypes.string,
        active_status: PropTypes.bool,
    }),
    index: PropTypes.number,
    openEditModal: PropTypes.func,
    openDeleteModal: PropTypes.func,
};

export default Index;
