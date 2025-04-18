import {useEffect, useState} from "react";
import {createDomain, deleteDomain, findDomain, updateDomain} from "../store/Domain";
import {useAppDispatch, useAppSelector} from "../store";
import {useNavigate} from "react-router-dom";
import {domainValidationSchema} from "../validation/domainValidationSchema";
import {useFormik} from "formik";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {toast} from "react-toastify";
import {findCompanyWithoutFilter} from "../store/company";
import {Box, Icon, TablePagination} from "@mui/material";
import {setCurrentPage, setLimit, setSkip} from "../store/Domain/domainSlice";
import {Pencil, Settings2, Trash2} from "lucide-react";
import ConfirmDeleteDomainModal from "../model/ConfirmDeleteDomainModal";
import Loader from "../componets/Loader";
import useCheckAccess from "../utils/useCheckAccess";

const Domain = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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

    const handleEdit = (domainId) => {
        const domainToEdit = data.find((domain) => domain._id === domainId);
        if (domainToEdit) {
            setFieldValue("domain_name", domainToEdit.domain_name);
            setFieldValue("company_id", domainToEdit.company_id?._id);
            setFieldValue("expiration_date", domainToEdit.expiration_date);
            setFieldValue("active_status", domainToEdit.active_status ? "true" : "false");
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
                const response = await dispatch(deleteDomain(payload)).unwrap();
                toast.success(response?.message || "DNS record deleted successfully!");
                dispatch(findDomain());
            } catch (error) {
                console.error("Delete Error:", error);
                toast.error(error);
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
                    const response = await dispatch(
                        updateDomain({domainId: editingDomainId, records: values}),
                    ).unwrap();
                    toast.success(response?.payload?.message || "Domain updated successfully!");
                } else {
                    const response = await dispatch(createDomain(values)).unwrap();
                    toast.success(response?.payload?.message || "Domain created successfully!");
                }
                resetForm();
                handleOpen();
                dispatch(findDomain());
            } catch (error) {
                console.error("API Error:", error);
                toast.error(error);
            } finally {
                console.log("setSubmitting(false) called");
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
        <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-72 mb-10">
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
                    <Button color="primary" onClick={handleOpen} className="w-full sm:w-auto">
                        + Domain Name
                    </Button>
                )}
            </div>
            <Card>
                <CardHeader
                    variant="gradient"
                    color="gray"
                    className="mb-8 p-6 flex items-center gap-4 justify-between "
                >
                    <Typography variant="h6" color="white">
                        Module Table
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
                            ) : data.length > 0 ? (
                                data
                                    .filter((data) =>
                                        data?.domain_name
                                            .toLowerCase()
                                            .includes(search.toLowerCase()),
                                    )
                                    .map((data, index) => (
                                        <tr key={data?.id} className="border-t">
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {index + 1}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {data?.domain_name}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {data?.company_id?.name}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm ${
                                                            data?.active_status === true
                                                                ? "bg-green-100 text-green-600"
                                                                : "bg-red-100 text-red-600"
                                                        }`}
                                                    >
                                                        {data?.active_status === true
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-b border-blue-gray-50">
                                                <Typography className="text-xs font-semibold text-blue-gray-600">
                                                    {data?.expiration_date
                                                        ? data.expiration_date.split("T")[0]
                                                        : "N/A"}
                                                </Typography>
                                            </td>
                                            <td className="py-3 px-5 border-blue-gray-50 flex gap-3">
                                                {checkAccess("domain", "edit") && (
                                                    <Icon
                                                        color="gray"
                                                        size="sm"
                                                        onClick={() => handleEdit(data?._id)}
                                                        className="m-1.5"
                                                    >
                                                        <Pencil size={"18px"} strokeWidth={2} />
                                                    </Icon>
                                                )}
                                                {checkAccess("domain", "create") && (
                                                    <Icon
                                                        color="gray"
                                                        size="sm"
                                                        onClick={() =>
                                                            navigate(
                                                                `/dashboard/domain/${data?._id}`,
                                                            )
                                                        }
                                                        className="m-1.5"
                                                    >
                                                        <Settings2 size={"18px"} strokeWidth={2} />
                                                    </Icon>
                                                )}
                                                {checkAccess("domain", "delete") && (
                                                    <Icon
                                                        color="red"
                                                        size="sm"
                                                        onClick={() => handleDeleteClick(data?._id)}
                                                        className="m-1.5 cursor-pointer text-red-500"
                                                    >
                                                        <Trash2 size={"18px"} strokeWidth={2} />
                                                    </Icon>
                                                )}
                                            </td>
                                        </tr>
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
                            {noFilterCompany.map((company) => (
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
                            <Button color="gray" onClick={handleOpen} className="mr-2">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600"
                            >
                                {isSubmitting
                                    ? "Submitting..."
                                    : editingDomainId
                                    ? "Save Changes"
                                    : "Submit"}
                            </Button>
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
