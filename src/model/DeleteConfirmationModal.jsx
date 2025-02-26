import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";

const DeleteConfirmationModal = ({ open, handleClose, handleConfirm }) => {
    return (
        <Dialog open={open} handler={handleClose} size="sm">
            <DialogHeader>Confirm Deletion</DialogHeader>
            <DialogBody>
                <p>Are you sure you want to delete this company? This action cannot be undone.</p>
            </DialogBody>
            <DialogFooter>
                <Button color="gray" onClick={handleClose}>
                    Cancel
                </Button>
                <Button color="red" onClick={handleConfirm} className="ml-2">
                    Delete
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
