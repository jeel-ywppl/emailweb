import PropTypes from "prop-types";
import {Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";
import MyButton from "../componets/MyButton";

const ConfirmDeleteDomainModal = ({open, onClose, onConfirm, title, message}) => {
    return (
        <Dialog
            open={open}
            handler={onClose}
            animate={{
                mount: {scale: 1, y: 0},
                unmount: {scale: 0.9, y: -100},
            }}
        >
            <DialogHeader>{title}</DialogHeader>
            <DialogBody>{message}</DialogBody>
            <DialogFooter>
                <MyButton label="Cancel" onClick={onClose} type="outlineGray" className="mr-2" />

                <MyButton label="Delete" onClick={onConfirm} type="danger" />
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
