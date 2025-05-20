import {useEffect, useState} from "react";
import {setCurrentPage, setLimit, setSkip} from "../../store/company/companySlice";
import {deleteCompany, findCompany} from "../../store/company";
import {useAppDispatch, useAppSelector} from "../../store";
import CompanyModal from "../../model/CompanyModal";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {TablePagination, Box} from "@mui/material";
import DeleteConfirmationModal from "../../model/DeleteConfirmationModal";
import Loader from "../../componets/Loader";
import useCheckAccess from "../../utils/useCheckAccess";
import UserTableRow from "./TableRow/Index";
import {cardHeaderColorMap} from "../../context/theme";
import {useMaterialTailwindController} from "../../context";
import MyButton from "../../componets/MyButton";

const Company = () => {
    const dispatch = useAppDispatch();
    const checkAccess = useCheckAccess();
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [deleteCompanyId, setDeleteCompanyId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const {data, isLoading, totalRecords, limit, currentPage} = useAppSelector(
        (state) => state.company,
    );

    const initialValues = {
        _id: "",
        name: "",
        address: "",
        phone: "",
        industry: "",
        state: "",
        city: "",
        country: "",
        email: "",
        pin_code: "",
        active_status: "",
    };

    useEffect(() => {
        dispatch(findCompany({page: currentPage, limit}));
    }, [dispatch, currentPage, limit]);

    const handleOpen = () => {
        setOpenModal(!openModal);
        setEditIndex(null);
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setOpenModal(true);
    };

    const handlePageChange = (event, newPage) => {
        event.preventDefault();
        const adjustedPage = newPage + 1;
        const newSkip = (adjustedPage - 1) * limit;

        dispatch(setSkip({skip: newSkip}));
        dispatch(setCurrentPage({currentPage: adjustedPage}));

        setTimeout(() => {
            dispatch(findCompany({page: adjustedPage, limit}));
        }, 0);
    };

    const handleRowsPerPageChange = (event) => {
        const newLimit = event.target.value;
        dispatch(setLimit({limit: newLimit}));
        dispatch(setCurrentPage({currentPage: 1}));
        dispatch(findCompany({page: 1, limit: newLimit}));
    };

    const handleDelete = (id) => {
        setDeleteCompanyId(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            if (!deleteCompanyId) return;
            await dispatch(deleteCompany(deleteCompanyId));
            dispatch(findCompany({page: currentPage, limit}));
        } catch (error) {
            console.error(error || "Failed to delete company.");
        } finally {
            setDeleteModalOpen(false);
            setDeleteCompanyId(null);
        }
    };

    if (isLoading)
        return (
            <div className="fixed inset-0 flex justify-center items-center ">
                <Loader />
            </div>
        );

    return (
        <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-72 mb-10">
                    <Input
                        type="text"
                        label="Search Company"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                {checkAccess("company", "create") && (
                    <MyButton
                        label="+ Company"
                        onClick={handleOpen}
                        type={sidenavColor === "white" ? "black" : sidenavColor || "gray"}
                        className="w-full sm:w-auto"
                    />
                )}
            </div>

            {isLoading ? (
                <p>Loading companies...</p>
            ) : (
                <Card>
                    <CardHeader
                        color={cardHeaderColorMap[sidenavColor] || "gray"}
                        className="mb-8 p-6 flex items-center justify-between"
                    >
                        <Typography
                            variant="h6"
                            color={cardHeaderColorMap[sidenavColor] === "white" ? "black" : "white"}
                        >
                            Company Table
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-auto px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] text-nowrap table-auto">
                            <thead>
                                <tr>
                                    {["#", "Name", "Email", "Industry", "Status", "Action"].map(
                                        (el) => (
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
                                        ),
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {(data || [])
                                    ?.filter((item) =>
                                        item.name.toLowerCase().includes(search.toLowerCase()),
                                    )
                                    .map((item, index) => (
                                        <UserTableRow
                                            item={item}
                                            index={(currentPage - 1) * limit + index}
                                            key={index * Math.random()}
                                            openEditModal={handleEdit}
                                            openDeleteModal={handleDelete}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </CardBody>

                    <Box sx={{position: "relative", display: "flex", justifyContent: "end", mt: 2}}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 20, 40, 80]}
                            component="div"
                            count={totalRecords}
                            rowsPerPage={limit}
                            page={Math.max(0, currentPage - 1)}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </Box>
                </Card>
            )}
            <CompanyModal
                open={openModal}
                handleOpen={handleOpen}
                editIndex={editIndex}
                initialValues={
                    editIndex !== null
                        ? {id: data[editIndex]._id, ...data[editIndex]}
                        : initialValues
                }
            />
            <DeleteConfirmationModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                handleConfirm={confirmDelete}
            />
        </div>
    );
};

export default Company;
