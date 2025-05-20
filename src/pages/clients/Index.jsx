import {Card, CardBody, CardHeader, Input, Typography} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import MyButton from "../../componets/MyButton";
import {useNavigate} from "react-router-dom";
import {Box, TablePagination} from "@mui/material";
import Loader from "../../componets/Loader";
import UserTableRow from "./TableRow/Index";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../store";
import {setCurrentPage, setLimit, setSkip} from "../../store/client/clientSlice";
import {findClient} from "../../store/client";
import EditClientModal from "../../model/EditClientModal";
import DeleteClientModal from "../../model/DeleteClientModal";
import {useMaterialTailwindController} from "../../context";
import {cardHeaderColorMap} from "../../context/theme";

const Index = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [controller] = useMaterialTailwindController();
    const {sidenavColor} = controller;

    const [search, setSearch] = useState("");
    const [selectedClient, setSelectedClient] = useState(null);
    const [modals, setModals] = useState({
        edit: false,
        delete: false,
    });

    const tableHeaders = [
        "#",
        "Company",
        "User",
        "Client Email",
        "Status",
        "Deployment",
        "Last Updated",
        "Actions",
    ];

    const {client, isLoading, currentPage, limit, totalRecords} = useAppSelector(
        (state) => state.client,
    );

    const openModal = (type, clientData = null) => {
        setSelectedClient(clientData);
        setModals({...modals, [type]: true});
    };

    const closeModal = (type) => {
        setModals({...modals, [type]: false});
        setSelectedClient(null);
    };

    useEffect(() => {
        dispatch(
            findClient({
                page: currentPage,
                limit,
            }),
        );
    }, [dispatch, currentPage, limit]);

    const handlePagination = (event, newPage) => {
        dispatch(setSkip({skip: newPage * limit}));
        dispatch(setCurrentPage({currentPage: newPage + 1}));
    };

    return (
        <div className="p-5 flex flex-col gap-12">
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center justify-between gap-4 w-full">
                <div className="relative w-full sm:max-w-sm">
                    <Input
                        type="text"
                        label="Search Client"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>

                <MyButton
                    onClick={() => navigate("/dashboard/client/create")}
                    label="+ Add New Client"
                    type="sidenav"
                    className="w-full sm:w-auto"
                />
            </div>

            <Card>
                <CardHeader
                    color={cardHeaderColorMap[sidenavColor] || "gray"}
                    className="mb-8 p-6 flex items-center justify-between"
                >
                    <Typography
                        variant="h6"
                        color={cardHeaderColorMap[sidenavColor] === "white" ? "black" : "white"}
                    >
                        Client Table
                    </Typography>
                </CardHeader>

                {isLoading ? (
                    <div className="h-[40vh] flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <CardBody className="overflow-auto px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto text-nowrap">
                            <thead>
                                <tr>
                                    {tableHeaders.map((el) => (
                                        <th key={el} className="border-b py-3 px-5 text-left">
                                            <Typography
                                                variant="small"
                                                className="text-[11px] font-bold uppercase text-blue-gray-400"
                                            >
                                                {el}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {client?.clients
                                    ?.filter(
                                        (item) =>
                                            `${item?.fname} ${item?.lname}`
                                                .toLowerCase()
                                                .includes(search.toLowerCase()) ||
                                            item?.email
                                                ?.toLowerCase()
                                                .includes(search.toLowerCase()),
                                    )
                                    ?.map((item, idx) => (
                                        <UserTableRow
                                            item={item}
                                            idx={(currentPage - 1) * limit + idx}
                                            key={item._id}
                                            openModal={openModal}
                                        />
                                    ))}
                            </tbody>
                        </table>
                    </CardBody>
                )}

                <Box>
                    <TablePagination
                        rowsPerPageOptions={[2, 5, 10, 20, 40]}
                        component="div"
                        count={totalRecords}
                        rowsPerPage={limit}
                        page={Math.max(0, currentPage - 1)}
                        onPageChange={handlePagination}
                        onRowsPerPageChange={(e) => dispatch(setLimit({limit: +e.target.value}))}
                    />
                </Box>
            </Card>
            {modals.edit && selectedClient && (
                <EditClientModal
                    isOpen={modals.edit}
                    clientData={selectedClient}
                    onClose={() => closeModal("edit")}
                    onSave={() => closeModal("edit")}
                    setIsEditModalOpen={(state) => setModals({...modals, edit: state})}
                />
            )}
            {modals.delete && selectedClient && (
                <DeleteClientModal
                    isOpen={modals.delete}
                    onClose={() => closeModal("delete")}
                    clientData={selectedClient}
                />
            )}
        </div>
    );
};

export default Index;
