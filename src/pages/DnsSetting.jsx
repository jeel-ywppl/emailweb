import {useState} from "react";
import {
    Select,
    MenuItem,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box,
    Card,
} from "@mui/material";
import {Button} from "@material-tailwind/react";
import {BiEditAlt} from "react-icons/bi";
import {AiTwotoneDelete} from "react-icons/ai";

const recordTypes = ["A", "MX", "AAAA", "CNAME", "TXT"];

const DnsSetting = () => {
    const [records, setRecords] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [newRecord, setNewRecord] = useState({
        type: "A",
        recordName: "",
        name: "",
        priority: "",
        pointsTo: "",
        content: "",
        ttl: "",
    });

    const handleAddRecord = () => {
        if (editingIndex !== null) {
            const updatedRecords = [...records];
            updatedRecords[editingIndex] = newRecord;
            setRecords(updatedRecords);
            setEditingIndex(null);
        } else {
            setRecords([...records, newRecord]);
        }
        setNewRecord({
            type: "A",
            recordName: "",
            name: "",
            priority: "",
            content: "",
            ttl: "",
            pointsTo: "",
        });
    };

    const handleEditRecord = (index) => {
        setNewRecord(records[index]);
        setEditingIndex(index);
    };

    const handleDeleteRecord = (index) => {
        setRecords(records.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        console.log("Submitting:", {records});
        // API call to submit records
    };

    return (
        <div className="w-full p-6 space-y-6">
            <Card className="p-6 border border-gray-300 space-y-4">
                <Box className="flex items-center flex-wrap gap-4">
                    <TextField
                        className="w-full sm:w-56"
                        label="Custom Record Name"
                        value={newRecord.recordName}
                        onChange={(e) => setNewRecord({...newRecord, recordName: e.target.value})}
                    />
                    <Select
                        className="w-full sm:w-48"
                        value={newRecord.type}
                        onChange={(e) => setNewRecord({...newRecord, type: e.target.value})}
                    >
                        {recordTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        className="w-full sm:w-56"
                        label="Name"
                        value={newRecord.name}
                        onChange={(e) => setNewRecord({...newRecord, name: e.target.value})}
                    />
                    {newRecord.type === "MX" && (
                        <TextField
                            className="w-full sm:w-48"
                            label="Priority"
                            value={newRecord.priority}
                            onChange={(e) => setNewRecord({...newRecord, priority: e.target.value})}
                        />
                    )}
                    {newRecord.type === "MX" && (
                        <TextField
                            className="w-full sm:w-56"
                            label="Mail Server"
                            value={newRecord.mailserver}
                            onChange={(e) =>
                                setNewRecord({...newRecord, mailserver: e.target.value})
                            }
                        />
                    )}
                    {newRecord.type === "CNAME" && (
                        <TextField
                            className="w-full sm:w-56"
                            label="Target"
                            value={newRecord.target}
                            onChange={(e) => setNewRecord({...newRecord, target: e.target.value})}
                        />
                    )}
                    {newRecord.type === "TXT" && (
                        <TextField
                            className="w-full sm:w-72"
                            label="TXT Value"
                            value={newRecord.txtvalue}
                            onChange={(e) => setNewRecord({...newRecord, txtvalue: e.target.value})}
                        />
                    )}
                    {(newRecord.type === "A" || newRecord.type === "AAAA") && (
                        <TextField
                            className="w-full sm:w-56"
                            label="Points to"
                            value={newRecord.pointsTo}
                            onChange={(e) => setNewRecord({...newRecord, pointsTo: e.target.value})}
                        />
                    )}
                    <TextField
                        className="w-full sm:w-48"
                        label="TTL"
                        value={newRecord.ttl}
                        onChange={(e) => setNewRecord({...newRecord, ttl: e.target.value})}
                    />
                    <div className="flex justify-end">
                        <Button
                            className=""
                            variant="contained"
                            color="primary"
                            onClick={handleAddRecord}
                        >
                            {editingIndex !== null ? "Update Record" : "Add Record"}
                        </Button>
                    </div>
                </Box>
            </Card>

            {/* Records Table */}
            <div className="w-full max-w-full overflow-auto">
                <TableContainer component={Paper} className="shadow-md border border-gray-300">
                    <Table className="min-w-max">
                        <TableHead>
                            <TableRow className="bg-gray-200">
                                <TableCell className="font-semibold w-28">Custom Name</TableCell>
                                <TableCell className="font-semibold w-28">Type</TableCell>
                                <TableCell className="font-semibold w-44">Name</TableCell>
                                <TableCell className="font-semibold w-32">Priority</TableCell>
                                <TableCell className="font-semibold w-[550px] break-all whitespace-normal">
                                    Content
                                </TableCell>
                                <TableCell className="font-semibold w-32">TTL</TableCell>
                                <TableCell className="font-semibold w-40 text-center">
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {records.map((record, index) => (
                                <TableRow key={index} className="hover:bg-gray-100">
                                    <TableCell className="break-all whitespace-normal">
                                        {record.recordName || record.type}
                                    </TableCell>
                                    <TableCell>{record.type}</TableCell>
                                    <TableCell className="break-all whitespace-normal">
                                        {record.name}
                                    </TableCell>
                                    <TableCell>{record.priority || "0"}</TableCell>
                                    <TableCell className="w-[550px] break-all whitespace-normal">
                                        {record.type === "A" || record.type === "AAAA"
                                            ? record.pointsTo
                                            : record.type === "MX"
                                            ? record.mailserver
                                            : record.type === "CNAME"
                                            ? record.target
                                            : record.type === "TXT"
                                            ? record.txtvalue
                                            : record.content}
                                    </TableCell>
                                    <TableCell>{record.ttl}</TableCell>
                                    <TableCell className="flex justify-center space-x-2 truncate">
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEditRecord(index)}
                                        >
                                            <BiEditAlt />
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDeleteRecord(index)}
                                        >
                                            <AiTwotoneDelete />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Button variant="contained" color="success" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
};

export default DnsSetting;
