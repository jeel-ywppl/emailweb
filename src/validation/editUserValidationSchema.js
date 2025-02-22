import * as Yup from "yup";

export const editUserValidationSchema = Yup.object({
    email: Yup.string()
        .trim()
        .matches(/^[a-zA-Z0-9._%+-]+$/, "Invalid email format")
        .required("Email is required"),
    sub_domain: Yup.string().required("Subdomain is required"),
    phone_number: Yup.string()
        .trim()
        .matches(/^\d{10}$/, "Phone number must be 10 digits")
        .required("Phone number is required"),
    recovery_email: Yup.string().trim().email("Invalid email format").notRequired(),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must have at least one uppercase letter")
        .matches(/[a-z]/, "Password must have at least one lowercase letter")
        .matches(/[0-9]/, "Password must have at least one number")
        .matches(/[@$!%*?&#]/, "Password must have at least one special character")
        .notRequired(),
});
