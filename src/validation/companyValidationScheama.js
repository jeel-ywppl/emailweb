import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
    name: Yup.string().required("Company Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be numeric")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
    industry: Yup.string().required("Industry is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    pin_code: Yup.string()
        .matches(/^[0-9]+$/, "Pin Code must be numeric")
        .min(5, "Pin Code must be at least 5 digits")
        .required("Pin Code is required"),
    active_status: Yup.string().oneOf(["true", "false"], "Active Status is required").required("Active Status is required"),
});
