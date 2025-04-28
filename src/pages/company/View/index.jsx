import {useParams, Link, useNavigate} from "react-router-dom";
import {
    Building,
    Mail,
    MapPin,
    Phone,
    User,
    ChevronLeft,
    CheckCircle,
    XCircle,
    Globe,
    Home,
    MapPinned,
} from "lucide-react";
import {useAppDispatch, useAppSelector} from "../../../store";
import {useCallback, useEffect, useState} from "react";
import {deleteCompany, findCompany, getCompany} from "../../../store/company";
import {Button, Card, CardBody, CardHeader, Chip, Typography} from "@material-tailwind/react";
import CompanyModal from "../../../model/CompanyModal";
import DeleteConfirmationModal from "../../../model/DeleteConfirmationModal";
import useCheckAccess from "../../../utils/useCheckAccess";

const CompanyView = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const checkAccess = useCheckAccess();
    const dispatch = useAppDispatch();
    const [company, setCompany] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const {limit, currentPage} = useAppSelector((state) => state.company);

    const getSingleCompany = useCallback(
        async (ID) => {
            try {
                const response = await dispatch(getCompany(ID)).unwrap();
                setCompany(response?.data);
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        },
        [dispatch],
    );

    useEffect(() => {
        if (id) {
            getSingleCompany(id);
        }
    }, [id, getSingleCompany]);

    const handleOpen = () => setOpenModal(true);
    const handleDeleteOpen = () => setDeleteModalOpen(true);

    const confirmDelete = async () => {
        try {
            if (!id) return;

            await dispatch(deleteCompany(id)).unwrap();
            dispatch(findCompany({page: currentPage, limit}));
            console.log("Deleted:", company._id);
            setDeleteModalOpen(false);
            navigate(-1);
        } catch (error) {
            console.error("Error deleting company:", error);
        }
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-6">
                <Link
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center text-sm text-blue-gray-600 hover:text-blue-500"
                >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Back to Companies
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 shadow-lg">
                    <CardHeader floated={false} shadow={false} className="pt-4 pb-0">
                        <div className="flex justify-between items-start">
                            <div>
                                <Typography variant="h4" color="blue-gray">
                                    {company?.name}
                                </Typography>
                                <div className="flex items-center gap-1 mt-1 text-sm text-blue-gray-500">
                                    <Building className="h-4 w-4" />
                                    {company?.industry}
                                </div>
                            </div>
                            <Chip
                                value={
                                    company?.active_status ? (
                                        <div className="flex items-center gap-1">
                                            <CheckCircle className="h-3 w-3" /> Active
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <XCircle className="h-3 w-3" /> Inactive
                                        </div>
                                    )
                                }
                                color={company?.active_status ? "green" : "gray"}
                                variant="ghost"
                            />
                        </div>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-6">
                            <div>
                                <Typography
                                    variant="h6"
                                    className="text-sm text-blue-gray-500 mb-2"
                                >
                                    Contact Information
                                </Typography>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-blue-gray-400" />
                                        <span>{company?.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-blue-gray-400" />
                                        <span>{company?.email}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-blue-gray-100" />
                            <div>
                                <Typography
                                    variant="h6"
                                    className="text-sm text-blue-gray-500 mb-2"
                                >
                                    Address
                                </Typography>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-2">
                                        <Home className="h-4 w-4 text-blue-gray-400 mt-0.5" />
                                        <span>{company?.address}</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-blue-gray-400" />
                                            <span>
                                                {company?.city}, {company?.state}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4 text-blue-gray-400" />
                                            <span>{company?.country}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPinned className="h-4 w-4 text-blue-gray-400" />
                                        <span>PIN: {company?.pin_code}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader floated={false} shadow={false} className="pt-4 pb-0">
                        <Typography variant="h5">Additional Information</Typography>
                    </CardHeader>
                    <CardBody>
                        <div className="space-y-4 text-sm">
                            <div>
                                <Typography
                                    variant="h6"
                                    className="text-sm text-blue-gray-500 mb-2"
                                >
                                    Created By
                                </Typography>
                                <div className="flex items-center gap-2 bg-blue-gray-50 p-3 rounded-md">
                                    <User className="h-5 w-5 text-blue-gray-400" />
                                    <div>
                                        <p className="font-medium">
                                            {company?.createdBy?.fname} {company?.createdBy?.lname}
                                        </p>
                                        <p className="text-xs text-blue-gray-400">
                                            {company?.createdBy?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <hr className="border-blue-gray-100" />
                            <div className="space-y-2">
                                <Typography variant="h6" className="text-sm text-blue-gray-500">
                                    Actions
                                </Typography>
                                <div className="flex flex-col gap-2">
                                    {checkAccess("company", "edit") && (
                                        <Button
                                            variant="outlined"
                                            className="justify-start text-sm"
                                            onClick={handleOpen}
                                        >
                                            Edit Company
                                        </Button>
                                    )}
                                    {checkAccess("company", "delete") && (
                                        <Button
                                            variant="outlined"
                                            color="red"
                                            className="justify-start text-sm"
                                            onClick={handleDeleteOpen}
                                        >
                                            Delete Company
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <CompanyModal
                open={openModal}
                handleOpen={() => setOpenModal(false)}
                editIndex={0}
                initialValues={{
                    id: company?._id,
                    ...company,
                }}
                onSuccess={() => {
                    setOpenModal(false);
                    getSingleCompany(id);
                }}
            />

            <DeleteConfirmationModal
                open={deleteModalOpen}
                handleClose={() => setDeleteModalOpen(false)}
                handleConfirm={confirmDelete}
            />
        </div>
    );
};

export default CompanyView;
