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
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {toast} from "react-toastify";
import {findCompanyWithoutFilter} from "../store/company";
import {Box, Icon, TablePagination} from "@mui/material";
import {setCurrentPage, setLimit, setSkip} from "../store/Domain/domainSlice";
import {Pencil, Settings2, Trash2} from "lucide-react";
import ConfirmDeleteDomainModal from "../model/ConfirmDeleteDomainModal";

const Domain = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [editingDomainId, setEditingDomainId] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDomainId, setSelectedDomainId] = useState(null);

    const {data, isLoading, totalRecords, limit, currentPage} = useAppSelector(
        (state) => state.domain,
    );

    const {noFilterData} = useAppSelector((state) => state.company);

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

        dispatch(findDomain({page: adjustedPage, limit}));
    };

    const handleRowsPerPageChange = (event) => {
        dispatch(setLimit({limit: event.target.value}));
    };

    return (
        <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="relative w-full sm:w-72">
                    <Input
                        type="text"
                        label="Search Domain"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
                <Button color="primary" onClick={handleOpen} className="w-full sm:w-auto">
                    + Domain Name
                </Button>
            </div>
            <Card className="overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Domain</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Expiration Date</th>
                            <th className="px-4 py-2">Actions</th>
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
                                    data?.domain_name.toLowerCase().includes(search.toLowerCase()),
                                )
                                .map((data, index) => (
                                    <tr key={data?.id} className="border-t">
                                        <td className="px-4 py-2">{index + 1}</td>
                                        <td className="px-4 py-2">{data?.domain_name}</td>
                                        <td className="px-4 py-2">{data?.company_id?.name}</td>
                                        <td className="px-4 py-2">
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
                                        </td>
                                        <td className="px-4 py-2">
                                            {data?.expiration_date
                                                ? data.expiration_date.split("T")[0]
                                                : "N/A"}
                                        </td>
                                        <td className="px-4 py-2 flex gap-3">
                                            <Icon
                                                color="gray"
                                                size="sm"
                                                onClick={() => handleEdit(data?._id)}
                                                className="m-1.5"
                                            >
                                                <Pencil size={"20px"} strokeWidth={2} />
                                            </Icon>
                                            <Icon
                                                color="gray"
                                                size="sm"
                                                onClick={() =>
                                                    navigate(`/dashboard/domain/${data?._id}`)
                                                }
                                                className="m-1.5"
                                            >
                                                <Settings2 size={"20px"} strokeWidth={2} />
                                            </Icon>
                                            <Icon
                                                color="red"
                                                size="sm"
                                                onClick={() => handleDeleteClick(data?._id)}
                                                className="m-1.5 cursor-pointer text-red-500"
                                            >
                                                <Trash2 size={"20px"} strokeWidth={2} />
                                            </Icon>
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
                            {noFilterData.map((company) => (
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
