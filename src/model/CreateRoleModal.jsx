import {useFormik} from "formik";
import {Input, Select, Option, Button, Dialog} from "@material-tailwind/react";
import {useAppDispatch, useAppSelector} from "../store";
import PropTypes from "prop-types";
import {createRoleValidationSchema} from "../validation/createRoleValidationSchema";
import {createRoles, editRole, getAllRoles} from "../store/roles";

const CreateRoleForm = ({open, onClose, roleToEdit}) => {
    const dispatch = useAppDispatch();
    const {noFilterData} = useAppSelector((state) => state.company);

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
                                {Array.isArray(noFilterData) && noFilterData.length > 0 ? (
                                    noFilterData.map((company) => (
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

// import {useFormik} from "formik";
// import {Input, Select, Option, Button, Dialog, Switch} from "@material-tailwind/react";
// import {useAppDispatch, useAppSelector} from "../store";
// import PropTypes from "prop-types";
// import {createRoleValidationSchema} from "../validation/createRoleValidationSchema";
// import {XIcon} from "lucide-react";
// import {createRoles, editRole, getAllRoles} from "../store/roles";

// const CreateRoleForm = ({open, onClose, roleToEdit}) => {
//     const dispatch = useAppDispatch();
//     const {noFilterData} = useAppSelector((state) => state.company);

//     const formik = useFormik({
//         enableReinitialize: true,
//         initialValues: {
//             role_name: roleToEdit ? roleToEdit.role_name : "",
//             permissions: roleToEdit
//                 ? roleToEdit.permissions
//                 : [{model: "", create: false, view: false, edit: false, delete: false}],
//             role_id: roleToEdit ? roleToEdit.role_id : "",
//             company_id: roleToEdit ? roleToEdit.company_id : "",
//             active_status: roleToEdit ? roleToEdit.active_status : true,
//         },
//         validationSchema: createRoleValidationSchema,
//     onSubmit: async (values) => {
//         console.log("Formik Values before submission:", values);

//         try {
//             const requestBody = {
//                 role_name: values.role_name,
//                 role_id: values.role_id,
//                 company_id: values.company_id || undefined,
//                 active_status: values.active_status,
//                 permissions: values.permissions.map((permission) => ({
//                     model: permission.model,
//                     create: permission.create,
//                     view: permission.view,
//                     edit: permission.edit,
//                     delete: permission.delete,
//                 })),
//             };

//             if (roleToEdit) {
//                 const response = await dispatch(
//                     editRole({id: roleToEdit._id, updatedData: requestBody}),
//                 );
//                 if (response?.status === 200) {
//                     console.log("Role updated successfully:", response?.data);
//                     dispatch(getAllRoles());
//                     formik.resetForm();
//                     onClose();
//                 }
//             } else {
//                 const response = await dispatch(createRoles(requestBody));
//                 if (response?.status === 201) {
//                     console.log("Role created successfully:", response?.data);
//                 }
//                 dispatch(getAllRoles());
//                 formik.resetForm();
//                 onClose();
//             }
//         } catch (error) {
//             console.error("Error during form submission:", error);
//         }
//     },
// });

//     const handleAddPermission = () => {
//         formik.setFieldValue("permissions", [
//             ...formik.values.permissions,
//             {model: "", create: false, view: false, edit: false, delete: false},
//         ]);
//     };

//     const handleRemovePermission = (index) => {
//         const updatedPermissions = formik.values.permissions.filter(
//             (_, permissionIndex) => permissionIndex !== index,
//         );
//         formik.setFieldValue("permissions", updatedPermissions);
//     };

//     const handlePermissionChange = (index, field, value) => {
//         const updatedPermissions = formik.values.permissions.map((permission, permissionIndex) => {
//             if (permissionIndex === index) {
//                 return {...permission, [field]: value};
//             }
//             return permission;
//         });
//         formik.setFieldValue("permissions", updatedPermissions);
//     };

//     return (
        // <Dialog open={open} onClose={onClose}>
        //     <div className="p-5 space-y-4 sm:space-y-6 max-h-[70dvh] overflow-y-auto scroll-m-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200">
        //         <h2 className="text-lg font-bold">
        //             {roleToEdit ? "Edit Role" : "Create New Role"}
        //         </h2>
        //         <form onSubmit={formik.handleSubmit} className="space-y-4">
        //             <div>
        //                 <Input
        //                     label="Role Name"
        //                     name="role_name"
        //                     value={formik.values.role_name}
        //                     onChange={formik.handleChange}
        //                     error={formik.touched.role_name && Boolean(formik.errors.role_name)}
        //                     helperText={formik.touched.role_name && formik.errors.role_name}
        //                     className="w-full"
        //                 />
        //             </div>
        //             <div>
        //                 <Input
        //                     label="Role Number"
        //                     name="role_id"
        //                     value={formik.values.role_id}
        //                     onChange={formik.handleChange}
        //                     error={formik.touched.role_id && Boolean(formik.errors.role_id)}
        //                     helperText={formik.touched.role_id && formik.errors.role_id}
        //                     className="w-full"
        //                 />
        //             </div>
        //             <div>
        //                 <Select
        //                     label="Select Company"
        //                     name="company_id"
        //                     value={formik.values.company_id}
        //                     onChange={(value) => formik.setFieldValue("company_id", value)}
        //                     className="w-full"
        //                 >
        //                     {Array.isArray(noFilterData) && noFilterData.length > 0 ? (
        //                         noFilterData.map((company) => (
        //                             <Option key={company?._id} value={company?._id}>
        //                                 {company?.name}
        //                             </Option>
        //                         ))
        //                     ) : (
        //                         <Option disabled>No companies available</Option>
        //                     )}
        //                 </Select>
        //             </div>
        //             {formik.values.permissions.map((permission, index) => (
        //                 <div key={index} className="space-y-4">
        //                     <div className="flex justify-between items-center">
        //                         <h3 className="text-sm font-medium">Permission {index + 1}</h3>
        //                         <button
        //                             type="button"
        //                             onClick={() => handleRemovePermission(index)}
        //                             color="red"
        //                             size="sm"
        //                             className="text-red-500"
        //                         >
        //                             <XIcon className="h-4 w-4" />
        //                         </button>
        //                     </div>
        //                     <div>
        //                         <Input
        //                             label="Model"
        //                             name={`permissions[${index}].model`}
        //                             value={permission.model}
        //                             onChange={(e) =>
        //                                 handlePermissionChange(index, "model", e.target.value)
        //                             }
        //                             className="w-full"
        //                         />
        //                     </div>
        //                     <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        //                         <div className="flex gap-2 items-center">
        //                             <label>Create</label>
        //                             <Switch
        //                                 checked={permission.create}
        //                                 onChange={(value) =>
        //                                     handlePermissionChange(
        //                                         index,
        //                                         "create",
        //                                         value.target.checked,
        //                                     )
        //                                 }
        //                             />
        //                         </div>
        //                         <div className="flex gap-2 items-center">
        //                             <label>View</label>
        //                             <Switch
        //                                 checked={permission.view}
        //                                 onChange={(value) =>
        //                                     handlePermissionChange(
        //                                         index,
        //                                         "view",
        //                                         value.target.checked,
        //                                     )
        //                                 }
        //                             />
        //                         </div>
        //                         <div className="flex gap-2 items-center">
        //                             <label>Edit</label>
        //                             <Switch
        //                                 checked={permission.edit}
        //                                 onChange={(value) =>
        //                                     handlePermissionChange(
        //                                         index,
        //                                         "edit",
        //                                         value.target.checked,
        //                                     )
        //                                 }
        //                             />
        //                         </div>
        //                         <div className="flex gap-2 items-center">
        //                             <label>Delete</label>
        //                             <Switch
        //                                 checked={permission.delete}
        //                                 onChange={(value) =>
        //                                     handlePermissionChange(
        //                                         index,
        //                                         "delete",
        //                                         value.target.checked,
        //                                     )
        //                                 }
        //                             />
        //                         </div>
        //                     </div>
        //                 </div>
        //             ))}

        //             <div className="flex justify-between">
        //                 <Button
        //                     type="button"
        //                     onClick={handleAddPermission}
        //                     className="w-full sm:w-auto"
        //                 >
        //                     Add Permission
        //                 </Button>
        //             </div>

        //             <div className="flex justify-end space-x-2 mt-6">
        //                 <Button
        //                     type="button"
        //                     onClick={onClose}
        //                     color="red"
        //                     className="w-full sm:w-auto"
        //                 >
        //                     Cancel
        //                 </Button>
        //                 <Button
        //                     type="submit"
        //                     color="green"
        //                     className="ml-2 w-full sm:w-auto"
        //                     disabled={!formik.isValid || !formik.dirty}
        //                 >
        //                     {roleToEdit ? "Save Changes" : "Create Role"}
        //                 </Button>
        //             </div>
        //         </form>
        //     </div>
        // </Dialog>
//     );
// };

// CreateRoleForm.propTypes = {
//     open: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     roleToEdit: PropTypes.object,
// };

// export default CreateRoleForm;
