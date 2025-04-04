import * as Yup from "yup";

export const createRoleValidationSchema = Yup.object().shape({
    role_name: Yup.string(),
    role_id: Yup.number(),
    company_id: Yup.string(),
    active_status: Yup.boolean(),
});
