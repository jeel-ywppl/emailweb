import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
    fname: Yup.string()
        .required("First name is required")
        .min(1, "First name must be at least 2 characters long"),
    lname: Yup.string()
        .required("Last name is required")
        .min(1, "Last name must be at least 2 characters long"),
    // email: Yup.string()
    //     .matches(/^[a-zA-Z0-9._%+-]+$/, "Invalid email format")
    //     .required("Email is required"),
    domain_id: Yup.string().required("Subdomain is required"),
    phone_number: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(10, "Phone number must be at least 10 digits long"),
    recovery_email: Yup.string()
        .email("Invalid recovery email format")
        .required("Recovery email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters long"),
});
