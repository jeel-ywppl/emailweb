import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {Autocomplete, Box, TablePagination, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Loader from "../../componets/Loader";
import MyButton from "../../componets/MyButton";
import BackupUserModal from "../../model/BackupUserModal";
import DeleteUserModal from "../../model/DeleteUserModal";
import EditUserModal from "../../model/EditUserModal";
import RegisterNewUser from "../../model/RegisterNewUser";
import {useAppDispatch, useAppSelector} from "../../store";
import {findCompanyWithoutFilter} from "../../store/company";
import {findRoleWithoutFilter} from "../../store/roles";
import {findUser} from "../../store/user";
import {setCurrentPage, setLimit, setSkip} from "../../store/user/userSlice";
import useCheckAccess from "../../utils/useCheckAccess";
import UserTableRow from "./TableRow/Index";

const Tables = () => {
    const dispatch = useAppDispatch();
    const checkAccess = useCheckAccess();
    const [search, setSearch] = useState("");

    const [modals, setModals] = useState({
        showRegister: false,
        edit: false,
        delete: false,
        backup: false,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    const [filter, setFilter] = useState({roleId: "", companyId: ""});

    const {data, isLoading, currentPage, limit, totalRecords, active_status} = useAppSelector(
        (s) => s.user,
    );
    const {noFilterRole} = useAppSelector((s) => s.roles);
    const {noFilterCompany} = useAppSelector((s) => s.company);

    useEffect(() => {
        dispatch(findCompanyWithoutFilter());
        dispatch(findRoleWithoutFilter({company_id: filter.companyId}));
    }, [dispatch, filter]);

    useEffect(() => {
        dispatch(
            findUser({
                page: currentPage,
                limit,
                active_status,
                role_id: filter.roleId,
                company_id: filter.companyId,
            }),
        );
    }, [dispatch, currentPage, limit, active_status, filter]);

    const handleChange = (field) => (e) => {
        const value = e.target.value === "All" ? "" : e.target.value;
        setFilter((prev) => ({...prev, [field]: value}));
    };

    const handlePagination = (event, newPage) => {
        dispatch(setSkip({skip: newPage * limit}));
        dispatch(setCurrentPage({currentPage: newPage + 1}));
    };

    const tableHeaders = ["#", "author", "email", "role", "status", "employed", "Action"];

    const openModal = (type, user = null) => {
        setSelectedUser(user);
        setModals({...modals, [type]: true});
    };

    const closeModal = (type) => {
        setModals({...modals, [type]: false});
        setSelectedUser(null);
    };

    return (
        <div className="p-5 flex flex-col gap-12">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 w-full">
                <div className="relative w-full sm:max-w-sm">
                    <Input
                        type="text"
                        label="Search User"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:max-w-sm">
                    <Autocomplete
                        options={noFilterCompany}
                        getOptionLabel={(option) => option?.name}
                        value={
                            noFilterCompany?.find(
                                (company) => company?._id === filter?.companyId,
                            ) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange("companyId")({
                                target: {value: newValue ? newValue._id : ""},
                            });
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Choose a company"
                                variant="outlined"
                                size="small"
                                className="bg-white w-full"
                                InputLabelProps={{className: "text-sm text-gray-700"}}
                            />
                        )}
                        sx={{
                            width: "50%",
                        }}
                    />

                    <Autocomplete
                        sx={{
                            width: "50%",
                        }}
                        options={noFilterRole}
                        getOptionLabel={(option) => option?.role_name || ""}
                        value={
                            noFilterRole?.find((role) => role?.role_id === filter?.roleId) || null
                        }
                        onChange={(event, newValue) => {
                            handleChange("roleId")({
                                target: {value: newValue ? newValue?.role_id : ""},
                            });
                        }}
                        isOptionEqualToValue={(option, value) => option?.role_id === value?.role_id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="All roles"
                                variant="outlined"
                                size="small"
                                className="bg-white w-full"
                                InputLabelProps={{className: "text-sm text-gray-700"}}
                            />
                        )}
                    />
                </div>

                {checkAccess("user", "create") && (
                    <MyButton
                        label="+ Add New User"
                        onClick={() => openModal("showRegister")}
                        type="primary"
                        className="w-full sm:w-auto"
                    />
                )}
            </div>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex items-center justify-between"
                >
                    <Typography variant="h6" color="white">
                        Users Table
                    </Typography>
                </CardHeader>

                {isLoading ? (
                    <div className="h-[40vh] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <CardBody className="overflow-auto px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto text-nowrap">
                            <thead>
                                <tr>
                                    {tableHeaders.map((el) => (
                                        <th key={el} className="border-b py-3 px-5 text-left">
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
                                {data
                                    ?.filter(
                                        (item) =>
                                            `${item?.fname} ${item?.lname}`
                                                .toLowerCase()
                                                .includes(search.toLowerCase()) ||
                                            item?.email
                                                ?.toLowerCase()
                                                .includes(search.toLowerCase()),
                                    )

                                    .map((item, idx) => {
                                        const pageIndex = Math.max(currentPage, 1); 
                                        const index = (pageIndex - 1) * Number(limit) + idx + 1;

                                        return (
                                            <UserTableRow
                                                key={item._id}
                                                item={item}
                                                idx={index}
                                                openModal={openModal}
                                            />
                                        );
                                    })}
                            </tbody>
                        </table>
                    </CardBody>
                )}

                <Box>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 20, 40]}
                        component="div"
                        count={totalRecords}
                        rowsPerPage={limit}
                        page={Math.max(0, currentPage - 1)}
                        onPageChange={handlePagination}
                        onRowsPerPageChange={(e) => dispatch(setLimit({limit: +e.target.value}))}
                    />
                </Box>
            </Card>
            {modals.edit && selectedUser && (
                <EditUserModal
                    isOpen={modals.edit}
                    user={selectedUser}
                    onClose={() => closeModal("edit")}
                    onSave={() => closeModal("edit")}
                    fetchData={() => dispatch(findUser({page: currentPage, limit}))}
                    setIsEditModalOpen={(state) => setModals({...modals, edit: state})}
                />
            )}
            {modals.delete && selectedUser && (
                <DeleteUserModal
                    isOpen={modals.delete}
                    onClose={() => closeModal("delete")}
                    user={selectedUser}
                />
            )}
            {modals.showRegister && (
                <RegisterNewUser
                    closeModal={() => closeModal("showRegister")}
                    handleNewUserRegistration={() => {}}
                />
            )}
            {modals.backup && selectedUser && (
                <BackupUserModal
                    isOpen={modals.backup}
                    onClose={() => closeModal("backup")}
                    user={selectedUser}
                />
            )}
        </div>
    );
};

export default Tables;
