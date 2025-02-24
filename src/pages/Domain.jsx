import {useState} from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Select,
    Option,
    Card,
} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {useNavigate} from "react-router-dom";

const Domain = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [domains, setDomains] = useState([]);
    const [newDomain, setNewDomain] = useState({domainName: "", company: "", expirationDate: ""});
    const navigate = useNavigate();
    const handleOpen = () => setOpen(!open);

    const handleSubmit = () => {
        if (newDomain.domainName && newDomain.company && newDomain.expirationDate) {
            const newEntry = {
                id: domains.length + 1,
                ...newDomain,
                status: "Active",
            };
            setDomains([...domains, newEntry]);
            setNewDomain({domainName: "", company: "", expirationDate: ""});
            setOpen(false);
        }
    };

    const handleDelete = (id) => {
        setDomains(domains.filter((domain) => domain.id !== id));
    };

    return (
        <div className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
                <Button color="primary" onClick={handleOpen} className="w-full sm:w-auto">
                    + Domain Name
                </Button>
            </div>
            <Card className="overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2">#</th>
                            <th className="px-4 py-2">Domain</th>
                            <th className="px-4 py-2">Company</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Expiration Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {domains.map((domain, index) => (
                            <tr key={domain.id} className="border-t">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{domain.domainName}</td>
                                <td className="px-4 py-2">{domain.company}</td>
                                <td className="px-4 py-2">
                                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
                                        {domain.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{domain.expirationDate}</td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Button
                                        color="gray"
                                        size="sm"
                                        onClick={() => navigate("/dashboard/dnssetting")}
                                    >
                                        Manage
                                    </Button>
                                    <Button
                                        color="red"
                                        size="sm"
                                        onClick={() => handleDelete(domain.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Add Domain</DialogHeader>
                <DialogBody>
                    <div className="space-y-4">
                        <Input
                            label="Domain Name"
                            value={newDomain.domainName}
                            onChange={(e) =>
                                setNewDomain({...newDomain, domainName: e.target.value})
                            }
                        />
                        <Select
                            label="Select Company"
                            value={newDomain.company}
                            onChange={(value) => setNewDomain({...newDomain, company: value})}
                        >
                            <Option value="Google">Google</Option>
                            <Option value="Microsoft">Microsoft</Option>
                            <Option value="Amazon">Amazon</Option>
                        </Select>
                        <Input
                            type="date"
                            label="Expiration Date"
                            value={newDomain.expirationDate}
                            onChange={(e) =>
                                setNewDomain({...newDomain, expirationDate: e.target.value})
                            }
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button color="gray" onClick={handleOpen} className="mr-2">
                        Cancel
                    </Button>
                    <Button color="blue" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
};

export default Domain;
