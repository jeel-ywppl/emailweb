import {useFormik} from "formik";
import {Input, Select, Option, Button, Dialog} from "@material-tailwind/react";
import {useAppDispatch, useAppSelector} from "../store";
import PropTypes from "prop-types";
import {createRoleValidationSchema} from "../validation/createRoleValidationSchema";
import {createRoles, editRole, getAllRoles} from "../store/roles";

const CreateRoleForm = ({open, onClose, roleToEdit}) => {
    const dispatch = useAppDispatch();
    const {noFilterCompany} = useAppSelector((state) => state.company);

    const {
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting,
        values,
        errors,
        touched,
        resetForm,
    } = useFormik({
        enableReinitialize: true,
        initialValues: {
            role_name: roleToEdit ? roleToEdit.role_name : "",
            role_id: roleToEdit ? roleToEdit.role_id : "",
            company_id: roleToEdit ? roleToEdit.company_id._id : "",
            active_status: roleToEdit ? roleToEdit.active_status ?? true : true,
        },
        validationSchema: createRoleValidationSchema,
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const requestBody = {
                    role_name: values.role_name,
                    role_id: values.role_id,
                    ...(roleToEdit ? {} : {active_status: values.active_status}),
                };

                if (!roleToEdit) {
                    requestBody.company_id = values.company_id || undefined;
                }

                let response;
                if (roleToEdit) {
                    response = await dispatch(
                        editRole({id: roleToEdit._id, updatedData: requestBody}),
                    );

                    if (response?.data?.success) {
                        console.log("Role updated successfully:", response?.data);
                        resetForm();
                        setSubmitting(false);
                    }
                } else {
                    response = await dispatch(createRoles(requestBody));

                    if (response?.data?.success) {
                        console.log("Role created successfully:", response?.data);
                        resetForm();
                        setSubmitting(false);
                    }
                }
                dispatch(getAllRoles());
                onClose();
            } catch (error) {
                console.error("Error during form submission:", error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <div className="p-5 space-y-4">
                <h2 className="text-lg font-bold">
                    {roleToEdit ? "Edit Role" : "Create New Role"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            label="Role Name"
                            name="role_name"
                            value={values.role_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <Input
                            label="Role Number"
                            name="role_id"
                            value={values.role_id}
                            onChange={(e) => setFieldValue("role_id", Number(e.target.value))}
                            onBlur={handleBlur}
                            className="w-full"
                        />
                    </div>

                    {!roleToEdit && (
                        <div>
                            <Select
                                label="Select Company"
                                name="company_id"
                                value={values.company_id}
                                onChange={(value) => setFieldValue("company_id", value)}
                                onBlur={handleBlur}
                                error={touched.company_id && Boolean(errors.company_id)}
                                className="w-full"
                            >
                                {Array.isArray(noFilterCompany) && noFilterCompany.length > 0 ? (
                                    noFilterCompany.map((company) => (
                                        <Option key={company?._id} value={company?._id}>
                                            {company?.name}
                                        </Option>
                                    ))
                                ) : (
                                    <Option disabled>No companies available</Option>
                                )}
                            </Select>
                        </div>
                    )}

                    <div className="flex justify-end space-x-2 mt-6">
                        <Button
                            type="button"
                            onClick={onClose}
                            color="red"
                            className="w-full sm:w-auto"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="green"
                            className="ml-2 w-full sm:w-auto"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? roleToEdit
                                    ? "Saving Changes..."
                                    : "Creating Role..."
                                : roleToEdit
                                ? "Save Changes"
                                : "Create Role"}
                        </Button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

CreateRoleForm.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    roleToEdit: PropTypes.object,
};

export default CreateRoleForm;
