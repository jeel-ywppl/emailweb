import {useEffect, useState} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Avatar,
    Chip,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import EditUserModal from "../model/EditUserModal";
import {Pencil, Trash2} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../store";
import {setCurrentPage, setLimit, setSkip} from "../store/user/userSlice";
import {Box, TablePagination} from "@mui/material";
import {findUser} from "../store/user";
import DeleteUserModal from "../model/DeleteUserModal";
import {HiOutlinePlus} from "react-icons/hi";
import RegisterNewUser from "../model/RegisterNewUser";
import {findDomainWithoutFilter} from "../store/Domain";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Loader from "../componets/Loader";

const Tables = () => {
    const dispatch = useAppDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalUsers, setTotalUsers] = useState();
    const [usersThisMonth, setUsersThisMonth] = useState();
    const [search, setSearch] = useState("");
    const [roleId, setRoleId] = useState("");

    const {data, isLoading, currentPage, limit, totalRecords, active_status} = useAppSelector(
        (state) => state.user,
    );

    useEffect(() => {
        dispatch(findDomainWithoutFilter());
    }, [dispatch]);

    useEffect(() => {
        dispatch(findUser({page: currentPage, limit, active_status, role_id: roleId}));
    }, [dispatch, currentPage, limit, active_status, roleId]);

    const fetchData = async () => {
        await dispatch(findUser({page: currentPage, limit}));
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleNewUserRegistration = () => {
        setTotalUsers(totalUsers + 1);
        setUsersThisMonth(usersThisMonth + 1);
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
    };

    const saveUpdatedUser = () => {
        setIsEditModalOpen(false);
    };

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
    };

    const getInitials = (fname, lname) => {
        const firstInitial = fname?.charAt(0).toUpperCase() || "";
        const lastInitial = lname?.charAt(0).toUpperCase() || "";
        return firstInitial + lastInitial;
    };

    const handlePageChange = (event, newPage) => {
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;
        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage({currentPage: adjustedPage}));
        dispatch(findUser({page: adjustedPage, limit, role_id: roleId}));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({limit: event.target.value}));
    };

    const handleRoleChange = (value) => {
        setRoleId(value === "All" ? "" : value === "User" ? 2 : 1);
        dispatch(
            findUser({
                page: currentPage,
                limit,
                role_id: value === "All" ? "" : value === "User" ? 2 : 1,
                active_status: true,
            }),
        );
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader />
            </div>
        );

    return (
        <div className=" mb-8 flex flex-col gap-12 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Input
                        type="text"
                        label="Search User"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                <div className="">
                    <Select
                        label="User Role"
                        onChange={(value) => handleRoleChange(value)}
                        className="w-full"
                    >
                        <Option value="All">All</Option>
                        <Option value="User">User</Option>
                        <Option value="Admin">Admin</Option>
                    </Select>
                </div>
                <button
                    onClick={openModal}
                    className="flex items-center relative border-2 border-gray-300 rounded px-4 py-2 cursor-pointer text-sm font-bold before:bg-gray-300 hover:rounded-b-none before:absolute before:-bottom-0 before:-left-0 before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
                >
                    <HiOutlinePlus className="h-5 w-5" />
                    Add New User
                </button>
            </div>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex items-center gap-4 justify-between"
                >
                    <Typography variant="h6" color="white">
                        Users Table
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-auto px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] text-nowrap table-auto">
                        <thead>
                            <tr>
                                {["author", "email", "status", "employed", "Action"].map((el) => (
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
                            {(data || [])
                                .filter((item) => {
                                    const fullName = `${item?.fname} ${item?.lname}`.toLowerCase();
                                    return (
                                        fullName.includes(search.toLowerCase()) ||
                                        item?.email.toLowerCase().includes(search.toLowerCase())
                                    );
                                })
                                .map((item) => {
                                    const className = "py-3 px-5 border-b border-blue-gray-50";
                                    return (
                                        <tr key={item?._id}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    {item?.img ? (
                                                        <Avatar
                                                            src={item?.img}
                                                            alt={item?.fname}
                                                            size="sm"
                                                            variant="rounded"
                                                        />
                                                    ) : (
                                                        <span className="h-8 w-8 rounded bg-blue-gray-500 flex items-center justify-center text-white font-bold text-lg ">
                                                            {getInitials(item?.fname, item?.lname)}
                                                        </span>
                                                    )}
                                                    <div>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold"
                                                        >
                                                            {item?.fname} {item?.lname}
                                                        </Typography>
                                                        <Typography className="text-xs font-normal text-blue-gray-500">
                                                            {item?.phone_number}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {item?.email}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Chip
                                                    variant="gradient"
                                                    color={
                                                        item?.active_status ? "green" : "blue-gray"
                                                    }
                                                    value={
                                                        item?.active_status ? "active" : "inactive"
                                                    }
                                                    className="py-0.5 px-2 text-[11px] font-medium w-fit"
                                                />
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {
                                                        new Date(item?.updatedAt)
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <div className="flex justify-start items-center gap-3 ">
                                                    <button
                                                        onClick={() =>
                                                            openEditModal({
                                                                _id: item?._id,
                                                                img: item?.img,
                                                                fname: item?.fname,
                                                                lname: item?.lname,
                                                                email: item?.email,
                                                                online: item?.online,
                                                                date: item?.date,
                                                            })
                                                        }
                                                    >
                                                        <Pencil size={"20px"} strokeWidth={1} />
                                                    </button>
                                                    <button
                                                        key={item?._id}
                                                        onClick={() => openDeleteModal(item)}
                                                    >
                                                        <Trash2 size={"20px"} strokeWidth={1} />
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
                        rowsPerPageOptions={[2, 5, 10, 15, 20, 40, 80]}
                        component="div"
                        count={totalRecords}
                        rowsPerPage={limit}
                        page={Math.max(0, currentPage - 1)}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Box>
            </Card>
            {selectedUser && (
                <EditUserModal
                    isOpen={isEditModalOpen}
                    user={selectedUser}
                    onClose={closeEditModal}
                    onSave={saveUpdatedUser}
                    fetchData={fetchData}
                    setIsEditModalOpen={setIsEditModalOpen}
                />
            )}
            {isDeleteModalOpen && userToDelete && (
                <DeleteUserModal
                    isOpen={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    user={userToDelete}
                />
            )}
            {showModal && (
                <RegisterNewUser
                    closeModal={closeModal}
                    handleNewUserRegistration={handleNewUserRegistration}
                />
            )}
        </div>
    );
};

export default Tables;
