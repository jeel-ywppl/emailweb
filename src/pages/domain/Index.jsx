import {useEffect, useState} from "react";
import {createDomain, deleteDomain, findDomain, updateDomain} from "../../store/Domain";
import {useAppDispatch, useAppSelector} from "../../store";
import {domainValidationSchema} from "../../validation/domainValidationSchema";
import {useFormik} from "formik";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {findCompanyWithoutFilter} from "../../store/company";
import {Box, TablePagination} from "@mui/material";
import {setCurrentPage, setLimit, setSkip} from "../../store/Domain/domainSlice";
import useCheckAccess from "../../utils/useCheckAccess";
import Loader from "../../componets/Loader";
import MyButton from "../../componets/MyButton";
import ConfirmDeleteDomainModal from "../../model/ConfirmDeleteDomainModal";
import UserTableRow from "./Table Row/Index";

const Domain = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    const checkAccess = useCheckAccess();

    const [editingDomainId, setEditingDomainId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDomainId, setSelectedDomainId] = useState(null);

    const {data, isLoading, totalRecords, limit, currentPage} = useAppSelector(
        (state) => state.domain,
    );

    const {noFilterCompany} = useAppSelector((state) => state.company);

    useEffect(() => {
        dispatch(findCompanyWithoutFilter());
    }, [dispatch]);

    useEffect(() => {
        dispatch(findDomain({page: currentPage, limit}));
    }, [dispatch, currentPage, limit]);

    const handleOpen = () => setOpen(!open);

    const handleClose = () => {
        setOpen(false);
        resetForm();
        setEditingDomainId(null);
    };

    const handleEdit = (domainId) => {
        const domainToEdit = data?.find((domain) => domain?._id === domainId);
        if (domainToEdit) {
            setFieldValue("domain_name", domainToEdit?.domain_name);
            setFieldValue("company_id", domainToEdit?.company_id?._id);
            setFieldValue("expiration_date", domainToEdit?.expiration_date);
            setFieldValue("active_status", domainToEdit?.active_status ? "true" : "false");
            setEditingDomainId(domainId);
        }
        setOpen(true);
    };

    const handleDeleteClick = (recordId) => {
        setSelectedDomainId(recordId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedDomainId) {
            try {
                const payload = {
                    id: selectedDomainId,
                    dns_id: "",
                };
                await dispatch(deleteDomain(payload)).unwrap();
                dispatch(findDomain());
            } catch (error) {
                console.error("Delete Error:", error);
                console.error(error);
            } finally {
                setDeleteModalOpen(false);
                setSelectedDomainId(null);
            }
        }
    };

    const {
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        resetForm,
        isSubmitting,
        values,
        errors,
        touched,
    } = useFormik({
        initialValues: {
            domain_name: "",
            company_id: "",
            expiration_date: "",
            active_status: true,
        },
        validationSchema: domainValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                if (editingDomainId) {
                    await dispatch(
                        updateDomain({domainId: editingDomainId, records: values}),
                    ).unwrap();
                } else {
                    await dispatch(createDomain(values)).unwrap();
                }
                resetForm();
                handleClose();
                dispatch(findDomain());
            } catch (error) {
                console.error("API Error:", error);
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

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
        <div className="p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-16">
                <div className="relative w-full sm:w-72 ">
                    <Input
                        type="text"
                        label="Search Domain"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                {checkAccess("domain", "create") && (
                    <MyButton
                        label="+ Domain Name"
                        onClick={handleOpen}
                        type="primary"
                        className="w-full sm:w-auto"
                    />
                )}
            </div>
            <Card className="">
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className=" p-6 flex items-center gap-4 justify-between "
                >
                    <Typography variant="h6" color="white">
                        Domain Table
                    </Typography>
                </CardHeader>
                <CardBody className="overflow-auto px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] text-nowrap table-auto">
                        <thead>
                            <tr>
                                {[
                                    "#",
                                    "Domain",
                                    "Company",
                                    "Status",
                                    "Expiration Date",
                                    "Actions",
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
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        Loading...
                                    </td>
                                </tr>
                            ) : data?.length > 0 ? (
                                data
                                    ?.filter((data) =>
                                        data?.domain_name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()),
                                    )
                                    .map((data, index) => (
                                        <UserTableRow
                                            data={data}
                                            index={(currentPage - 1) * limit + index}
                                            key={index * Math.random()}
                                            openEditModal={handleEdit}
                                            openDeleteModal={handleDeleteClick}
                                        />
                                    ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center py-4">
                                        No domains found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                </CardBody>
            </Card>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>{editingDomainId ? "Edit Domain" : "Add Domain"}</DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Domain Name"
                            name="domain_name"
                            value={values.domain_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.domain_name && errors.domain_name}
                        />
                        <Select
                            label="Select Company"
                            name="company_id"
                            value={values.company_id}
                            onChange={(value) => setFieldValue("company_id", value)}
                        >
                            {noFilterCompany?.map((company) => (
                                <Option key={company?._id} value={company?._id}>
                                    {company?.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            type="date"
                            label="Expiration Date"
                            name="expiration_date"
                            value={values.expiration_date}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.expiration_date && errors.expiration_date}
                        />
                        <Select
                            label="Active Status"
                            name="active_status"
                            value={values.active_status}
                            error={touched.active_status && errors.active_status}
                            onChange={(value) => setFieldValue("active_status", value === "true")}
                        >
                            <Option value="true">Active</Option>
                            <Option value="false">Inactive</Option>
                        </Select>
                        <DialogFooter>
                            <MyButton
                                label="Cancel"
                                onClick={handleClose}
                                type="outlineGray"
                                className="mr-2"
                            />

                            <MyButton
                                htmlType="submit"
                                disabled={isSubmitting}
                                isLoading={isSubmitting}
                                label={editingDomainId ? "Save Changes" : "Submit"}
                                type="primary"
                                className="px-4 py-3"
                            />
                        </DialogFooter>
                    </form>
                </DialogBody>
            </Dialog>
            <ConfirmDeleteDomainModal
                open={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Domain"
                message="Are you sure you want to delete this domain? This action cannot be undone."
            />
        </div>
    );
};

export default Domain;
