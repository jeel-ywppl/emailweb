import {useState} from "react";
import {useAppSelector, useAppDispatch} from "../store";
import {editUser, getUser} from "../store/user";
import {Card, CardBody, Avatar, Typography, Tooltip, Button, Input} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {CircularProgress} from "@mui/material";
import ProfileInfoCard from "../widgets/cards/profile-info-card";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {config} from "../utils/util";

const Profile = () => {
    const dispatch = useAppDispatch();
    const {isLoading, user} = useAppSelector((state) => state.auth);
    const [isEditing, setIsEditing] = useState(false);

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required("First name is required"),
        lname: Yup.string().required("Last name is required"),
        phone_number: Yup.string().required("Phone number is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        country: Yup.string().required("country is required"),
        bio: Yup.string().required("Bio is required"),
        designation: Yup.string().required("Designation is required"),
    });

    const handleSubmit = async (values) => {
        const formData = new FormData();
        Object.keys(values).forEach((key) => {
            formData.append(key, values[key]);
        });
        await dispatch(editUser({id: user._id, updatedData: formData}));
        getUser();
        setIsEditing(false);
    };

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
                                {user?.avatar ? (
                                    <Avatar
                                        src={
                                            user?.avatar.startsWith("http")
                                                ? user?.avatar
                                                : `${config.BASE_URL}/${user?.avatar}`
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
                        <Formik
                            initialValues={{
                                fname: user?.fname || "",
                                lname: user?.lname || "",
                                phone_number: user?.phone_number || "",
                                email: user?.email || "",
                                country: user?.country || "",
                                designation: user?.designation || "",
                                bio: user?.bio || "",
                                avatar: user?.avatar || null,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({setFieldValue}) => (
                                <Form className="mb-12 space-y-4">
                                    <Field name="fname">
                                        {({field}) => (
                                            <Input {...field} label="First Name" required />
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="fname"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="lname">
                                        {({field}) => (
                                            <Input {...field} label="Last Name" required />
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="lname"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="phone_number">
                                        {({field}) => (
                                            <Input {...field} label="Phone Number" required />
                                        )}
                                    </Field>
                                    <ErrorMessage
                                        name="phone_number"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="email">
                                        {({field}) => <Input {...field} label="Email" required />}
                                    </Field>
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="country">
                                        {({field}) => <Input {...field} label="country" required />}
                                    </Field>
                                    <ErrorMessage
                                        name="country"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="bio">
                                        {({field}) => <Input {...field} label="Bio" required />}
                                    </Field>
                                    <ErrorMessage
                                        name="bio"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Field name="designation">
                                        {({field}) => <Input {...field} label="designation" required />}
                                    </Field>
                                    <ErrorMessage
                                        name="designation"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Input
                                        type="file"
                                        name="avatar"
                                        onChange={(event) => {
                                            setFieldValue("avatar", event.currentTarget.files[0]);
                                        }}
                                    />
                                    <ErrorMessage
                                        name="avatar"
                                        component="div"
                                        className="text-red-500"
                                    />

                                    <Button type="submit" className="mt-4">
                                        Save Changes
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    ) : (
                        <div className="grid-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                            <ProfileInfoCard
                                title="Profile Information"
                                description={user.bio || "No bio available."}
                                details={{
                                    "first name": user?.fname,
                                    "phone no": user?.phone_number,
                                    email: user?.email,
                                    country: user?.country,
                                    designation: user?.designation,
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
