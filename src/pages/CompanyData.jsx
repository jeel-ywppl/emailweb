import {useEffect, useState} from "react";
import {setCurrentPage, setLimit, setSkip} from "../store/company/companySlice";
import {deleteCompany, findCompany} from "../store/company";
import {useAppDispatch, useAppSelector} from "../store";
import CompanyModal from "../model/CompanyModal";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Button, Input} from "@material-tailwind/react";
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
} from "@mui/material";
import {AiOutlineDelete, AiTwotoneEye} from "react-icons/ai";
import {FiEdit2} from "react-icons/fi";
import DeleteConfirmationModal from "../model/DeleteConfirmationModal";
import { toast } from "react-toastify";

const DataTable = () => {
    const dispatch = useAppDispatch();
    const {data, isLoading, totalRecords, limit, currentPage} = useAppSelector(
        (state) => state.company,
    );

    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const [deleteCompanyId, setDeleteCompanyId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
        const newLimit = +event.target.value;
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
            toast.success("Company deleted successfully!");
            dispatch(findCompany({page: currentPage, limit}));
        } catch (error) {
            toast.error(error || "Failed to delete company.");
        } finally {
            setDeleteModalOpen(false);
            setDeleteCompanyId(null);
        }
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-72">
                    <Input
                        type="text"
                        label="Search Company"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                <Button color="primary" onClick={handleOpen} className="w-full sm:w-auto">
                    + Add Company
                </Button>
            </div>

            {isLoading ? (
                <p>Loading companies...</p>
            ) : (
                <Card className="overflow-hidden shadow-lg">
                    <TableContainer>
                        <Table className="min-w-full">
                            <TableHead>
                                <TableRow className="bg-gray-100">
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Industry</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell className="text-center">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(data || [])
                                    ?.filter((item) =>
                                        item.name.toLowerCase().includes(search.toLowerCase()),
                                    )
                                    .map((item, index) => (
                                        <TableRow key={index} className="hover:bg-gray-50">
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item?.name}</TableCell>
                                            <TableCell>{item?.email}</TableCell>
                                            <TableCell>{item?.industry}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                                        item?.active_status === true
                                                            ? "bg-green-500 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {item?.active_status === true
                                                        ? "Active"
                                                        : "Inactive"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="flex space-x-2 justify-center items-center flex-nowrap">
                                                <Button
                                                    size="sm"
                                                    className="text-black bg-transparent"
                                                >
                                                    <AiTwotoneEye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleEdit(index)}
                                                    className="text-black bg-transparent"
                                                >
                                                    <FiEdit2 className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleDelete(item?._id)}
                                                    className="text-black bg-transparent"
                                                >
                                                    <AiOutlineDelete className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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

export default DataTable;
