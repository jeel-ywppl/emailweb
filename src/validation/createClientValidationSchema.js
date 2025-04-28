import * as Yup from "yup";

export const createClientValidationSchema = Yup.object({
    company_name: Yup.string().required("Company name is required"),
    subdomain: Yup.string().required("Subdomain is required"),
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    client_email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});
