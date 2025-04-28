import {Typography} from "@material-tailwind/react";
import {Pencil, Trash2} from "lucide-react";
import useCheckAccess from "../../../utils/useCheckAccess";
import PropTypes from "prop-types";

const Index = ({item, index, openEditModal, openDeleteModal}) => {
    const checkAccess = useCheckAccess();

    const className = "py-3 px-5 border-b border-blue-gray-50";

    return (
        <tr key={item?._id}>
            <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {index + 1}
                </Typography>
            </td>
            <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {item?.name}
                </Typography>
            </td>
            <td className={className}>
                <div className="flex justify-start items-center gap-3 text-black">
                    {checkAccess("module", "edit") && (
                        <button onClick={() => openEditModal(item?._id)}>
                            <Pencil size={"20px"} strokeWidth={1} />
                        </button>
                    )}
                    {checkAccess("module", "delete") && (
                        <button onClick={() => openDeleteModal(item?._id)}>
                            <Trash2 size={"20px"} strokeWidth={1} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

Index.propTypes = {
    item: PropTypes.object,
    index: PropTypes.number,
    className: PropTypes.string,
    openEditModal: PropTypes.func,
    openDeleteModal: PropTypes.func,
};

export default Index;
