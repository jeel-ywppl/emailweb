export const getSenderInitials = (email = "") => {
    const parts = email.split(" ");
    return parts.map((p) => p?.[0]?.toUpperCase()).join("");
};
