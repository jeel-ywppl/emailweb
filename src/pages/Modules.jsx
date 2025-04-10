import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {deleteModule, findModules} from "../store/modules";
import {Card, CardHeader, CardBody, Typography, Input, Button} from "@material-tailwind/react";
import {Loader2, Pencil, Trash2} from "lucide-react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import CreateModual from "../model/CreateModual";
import DeleteModule from "../model/DeleteModule";
import useCheckAccess from "../utils/useCheckAccess";

const Modules = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [moduleIdToDelete, setModuleIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const checkAccess = useCheckAccess();

    const {modules, isLoading} = useAppSelector((state) => state.modules);

    useEffect(() => {
        dispatch(findModules());
    }, [dispatch]);

    const openCreateModal = () => {
        setIsEditMode(false);
        setEditingModule(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id) => {
        const role = modules.find((r) => r?._id === id);
        setIsEditMode(true);
        setEditingModule(role);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingModule(null);
    };

    const openDeleteModal = (id) => {
        setModuleIdToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setModuleIdToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteRole = (id) => {
        if (!id) {
            console.error("Module ID is missing!");
            return;
        }
        dispatch(deleteModule(id))
            .then(() => {
                dispatch(findModules());
            })
            .catch((err) => {
                console.error("Failed to delete module:", err);
            });
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader2 />
            </div>
        );

    return (
        <div className="mb-8 flex flex-col gap-12 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Input
                        type="text"
                        label="Search Modules"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                {checkAccess("module", "create") && (
                    <Button color="primary" onClick={openCreateModal} className="w-full sm:w-auto">
                        + Add New Module
                    </Button>
                )}
            </div>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex items-center gap-4 justify-between"
                >
                    <Typography variant="h6" color="white">
                        Module Table
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-auto px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] text-nowrap table-auto">
                        <thead>
                            <tr>
                                {["#", "Modules", "Action"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                    >
                                        <Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400"
                                        >
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {modules
                                .filter((item) =>
                                    `${item?.name}`.toLowerCase().includes(search.toLowerCase()),
                                )
                                .map((item, index) => {
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
                                                        <button
                                                            onClick={() => openEditModal(item?._id)}
                                                        >
                                                            <Pencil size={"20px"} strokeWidth={1} />
                                                        </button>
                                                    )}
                                                    {checkAccess("module", "delete") && (
                                                        <button
                                                            onClick={() =>
                                                                openDeleteModal(item?._id)
                                                            }
                                                        >
                                                            <Trash2 size={"20px"} strokeWidth={1} />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <CreateModual
                open={isModalOpen}
                onClose={closeModal}
                roleToEdit={editingModule}
                isEditMode={isEditMode}
            />
            <DeleteModule
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteRole}
                roleId={moduleIdToDelete}
            />
        </div>
    );
};

export default Modules;
