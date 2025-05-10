import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUserInfo} from "../../store/auth";
import {useAppDispatch, useAppSelector} from "../../store";
import {deleteBackupData, findBackupEmails} from "../../store/backup";
import ConfirmationModal from "../../model/ConfirmationModal";
import {Card, CardHeader, CardBody, Typography, Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Loader from "../../componets/Loader";
import UserTableRow from "./TableRow/Index";

const Backup = () => {
    const dispatch = useAppDispatch();
    const [isModalOpen, setModalOpen] = useState(false);
    const [emailToDelete, setEmailToDelete] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const {user, isLoading} = useAppSelector((state) => state.auth);

    // useEffect(() => {
    //     if (!user || !user.backup_emails || user.backup_emails.length === 0) {
    //         console.log("Dispatching getUserInfo...");
    //         dispatch(getUserInfo());
    //     }
    // }, [dispatch, user]);

    const handleEdit = async (backupEmail) => {
        await dispatch(findBackupEmails({userEmail: backupEmail}));
        navigate(`/dashboard/backup/backup_emails?email=${backupEmail}`);
    };

    const handleDelete = async () => {
        await dispatch(deleteBackupData({backup_email: emailToDelete}));
        setModalOpen(false);
        dispatch(getUserInfo());
    };

    return (
        <div className="mb-8 flex flex-col gap-12 p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="relative w-full max-w-sm">
                    <Input
                        type="text"
                        label="Search Email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pr-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
            </div>
            {isLoading && <Loader />}
            {!isLoading && user && (
                <Card>
                    <CardHeader
                        variant="gradient"
                        color="gray"
                        className="mb-8 p-6 flex items-center gap-4 justify-between"
                    >
                        <Typography variant="h6" color="white">
                            Backup Emails
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-auto px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] text-nowrap table-auto">
                            <thead>
                                <tr>
                                    {["Email", "Deleted At", "Backup Created At", "Actions"].map(
                                        (el) => (
                                            <th
                                                key={el}
                                                className="border-b border-blue-gray-50 py-3 px-5 text-left"
                                            >
                                                <Typography
                                                    variant="small"
                                                    className="text-[11px] font-bold uppercase text-blue-gray-400"
                                                >
                                                    {el}
                                                </Typography>
                                            </th>
                                        ),
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {(user?.backup_emails || [])
                                    ?.filter((item) =>
                                        item?.backup_email
                                            .toLowerCase()
                                            .includes(search.toLowerCase()),
                                    )
                                    .map((item,index) => {
                                        return (
                                            <UserTableRow
                                            item={item}
                                            index={index}
                                            key={index * Math.random()}
                                            openEditModal={handleEdit}
                                            setModalOpen={setModalOpen}
                                            setEmailToDelete={setEmailToDelete}
                                        />
                                        );
                                    })}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            )}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};


export default Backup;
