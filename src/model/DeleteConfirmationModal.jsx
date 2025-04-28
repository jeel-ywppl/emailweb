import {Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";
import MyButton from "../componets/MyButton";

const DeleteConfirmationModal = ({open, handleClose, handleConfirm}) => {
    return (
        <Dialog
            open={open}
            handler={handleClose}
            size="sm"
            animate={{
                mount: {scale: 1, y: 0},
                unmount: {scale: 0.9, y: -100},
            }}
        >
            <DialogHeader>Confirm Deletion</DialogHeader>
            <DialogBody>
                <p>Are you sure you want to delete this company? This action cannot be undone.</p>
            </DialogBody>
            <DialogFooter>
                <MyButton label="Cancel" onClick={handleClose} type="outlineGray" />

                <MyButton
                    label="Delete"
                    onClick={handleConfirm}
                    type="danger" 
                    className="ml-2"
                />
            </DialogFooter>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
