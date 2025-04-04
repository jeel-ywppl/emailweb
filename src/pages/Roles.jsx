import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store";
import {getAllRoles, deleteRole} from "../store/roles";
import {findCompanyWithoutFilter} from "../store/company";
import {setCurrentPage, setLimit, setSkip} from "../store/roles/rolesSlice";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import {Box, TablePagination} from "@mui/material";
import {Loader2, Pencil, Settings2, Trash2} from "lucide-react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import CreateRoleModal from "../model/CreateRoleModal";
import DeleteRoleModal from "../model/DeleteRoleModal";
import { useNavigate } from "react-router-dom";

const Roles = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleIdToDelete, setRoleIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const {
        roles,
        isLoading,
        totalData,
        pageNumber: currentPage,
        pageSize: limit,
    } = useAppSelector((state) => state.roles);

    const {noFilterData} = useAppSelector((state) => state.company);

    useEffect(() => {
        dispatch(findCompanyWithoutFilter());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllRoles({page: currentPage, limit, company_id: selectedCompanyId}));
    }, [dispatch, currentPage, limit, selectedCompanyId]);

    const handlePageChange = (event, newPage) => {
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;
        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage({currentPage: adjustedPage}));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({pageSize: event.target.value}));
    };

    const handleCompanyChange = (value) => {
        setSelectedCompanyId(value || "");
    };

    const openCreateModal = () => {
        setIsEditMode(false);
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const openEditModal = (roleId) => {
        const role = roles.find((r) => r._id === roleId);
        setIsEditMode(true);
        setEditingRole(role);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingRole(null);
    };

    const openDeleteModal = (roleId) => {
        setRoleIdToDelete(roleId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setRoleIdToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDeleteRole = (roleId) => {
        dispatch(deleteRole(roleId)).then(() => {
            dispatch(getAllRoles({page: currentPage, limit, company_id: selectedCompanyId}));
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
                        label="Search Role"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                <div className="">
                    <Select
                        label="Select Company"
                        name="company_id"
                        value={selectedCompanyId || ""}
                        onChange={(value) => handleCompanyChange(value)}
                    >
                        {noFilterData.map((company) => (
                            <Option key={company?._id} value={company?._id}>
                                {company?.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                <Button color="primary" onClick={openCreateModal} className="w-full sm:w-auto">
                    + Add New role
                </Button>
            </div>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex items-center gap-4 justify-between"
                >
                    <Typography variant="h6" color="white">
                        Role Table
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-auto px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] text-nowrap table-auto">
                        <thead>
                            <tr>
                                {[
                                    "#",
                                    "Company Name",
                                    "Roles",
                                    "Role id",
                                    "Permissions",
                                    "Action",
                                ].map((el) => (
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
                            {roles
                                .filter((item) =>
                                    item?.role_name.toLowerCase().includes(search.toLowerCase()),
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
                                                    {item?.permissions
                                                        .map((permission) => permission?.model)
                                                        .join(", ")}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="flex justify-start items-center gap-3 text-black">
                                                    <button
                                                        onClick={() => openEditModal(item?._id)}
                                                    >
                                                        <Pencil size={"20px"} strokeWidth={1} />
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(item?._id)}
                                                    >
                                                        <Trash2 size={"20px"} strokeWidth={1} />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            navigate(
                                                                `/dashboard/role/permission/${item?._id}`,
                                                            )
                                                        }
                                                    >
                                                        <Settings2 size={"20px"} strokeWidth={1} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </CardBody>
                <Box sx={{position: "relative"}}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={totalData}
                        rowsPerPage={limit}
                        page={Math.max(0, currentPage - 1)}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Box>
            </Card>
            <CreateRoleModal
                open={isModalOpen}
                onClose={closeModal}
                roleToEdit={editingRole}
                isEditMode={isEditMode}
            />
            <DeleteRoleModal
                open={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDeleteRole}
                roleId={roleIdToDelete}
            />
        </div>
    );
};

export default Roles;
