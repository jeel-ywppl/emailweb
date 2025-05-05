import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {
    Button,
    Card,
    CardBody,
    Input,
    Option,
    Select,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {ChevronLeft, Pencil, Trash2} from "lucide-react";
import {useAppDispatch} from "../../../store";
import {deleteDomain, getDomainById, updateDomain} from "../../../store/Domain";
import {dnsValidationSchema} from "../../../validation/dnsValidationScheama";
import ConfirmDeleteDomainModal from "../../../model/ConfirmDeleteDomainModal";

const recordTypes = ["A", "MX", "AAAA", "CNAME", "TXT"];

const DnsSetting = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [dnsSetting, setDnsSetting] = useState();
    const [records, setRecords] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDomainId, setSelectedDomainId] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        const fetchDnsSetting = async () => {
            const response = await dispatch(getDomainById({_id: id}));
            if (response?.payload) {
                setDnsSetting(response?.payload?.data);
                setRecords(response?.payload?.data?.dns_records || []);
            }
        };
        fetchDnsSetting();
    }, [id, dispatch]);

    const {handleChange, setFieldValue, handleBlur, resetForm, handleSubmit, isSubmitting, values} =
        useFormik({
            initialValues: {
                type: "A",
                record_name: "",
                name: "",
                priority: "",
                mailserver: "",
                target: "",
                txtvalue: "",
                pointsTo: "",
                ttl: "",
            },
            validationSchema: dnsValidationSchema,
            onSubmit: async (values, {setSubmitting}) => {
                try {
                    const payload = {
                        dns_records: {
                            record_name: values.record_name,
                            type: values.type,
                            name: values.name,
                            priority: values.priority || 0,
                            content:
                                values.content ||
                                (values.type === "A" || values.type === "AAAA"
                                    ? values.pointsTo
                                    : values.type === "MX"
                                    ? values.mailserver
                                    : values.type === "CNAME"
                                    ? values.target
                                    : values.type === "TXT"
                                    ? values.txtvalue
                                    : values.content),
                            ttl: values.ttl,
                        },
                    };
                    if (editingRecord) {
                        payload.dns_id = editingRecord._id;
                    }
                    const response = await dispatch(
                        updateDomain({domainId: id, records: payload}),
                    ).unwrap();
                    if (response && response?.success) {
                        console.log("DNS record updated successfully");
                        resetForm();
                        const dnsResponse = await dispatch(getDomainById({_id: id}));
                        if (dnsResponse?.payload) {
                            setDnsSetting(dnsResponse.payload.data);
                            setRecords(dnsResponse.payload.data?.dns_records || []);
                        }
                    } else {
                        console.error(response?.message || "Failed to update DNS record.");
                    }
                } catch (error) {
                    console.error(error?.message || "An error occurred while updating.");
                } finally {
                    setSubmitting(false);
                }
            },
        });

    const handleDeleteClick = (recordId) => {
        setSelectedDomainId(recordId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedDomainId) {
            try {
                const payload = {
                    id: id,
                    dns_id: selectedDomainId,
                };
                const response = await dispatch(deleteDomain(payload)).unwrap();
                console.log(response?.message || "DNS record deleted successfully!");
                const dnsResponse = await dispatch(getDomainById({_id: id}));
                if (dnsResponse?.payload) {
                    setDnsSetting(dnsResponse.payload.data);
                    setRecords(dnsResponse.payload.data?.dns_records || []);
                }
            } catch (error) {
                console.error("Delete Error:", error);
                console.error(error);
            } finally {
                setDeleteModalOpen(false);
                setSelectedDomainId(null);
            }
        }
    };

    const handleEditClick = (record) => {
        setEditingRecord(record);
        setFieldValue("record_name", record.record_name);
        setFieldValue("type", record.type);
        setFieldValue("name", record.name);
        setFieldValue("priority", record.priority);
        setFieldValue("mailserver", record.mailserver);
        setFieldValue("target", record.target);
        setFieldValue("txtvalue", record.txtvalue);
        setFieldValue("pointsTo", record.pointsTo);
        setFieldValue("ttl", record.ttl);
    };

    return (
        <div className="w-full p-6 space-y-6">
            <div className="flex items-center mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Domain
                </Link>
            </div>
            <Card className="p-4 border border-gray-300 space-y-4">
                <h2 className="text-lg font-semibold">Domain Details</h2>
                <div className="px-4 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Domain Name:
                            </Typography>
                            <Typography>{dnsSetting?.domain_name}</Typography>
                        </div>
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Company:
                            </Typography>
                            <Typography>{dnsSetting?.company_id?.name}</Typography>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Expiration Date:
                            </Typography>
                            <Typography>
                                {dnsSetting?.expiration_date
                                    ? dnsSetting.expiration_date.split("T")[0]
                                    : "N/A"}
                            </Typography>
                        </div>
                        <div className="flex items-center gap-3">
                            <Typography variant="h6" color="blue-gray">
                                Status:
                            </Typography>
                            <Typography color={dnsSetting?.active_status ? "green" : "red"}>
                                {dnsSetting?.active_status ? "Active" : "Inactive"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Card>
            <Card className="p-6 border border-gray-300 space-y-4">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <Input
                            label="Custom Record Name"
                            name="record_name"
                            value={values.record_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Select
                            name="type"
                            value={values.type}
                            onChange={(value) => {
                                setFieldValue("type", value);
                                setFieldValue("record_name", values.record_name || value);
                            }}
                        >
                            {recordTypes.map((type) => (
                                <Option key={type} value={type}>
                                    {type}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {values.type === "MX" && (
                            <Input
                                label="Priority"
                                name="priority"
                                value={values.priority}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        {values.type === "MX" && (
                            <Input
                                label="Mail Server"
                                name="mailserver"
                                value={values.mailserver}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        {values.type === "CNAME" && (
                            <Input
                                label="Target"
                                name="target"
                                value={values.target}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        {values.type === "TXT" && (
                            <Input
                                label="TXT Value"
                                name="txtvalue"
                                value={values.txtvalue}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        {(values.type === "A" || values.type === "AAAA") && (
                            <Input
                                label="Points to"
                                name="pointsTo"
                                value={values.pointsTo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        )}
                        <Input
                            label="TTL"
                            name="ttl"
                            value={values.ttl}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Add Record"}
                        </Button>
                    </div>
                </form>
            </Card>

            <div className="w-full overflow-x-auto">
                <Card className="w-full shadow-lg border border-blue-gray-100">
                    <CardBody className="overflow-auto p-0">
                        <table className="w-full min-w-[900px] table-auto text-left">
                            <thead>
                                <tr className="bg-blue-gray-50 text-blue-gray-700">
                                    <th className="px-6 py-4 text-sm font-semibold">Custom Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Type</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Priority</th>
                                    <th className="px-6 py-4 text-sm font-semibold">Content</th>
                                    <th className="px-6 py-4 text-sm font-semibold">TTL</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((record, index) => (
                                    <tr key={index} className="even:bg-blue-gray-50/50">
                                        <td className="px-6 py-3 text-sm">
                                            {record?.record_name || record?.type}
                                        </td>
                                        <td className="px-6 py-3 text-sm">{record?.type}</td>
                                        <td className="px-6 py-3 text-sm">{record?.name}</td>
                                        <td className="px-6 py-3 text-sm">
                                            {record?.priority || "0"}
                                        </td>
                                        <td className="px-6 py-3 text-sm break-words whitespace-pre-wrap max-w-xs md:max-w-sm lg:max-w-md">
                                            {record?.content}
                                            {record?.type === "A" || record?.type === "AAAA"
                                                ? record?.pointsTo
                                                : record?.type === "MX"
                                                ? record?.mailserver
                                                : record?.type === "CNAME"
                                                ? record?.target
                                                : record?.type === "TXT"
                                                ? record?.txtvalue
                                                : record?.content}
                                        </td>
                                        <td className="px-6 py-3 text-sm">{record?.ttl}</td>
                                        <td className="px-6 py-3 flex items-center justify-center gap-2">
                                            <Tooltip content="Edit">
                                                <button onClick={() => handleEditClick(record)}>
                                                    <Pencil size={20} strokeWidth={1} />
                                                </button>
                                            </Tooltip>
                                            <Tooltip content="Delete">
                                                <button
                                                    onClick={() => handleDeleteClick(record?._id)}
                                                >
                                                    <Trash2 size={20} strokeWidth={1} />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
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

export default DnsSetting;
