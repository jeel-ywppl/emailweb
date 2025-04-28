import { Typography } from "@material-tailwind/react";
import { Eye, Trash2 } from "lucide-react";
import useCheckAccess from "../../../utils/useCheckAccess";
import PropTypes from "prop-types";

const Index = ({item, openEditModal, setModalOpen, setEmailToDelete} ) => {
    const checkAccess = useCheckAccess();
    
    const className = "py-3 px-5 border-b border-blue-gray-50";

    return (
        <tr key={item?._id}>
            <td className={className}>
                <Typography variant="small" color="blue-gray" className="font-semibold">
                    {item?.backup_email}
                </Typography>
            </td>
            <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {new Date(item?.deletedAt).toISOString().split("T")[0]}
                </Typography>
            </td>
            <td className={className}>
                <Typography className="text-xs font-semibold text-blue-gray-600">
                    {new Date(item?.backup_createdAt).toISOString().split("T")[0]}
                </Typography>
            </td>
            <td className={className}>
                <div className="flex justify-start items-center gap-3">
                    {checkAccess("backup", "view") && (
                        <button onClick={() => openEditModal(item?.backup_email)}>
                            <Eye size={"20px"} strokeWidth={1} />
                        </button>
                    )}
                    {checkAccess("backup", "delete") && (
                        <button
                            onClick={() => {
                                setEmailToDelete(item?.backup_email);
                                setModalOpen(true);
                            }}
                        >
                            <Trash2 size={"20px"} strokeWidth={1} />
                        </button>
                    )}
                </div>
            </td>
        </tr>
    );
};

Index.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        backup_email: PropTypes.string,
        deletedAt: PropTypes.string,
        backup_createdAt: PropTypes.string,
    }),
    openEditModal: PropTypes.func.isRequired,
    setModalOpen: PropTypes.func.isRequired,
    setEmailToDelete: PropTypes.func.isRequired,
};

export default Index;
