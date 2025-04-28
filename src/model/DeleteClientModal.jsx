import PropTypes from "prop-types";
import {Dialog, DialogBody, DialogFooter, DialogHeader, Typography} from "@material-tailwind/react";
import { deleteClient, findClient } from "../store/client";
import {useAppDispatch} from "../store";
import MyButton from "../componets/MyButton";

const DeleteClientModal = ({isOpen, onClose, clientData}) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (!clientData?._id) return;

        await dispatch(deleteClient(clientData._id));
        dispatch(findClient());
        onClose();
    };

    return (
        <>
            <Dialog
                open={isOpen}
                handler={onClose}
                animate={{
                    mount: {scale: 1, y: 0},
                    unmount: {scale: 0.9, y: -100},
                }}
            >
                <DialogHeader>Confirm Delete</DialogHeader>
                <DialogBody>
                    <Typography>
                        Are you sure you want to delete{" "}
                        <strong className="text-black font-semibold">{clientData?.company_name}</strong>?
                    </Typography>
                </DialogBody>
                <DialogFooter>
                    <MyButton
                        label="Cancel"
                        onClick={onClose}
                        type="outlineGray"
                        className="mr-2"
                    />

                    <MyButton
                        label="Delete"
                        onClick={handleDelete}
                        type="danger"
                        className="mr-2"
                    />
                </DialogFooter>
            </Dialog>
        </>
    );
};

DeleteClientModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    clientData: PropTypes.shape({
        _id: PropTypes.string,
        company_name: PropTypes.string,
    }),
};

export default DeleteClientModal;
