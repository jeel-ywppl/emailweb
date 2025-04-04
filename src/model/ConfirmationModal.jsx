import PropTypes from "prop-types";
import { Button, Dialog} from "@material-tailwind/react";

const ConfirmationModal = ({isOpen, onClose, onConfirm}) => {
    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="p-5">
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p>Are you sure you want to delete this backup email?</p>
                <div className="flex justify-end mt-4">
                    <Button color="red" onClick={onConfirm}>
                        Delete
                    </Button>
                    <Button color="gray" onClick={onClose} className="ml-2">
                        Cancel
                    </Button>
                </div>
            </div>
        </Dialog>
    );
};

ConfirmationModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
