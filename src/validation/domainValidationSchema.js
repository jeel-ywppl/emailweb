import * as Yup from "yup";

export const domainValidationSchema = Yup.object().shape({
    domain_name: Yup.string()
        .matches(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid domain format")
        .required("Domain name is required"),

    company_id: Yup.string().required("Company selection is required"),

    expiration_date: Yup.date()
        .min(new Date(), "Expiration date must be in the future")
        .required("Expiration date is required"),

    active_status: Yup.string()
        .oneOf(["true", "false"], "Invalid status")
        .required("Status is required"),
        
});
