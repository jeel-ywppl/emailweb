import {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import {Box, TablePagination} from "@mui/material";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useAppDispatch, useAppSelector} from "../../store";
import useCheckAccess from "../../utils/useCheckAccess";
import {findCompanyWithoutFilter} from "../../store/company";
import {deleteRole, getAllRoles} from "../../store/roles";
import {setCurrentPage, setLimit, setSkip} from "../../store/roles/rolesSlice";
import MyButton from "../../componets/MyButton";
import CreateRoleModal from "../../model/CreateRoleModal";
import DeleteRoleModal from "../../model/DeleteRoleModal";
import UserTableRow from "./Table Row/Index";
import Loader from "../../componets/Loader";
import {useMaterialTailwindController} from "../../context";
import {cardHeaderColorMap} from "../../context/theme";

const Roles = () => {
    const dispatch = useAppDispatch();
    const checkAccess = useCheckAccess();
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;
    const [search, setSearch] = useState("");
    const [selectedCompanyId, setSelectedCompanyId] = useState("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [roleIdToDelete, setRoleIdToDelete] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const {roles, isLoading, totalRecords, limit, currentPage} = useAppSelector(
        (state) => state.roles,
    );

    const {noFilterCompany} = useAppSelector((state) => state.company);

    useEffect(() => {
        dispatch(findCompanyWithoutFilter());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getAllRoles({page: currentPage, limit, company_id: selectedCompanyId}));
    }, [dispatch, currentPage, limit, selectedCompanyId]);

    const handleCompanyChange = (value) => {
        setSelectedCompanyId(value || "");
    };

    const openCreateModal = () => {
        setIsEditMode(false);
        setEditingRole(null);
        setIsModalOpen(true);
    };

    const openEditModal = (roleId) => {
        const role = roles?.find((r) => r._id === roleId);
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

    const handlePageChange = (event, newPage) => {
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;
        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage({currentPage: adjustedPage}));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({limit: event.target.value}));
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader />
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
                        {noFilterCompany?.map((company) => (
                            <Option key={company?._id} value={company?._id}>
                                {company?.name}
                            </Option>
                        ))}
                    </Select>
                </div>
                {checkAccess("role", "create") && (
                    <MyButton
                        label="+ Add New Role"
                        onClick={openCreateModal}
                        type="sidenav"
                        className="w-full sm:w-auto"
                    />
                )}
            </div>
            <Card>
                <CardHeader
                    color={cardHeaderColorMap[sidenavColor] || "gray"}
                    className="mb-8 p-6 flex items-center justify-between"
                >
                    <Typography
                        variant="h6"
                        color={cardHeaderColorMap[sidenavColor] === "white" ? "black" : "white"}
                    >
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
                                ?.filter((item) =>
                                    item?.role_name.toLowerCase().includes(search.toLowerCase()),
                                )
                                .map((item, index) => (
                                    <UserTableRow
                                        item={item}
                                        index={(currentPage - 1) * limit + index}
                                        key={item._id} // Use a unique identifier
                                        openEditModal={openEditModal}
                                        openDeleteModal={openDeleteModal}
                                    />
                                ))}
                        </tbody>
                    </table>
                </CardBody>
                <Box sx={{position: "relative"}}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={totalRecords}
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
