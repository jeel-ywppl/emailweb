import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogBody,
    DialogFooter,
    Button,
    Input,
    Typography,
} from "@material-tailwind/react";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {createModule, editModule, findModules} from "../store/modules";

const CreateModual = ({onClose, open, roleToEdit, isEditMode}) => {
    const dispatch = useDispatch();
    const [moduleName, setModuleName] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditMode && roleToEdit) {
            setModuleName(roleToEdit.name);
        } else {
            setModuleName("");
        }
    }, [isEditMode, roleToEdit]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose(); 
            } else if (e.key === "Enter" && moduleName) {
                handleSubmit(); 
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, moduleName]);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (isEditMode && roleToEdit) {
                await dispatch(editModule({id: roleToEdit._id, updatedData: {name: moduleName}}));
            } else {
                await dispatch(createModule({name: moduleName}));
            }
            dispatch(findModules());
            setModuleName("");
            onClose();
        } catch {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogBody divider className="px-6 py-4">
                <Typography variant="h6" className="text-center font-semibold text-gray-700 mb-4">
                    {isEditMode ? "Edit Module" : "Create Module"}
                </Typography>

                <div className="flex flex-col gap-4">
                    <Input
                        label="Module Name"
                        value={moduleName}
                        onChange={(e) => setModuleName(e.target.value)}
                        disabled={loading}
                        className="bg-white"
                    />
                </div>
            </DialogBody>
            <DialogFooter className="flex justify-between gap-4 p-4">
                <Button
                    color="gray"
                    onClick={onClose}
                    disabled={loading}
                    className="w-full md:w-auto"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSubmit}
                    disabled={loading || !moduleName}
                    className="w-full md:w-auto"
                >
                    {isEditMode ? "Update" : "Create"}
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

CreateModual.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    roleToEdit: PropTypes.object,
    isEditMode: PropTypes.bool.isRequired,
};

CreateModual.defaultProps = {
    roleToEdit: null,
};

export default CreateModual;
