import {useState} from "react";
import {Card, Button, Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import CompanyModal from "../model/CompanyModal";

const DataTable = () => {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [editIndex, setEditIndex] = useState(null);
    const initialValues = {
        name: "",
        address: "",
        phone: "",
        industry: "",
        state: "",
        city: "",
        country: "",
        email: "",
        pin_code: "",
        active_status: "",
    };

    const handleOpen = () => {
        setOpenModal(!openModal);
        setEditIndex(null);
    };

    const handleSubmit = (values, formikHelpers) => {
        if (editIndex !== null) {
            const updatedData = [...data];
            updatedData[editIndex] = values;
            setData(updatedData);
        } else {
            setData([...data, values]);
        }
    
        formikHelpers.resetForm(); 
        handleOpen();
    };
    

    const handleEdit = (index) => {
        setEditIndex(index);
        setOpenModal(true);
    };

    const handleDelete = (index) => {
        setData(data.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {/* Search Input */}
                <div className="relative w-full sm:w-72">
                    <Input
                        type="text"
                        label="Search Domain"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>

                {/* Add Domain Button */}
                <Button color="primary" onClick={handleOpen} className="w-full sm:w-auto">
                    + Add Company
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data
                    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                    .map((item, index) => (
                        <Card
                            key={index}
                            className="p-6 bg-gradient-to-r  text-black border border-gray-400  rounded-xl transition-all transform  hover:shadow-xl"
                        >
                            <h3 className="text-xl font-semibold mb-2">
                                <strong>Name:</strong> {item.name}
                            </h3>
                            <p className="text-md">
                                <strong>Address:</strong> {item.address}, {item.city}, {item.state},{" "}
                                {item.country}
                            </p>
                            <p className="text-md">
                                <strong>Phone:</strong> {item.phone}
                            </p>
                            <p className="text-md">
                                <strong>Email:</strong> {item.email}
                            </p>
                            <p className="text-md">
                                <strong>Industry:</strong> {item.industry}
                            </p>
                            <p className="text-md">
                                <strong>PinCode:</strong> {item.pin_code}
                            </p>
                            <p className="text-md font-bold">
                                <strong>Active:</strong>{" "}
                                <span
                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                                        item.active_status === "true"
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                    }`}
                                >
                                    {item.active_status === "true" ? "Active" : "Inactive"}
                                </span>
                            </p>

                            <div className="mt-4 flex justify-between">
                                <Button
                                    color="light-blue"
                                    size="sm"
                                    onClick={() => handleEdit(index)}
                                    className="bg-white text-blue-700 shadow-md hover:bg-blue-100"
                                >
                                    Edit
                                </Button>
                                <Button
                                    color="red"
                                    size="sm"
                                    onClick={() => handleDelete(index)}
                                    className="bg-white text-red-700 shadow-md hover:bg-red-100"
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))}
            </div>
            <CompanyModal
                open={openModal}
                handleOpen={handleOpen}
                handleSubmit={handleSubmit}
                editIndex={editIndex}
                initialValues={editIndex !== null ? data[editIndex] : initialValues}
            />
        </div>
    );
};

export default DataTable;
