import * as Yup from "yup";

export const ProfilevalidationSchema = Yup.object({
    fname: Yup.string().required("First name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone_number: Yup.string().required("Phone number is required"),
    country: Yup.string().required("Country is required"),
    bio: Yup.string(),
    designation: Yup.string(),
})