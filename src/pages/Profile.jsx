import {useEffect, useState} from "react";
import {useAppSelector, useAppDispatch} from "../store";
import {editUser} from "../store/user";
import {Card, CardBody, Avatar, Typography, Tooltip, Button, Input} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {CircularProgress} from "@mui/material";
import ProfileInfoCard from "../widgets/cards/profile-info-card";
import {config} from "../utils/util";
import {useFormik} from "formik";
import {ProfilevalidationSchema} from "../validation/ProfilevalidationSchema";
import {getUserInfo} from "../store/auth";

const Profile = () => {
    const dispatch = useAppDispatch();
    const {isLoading, user} = useAppSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || "");

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedAvatar(file);
            setPreviewAvatar(URL.createObjectURL(file));
        }
    };

    const formik = useFormik({
        initialValues: {
            avatar: user?.avatar,
            fname: user?.fname || "",
            lname: user?.lname || "",
            email: user?.email || "",
            phone_number: user?.phone_number || "",
            country: user?.country || "",
            bio: user?.bio || "",
            designation: user?.designation || "",
        },
        validationSchema: ProfilevalidationSchema,
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            try {
                const formData = new FormData();
                if (selectedAvatar) {
                    formData.append("avatar", selectedAvatar);
                }
                formData.append("fname", values?.fname);
                formData.append("lname", values?.lname);
                formData.append("email", values?.email);
                formData.append("phone_number", values?.phone_number);
                formData.append("country", values?.country);
                formData.append("bio", values?.bio);
                formData.append("designation", values?.designation);
                const response = await dispatch(editUser({id: user._id, updatedData: formData}));
                console.log("Edit User Response:", response);
                if (response?.payload?.success) {
                    dispatch(getUserInfo());
                    setPreviewAvatar(
                        selectedAvatar ? URL.createObjectURL(selectedAvatar) : user?.avatar,
                    );
                    formik.setValues({
                        ...values,
                        avatar: selectedAvatar ? selectedAvatar.name : user.avatar,
                    });

                    setIsEditing(false);
                } else {
                    setFieldError(
                        "general",
                        response?.payload?.message || "Failed to update user.",
                    );
                }
            } catch {
                setFieldError("general", "Submission failed. Try again.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    useEffect(() => {
        if (user) {
            setIsEditing(false);
            setPreviewAvatar(user?.avatar || "");
            formik.setValues({
                avatar: user?.avatar,
                fname: user?.fname,
                lname: user?.lname,
                email: user?.email,
                phone_number: user?.phone_number,
                country: user?.country,
                bio: user?.bio,
                designation: user?.designation,
            });
        }
    }, [user]);

    return (
        <>
            {isLoading && <CircularProgress />}
            {!isLoading && user && (
                <div className="relative mt-2 h-64 w-full overflow-hidden rounded-xl bg-[url('/imgs/background-image.png')] bg-cover bg-center">
                    <div className="absolute inset-0 h-full w-full bg-gray-900/25" />
                </div>
            )}
            <Card className="mx-3 -mt-20 mb- lg:mx-4 border border-blue-gray-100">
                <CardBody className="p-4">
                    <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                {previewAvatar ? (
                                    <Avatar
                                        src={
                                            previewAvatar.startsWith("http")
                                                ? previewAvatar
                                                : `${config.BASE_URL}/${previewAvatar}`
                                        }
                                        alt={user?.fname}
                                        size="xl"
                                        variant="rounded"
                                        className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                                    />
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center rounded-lg shadow-lg shadow-blue-gray-500/40 bg-gray-200">
                                        <Typography variant="h6" color="blue-gray">
                                            {user?.fname?.charAt(0).toUpperCase()}
                                            {user?.lname?.charAt(0).toUpperCase()}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                            <div>
                                <Typography variant="h5" color="blue-gray" className="mb-1">
                                    {user?.fname} {user?.lname}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-blue-gray-600"
                                >
                                    {user?.role}
                                </Typography>
                            </div>
                        </div>
                        <Tooltip content="Edit Profile">
                            <PencilIcon
                                className="h-4 w-4 cursor-pointer text-blue-gray-500"
                                onClick={() => setIsEditing(!isEditing)}
                            />
                        </Tooltip>
                    </div>

                    {isEditing ? (
                        <form onSubmit={formik.handleSubmit} className="mb-12 space-y-4">
                            <div className="flex items-center space-x-6">
                                <div className="shrink-0">
                                    <img
                                        id="preview_img"
                                        className="h-16 w-16 object-cover rounded-full"
                                        src={previewAvatar || "https://via.placeholder.com/150"}
                                        alt="Current profile"
                                    />
                                </div>
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        onChange={handleAvatarChange}
                                        className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    />
                                </label>
                            </div>
                            <Input
                                name="fname"
                                label="First Name"
                                value={formik.values.fname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.fname && formik.errors.fname && (
                                <div className="text-red-500 text-xs">{formik.errors.fname}</div>
                            )}
                            <Input
                                name="lname"
                                label="Last Name"
                                value={formik.values.lname}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.lname && formik.errors.lname && (
                                <div className="text-red-500 text-xs">{formik.errors.lname}</div>
                            )}
                            <Input
                                name="phone_number"
                                label="Phone Number"
                                value={formik.values.phone_number}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.phone_number && formik.errors.phone_number && (
                                <div className="text-red-500 text-xs">
                                    {formik.errors.phone_number}
                                </div>
                            )}
                            <Input
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-xs">{formik.errors.email}</div>
                            )}
                            <Input
                                name="country"
                                label="Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                required
                            />
                            {formik.touched.country && formik.errors.country && (
                                <div className="text-red-500 text-xs">{formik.errors.country}</div>
                            )}
                            <Input
                                name="bio"
                                label="Bio"
                                value={formik.values.bio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <Input
                                name="designation"
                                label="Designation"
                                value={formik.values.designation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            <Button type="submit" className="mt-4">
                                Save Changes
                            </Button>
                        </form>
                    ) : (
                        <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                            <ProfileInfoCard
                                title="Profile Information"
                                description={user?.bio || "No bio available."}
                                details={{
                                    "First Name": user?.fname,
                                    "Phone No": user?.phone_number,
                                    Email: user?.email,
                                    Country: user?.country,
                                    Designation: user?.designation,
                                }}
                            />
                        </div>
                    )}
                </CardBody>
            </Card>
        </>
    );
};

export default Profile;
