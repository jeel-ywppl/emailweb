import {useEffect, useState} from "react";
import {useFormik} from "formik";
import {Card, CardBody} from "@material-tailwind/react";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../../../store";
import {deleteDomain, getDomainById, updateDomain} from "../../../../store/Domain";
import {dnsValidationSchema} from "../../../../validation/dnsValidationScheama";
import DnsForm from "./create";
import UserTableRow from "./Table Row";
import ConfirmDeleteDomainModal from "../../../../model/ConfirmDeleteDomainModal";
import PropTypes from "prop-types";

const DnsRecords = ({records: initialRecords}) => {
    const dispatch = useAppDispatch();
    const {id} = useParams();
    const [records, setRecords] = useState(initialRecords);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDomainId, setSelectedDomainId] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        setRecords(initialRecords);
    }, [initialRecords]);

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
                        const dnsResponse = await dispatch(getDomainById({_id: id}));
                        if (dnsResponse?.payload) {
                            setRecords(dnsResponse?.payload?.data?.dns_records || []);
                        }
                        resetForm();
                        setEditingRecord(null);
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
                await dispatch(deleteDomain(payload)).unwrap();
                const dnsResponse = await dispatch(getDomainById({_id: id}));
                if (dnsResponse?.payload) {
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
        setFieldValue("record_name", record?.record_name);
        setFieldValue("type", record?.type);
        setFieldValue("name", record?.name);
        setFieldValue("priority", record?.priority);
        setFieldValue("mailserver", record?.mailserver);
        setFieldValue("target", record?.target);
        setFieldValue("txtvalue", record?.txtvalue);
        setFieldValue("pointsTo", record?.pointsTo);
        setFieldValue("ttl", record?.ttl);
    };
    return (
        <div>
            <DnsForm
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
                resetForm={resetForm}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                editingRecord={editingRecord}
                setEditingRecord={setEditingRecord}
            />

            <div className="w-full overflow-x-auto mt-10">
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
                                    <UserTableRow
                                        key={record._id}
                                        record={record}
                                        index={index}
                                        handleEditClick={handleEditClick}
                                        handleDeleteClick={handleDeleteClick}
                                    />
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
DnsRecords.propTypes = {
    records: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            record_name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            priority: PropTypes.number,
            mailserver: PropTypes.string,
            target: PropTypes.string,
            txtvalue: PropTypes.string,
            pointsTo: PropTypes.string,
            ttl: PropTypes.number,
        }),
    ).isRequired,
};
export default DnsRecords;
