import PropTypes from "prop-types";
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const ConfirmDeleteDomainModal = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog open={open} handler={onClose}>
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>{message}</DialogBody>
            <DialogFooter>
                <Button color="gray" onClick={onClose} className="mr-2">
                    Cancel
                </Button>
                <Button color="red" onClick={onConfirm}>
                    Delete
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

ConfirmDeleteDomainModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
};

export default ConfirmDeleteDomainModal;
