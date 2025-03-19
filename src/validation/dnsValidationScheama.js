import * as Yup from "yup";

export const dnsValidationSchema = Yup.object().shape({
    // recordName: Yup.string()
    //     .nullable()
    //     .transform((value, originalValue, context) => {
    //         return originalValue?.trim() ? originalValue : context.parent.type;
    //     })
    //     .max(255, "Record Name cannot exceed 255 characters"),

    // type: Yup.string()
    //     .oneOf(["A", "MX", "AAAA", "CNAME", "TXT"], "Invalid record type")
    //     .required("Type is required"),

    // name: Yup.string()
    //     .required("Name is required")
    //     .matches(/^[a-zA-Z0-9.-]+$/, "Invalid name format"),

    // priority: Yup.number()
    //     .nullable()
    //     .when("type", {
    //         is: "MX",
    //         then: (schema) =>
    //             schema
    //                 .required("Priority is required for MX records")
    //                 .min(0, "Priority must be at least 0"),
    //     }),

    // mailserver: Yup.string()
    //     .nullable()
    //     .when("type", {
    //         is: "MX",
    //         then: (schema) =>
    //             schema
    //                 .required("Mail Server is required for MX records")
    //                 .matches(/^[a-zA-Z0-9.-]+$/, "Invalid mail server format"),
    //     }),

    // target: Yup.string()
    //     .nullable()
    //     .when("type", {
    //         is: "CNAME",
    //         then: (schema) =>
    //             schema
    //                 .required("Target is required for CNAME records")
    //                 .matches(/^[a-zA-Z0-9.-]+$/, "Invalid target format"),
    //     }),

    // txtvalue: Yup.string()
    //     .nullable()
    //     .when("type", {
    //         is: "TXT",
    //         then: (schema) =>
    //             schema
    //                 .required("TXT Value is required for TXT records")
    //                 .max(512, "TXT Value cannot exceed 512 characters"),
    //     }),

    // pointsTo: Yup.string()
    //     .nullable()
    //     .when("type", {
    //         is: (type) => type === "A" || type === "AAAA",
    //         then: (schema) =>
    //             schema
    //                 .required("Points To is required for A and AAAA records")
    //                 .matches(
    //                     /^(\d{1,3}\.){3}\d{1,3}$|^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/,
    //                     "Invalid IP address format",
    //                 ),
    //     }),

    // ttl: Yup.number()
    //     .required("TTL is required")
    //     .min(60, "TTL must be at least 60 seconds")
    //     .max(86400, "TTL cannot exceed 86400 seconds"),

});
