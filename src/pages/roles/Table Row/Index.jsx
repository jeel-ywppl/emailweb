import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import useCheckAccess from "../../../utils/useCheckAccess";
import { Pencil, Settings2, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = ({item, index, openEditModal, openDeleteModal}) => {
    const checkAccess = useCheckAccess();
    const navigate = useNavigate();
    const className = "py-3 px-5 border-b border-blue-gray-50 text-xs";

    return (
            <tr key={item?._id}>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {index + 1}
                    </Typography>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item?.company_id?.name}
                    </Typography>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item?.role_name}
                    </Typography>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {item?.role_id}
                    </Typography>
                </td>
                <td className={className}>
                    <Typography className="text-xs font-semibold text-blue-gray-600">
                        {(() => {
                            const models = item?.permissions?.map((p) => p?.model) || [];
                            const displayed = models.slice(0, 4);
                            const remaining = models.length - displayed.length;

                            return (
                                <>
                                    {displayed.join(", ")}
                                    {remaining > 0 && `, +${remaining} `}
                                </>
                            );
                        })()}
                    </Typography>
                </td>
                <td className={className}>
                    <div className="flex justify-start items-center gap-3 text-black">
                        {checkAccess("role", "edit") && (
                            <button onClick={() => openEditModal(item?._id)}>
                                <Pencil size={"20px"} strokeWidth={1} />
                            </button>
                        )}
                        {checkAccess("role", "delete") && (
                            <button onClick={() => openDeleteModal(item?._id)}>
                                <Trash2 size={"20px"} strokeWidth={1} />
                            </button>
                        )}
                        {checkAccess("permission", "view") && (
                            <button
                                onClick={() => navigate(`/dashboard/role/permission/${item?._id}`)}
                            >
                                <Settings2 size={"20px"} strokeWidth={1} />
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
    openEditModal: PropTypes.func,
    openDeleteModal: PropTypes.func,

};

export default Index;
