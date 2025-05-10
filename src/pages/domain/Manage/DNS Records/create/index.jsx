import {Button, Card, Input, Option, Select} from "@material-tailwind/react";
import PropTypes from "prop-types";

const DnsForm = ({
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
    handleSubmit,
    isSubmitting,
    editingRecord,
    setEditingRecord,
}) => {
    const recordTypes = ["A", "MX", "AAAA", "CNAME", "TXT"];

    return (
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
                        {isSubmitting
                            ? "Submitting..."
                            : editingRecord
                            ? "Update Record"
                            : "Add Record"}
                    </Button>

                    {editingRecord && (
                        <Button
                            type="button"
                            variant="outlined"
                            color="red"
                            onClick={() => {
                                resetForm();
                                setEditingRecord(null);
                            }}
                        >
                            Cancel
                        </Button>
                    )}
                </div>
            </form>
        </Card>
    );
};

DnsForm.propTypes = {
    values: PropTypes.shape({
        record_name: PropTypes.string,
        type: PropTypes.string,
        name: PropTypes.string,
        priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        mailserver: PropTypes.string,
        target: PropTypes.string,
        txtvalue: PropTypes.string,
        pointsTo: PropTypes.string,
        ttl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    setFieldValue: PropTypes.func,
    resetForm: PropTypes.func,
    handleSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    editingRecord: PropTypes.object, 
    setEditingRecord: PropTypes.func,
};

export default DnsForm;
