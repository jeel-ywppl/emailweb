import {Card, Typography} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../store";
import {addUpdatePermissions, getRolePermissions, resetUserPermissions} from "../store/permissions";
import {SwitchCustomStyles} from "../componets/SwitchCustomStyles";
import {ChevronLeft} from "lucide-react";

const Permission = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const [, setPermissions] = useState([]);

    const {permissions} = useAppSelector((state) => state.permission);
    const object = pathname.includes("dashboard/role") ? {role_id: id} : {user_id: id};

    useEffect(() => {
        if (id) {
            dispatch(getRolePermissions(object))
                .unwrap()
                .then((data) => {
                    if (data && data?.permissionss) {
                        setPermissions(data?.permissionss || []);
                    }
                })
                .catch(() => {
                    console.error("Failed to fetch permissions");
                });
        }
    }, [id, dispatch]);

    const handleResetPermissions = async () => {
        if (!id) return;

        try {
            await dispatch(resetUserPermissions(id)).unwrap();
            dispatch(getRolePermissions(object));
        } catch (error) {
            console.error(error || "Failed to reset permissions");
        }
    };

    const handlePermissionChange = (index, field, value) => {
        let updatedPermissions = [...permissions];

        if (updatedPermissions[index]) {
            const updatedPermission = {
                model: updatedPermissions[index].model,
                [field]: value,
            };

            if (id) {
                dispatch(
                    addUpdatePermissions({
                        ...object,
                        permissions: [updatedPermission],
                    }),
                )
                    .unwrap()
                    .then((response) => {
                        if (response) {
                            dispatch(getRolePermissions(object));
                        }
                    })
                    .catch(() => {
                        console.error("Failed to update permissions");
                    });
            }
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Go back 
                </Link>
            </div>
            {pathname.includes("dashboard/user") && (
                <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md shadow-md">
                    <p className="text-sm font-medium">
                        ⚠️ By clicking this button, all permissions will be reset to default.
                    </p>
                    <button
                        onClick={handleResetPermissions}
                        className="mt-3 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
                    >
                        Reset to Default
                    </button>
                </div>
            )}

            <Card className="p-6 bg-white shadow-lg rounded-lg">
                <div className="mb-6 text-center">
                    <h1 className="font-bold leading-snug tracking-tight bg-gradient-to-tr from-slate-800 to-slate-500 bg-clip-text mx-auto w-full text-2xl lg:max-w-4xl ">
                        Permissions
                    </h1>
                </div>
                {permissions.map((permission, index) => (
                    <div key={index} className="flex items-center space-y-4 border-b py-4">
                        <div className="flex justify-between items-center w-full ">
                            <Typography className="text-lg font-medium capitalize text-gray-600">
                                {permission?.model}
                            </Typography>

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium text-gray-600">
                                        Create
                                    </label>

                                    <SwitchCustomStyles
                                        checked={permission?.create}
                                        onChange={(value) =>
                                            handlePermissionChange(
                                                index,
                                                "create",
                                                value.target.checked,
                                            )
                                        }
                                        className="additional-styling"
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium text-gray-600">
                                        View
                                    </label>
                                    <SwitchCustomStyles
                                        checked={permission?.view}
                                        onChange={(value) =>
                                            handlePermissionChange(
                                                index,
                                                "view",
                                                value.target.checked,
                                            )
                                        }
                                        className="additional-styling"
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium text-gray-600">
                                        Edit
                                    </label>
                                    <SwitchCustomStyles
                                        checked={permission?.edit}
                                        onChange={(value) =>
                                            handlePermissionChange(
                                                index,
                                                "edit",
                                                value.target.checked,
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex gap-2 items-center">
                                    <label className="text-sm font-medium text-gray-600">
                                        Delete
                                    </label>
                                    <SwitchCustomStyles
                                        checked={permission?.delete}
                                        onChange={(value) =>
                                            handlePermissionChange(
                                                index,
                                                "delete",
                                                value.target.checked,
                                            )
                                        }
                                        className="additional-styling"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default Permission;
