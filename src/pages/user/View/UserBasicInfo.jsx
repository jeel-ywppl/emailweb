import {Card, CardHeader, Typography} from "@material-tailwind/react";
import {CardContent} from "@mui/material";
import {Mail, Building, Flag, MessageSquareText, User as UserIcon} from "lucide-react";
import PropTypes from "prop-types";

const UserBasicInfo = ({user}) => {

    return (
        <div className="grid grid-cols-1 gap-6 space-y-6">
            <Card>
                <CardHeader variant="gradient" color="gray">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-lg flex items-center gap-2 p-3 bg-"
                    >
                        <UserIcon className="h-5 w-5" />
                        Personal Information
                    </Typography>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                First Name
                            </h3>
                            <p>{user?.fname}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Last Name
                            </h3>
                            <p>{user?.lname}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Email
                            </h3>
                            <p className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Phone
                            </h3>
                            <p>{user?.phone_number || "Not provided"}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Country
                            </h3>
                            <div className="flex items-center gap-1">
                                <Flag className="h-4 w-4" />
                                <p>{user?.country || "Not specified"}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Designation
                            </h3>
                            <p>{user?.designation || "Not specified"}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader variant="gradient" color="gray">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-lg flex items-center gap-2 p-3"
                    >
                        <Building className="h-5 w-5" />
                        Company & Role
                    </Typography>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Company ID
                            </h3>
                            <p>{user?.company_id?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Role
                            </h3>
                            <p>{user?.role_id?.role_name}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {user?.bio && (
                <Card>
                    <CardHeader variant="gradient" color="gray">
                        <Typography
                            variant="h6"
                            color="white"
                            className="text-lg flex items-center gap-2 p-3"
                        >
                            <MessageSquareText className="h-5 w-5" />
                            Bio
                        </Typography>
                    </CardHeader>
                    <CardContent>
                        <p>{user?.bio}</p>
                    </CardContent>
                </Card>
            )}

            <Card>
                <CardHeader variant="gradient" color="gray">
                    <Typography
                        variant="h6"
                        color="white"
                        className="text-lg flex items-center gap-2 p-3"
                    >
                        <Mail className="h-5 w-5" />
                        Backup Emails
                    </Typography>
                </CardHeader>
                <CardContent>
                    {user?.backup_emails && user?.backup_emails.length > 0 ? (
                        <ul className="space-y-2">
                            {user?.backup_emails.map((backupEmail, index) => (
                                <li key={index} className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span>{backupEmail?.backup_email}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">
                                        Added on{" "}
                                        {new Date(
                                            backupEmail?.backup_createdAt,
                                        ).toLocaleDateString()}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No backup emails added</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

UserBasicInfo.propTypes = {
    user: PropTypes.shape({
        fname: PropTypes.string,
        lname: PropTypes.string,
        email: PropTypes.string,
        phone_number: PropTypes.string,
        country: PropTypes.string,
        designation: PropTypes.string,
        company_id: PropTypes.shape({
            name: PropTypes.string,
        }),
        role_id: PropTypes.shape({
            role_name: PropTypes.string,
        }),
        bio: PropTypes.string,
        backup_emails: PropTypes.arrayOf(
            PropTypes.shape({
                backup_email: PropTypes.string,
                backup_createdAt: PropTypes.string,
            }),
        ),
    }),
};

UserBasicInfo.defaultProps = {
    user: null,
};

export default UserBasicInfo;
