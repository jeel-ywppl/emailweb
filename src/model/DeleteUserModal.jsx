import PropTypes from "prop-types";
import {
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import {deleteUser, findUser} from "../store/user";
import {useAppDispatch} from "../store";
import MyButton from "../componets/MyButton";

const DeleteUserModal = ({isOpen, onClose, user}) => {
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (!user?._id) return;

        await dispatch(deleteUser(user._id));
        dispatch(findUser());
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
                        <strong className="text-black font-semibold">{user?.fname}</strong>?
                    </Typography>
                    <Typography>Do you want to backup the user before deletation?</Typography>
                </DialogBody>
                <DialogFooter>
                    <MyButton  label="Cancel" onClick={onClose} type="outlineGray" className="mr-2" />

                    <MyButton label="Delete" onClick={handleDelete} type="danger" className="mr-2" />

                    <MyButton label="Backup" type="outlineBlack" />
                </DialogFooter>
            </Dialog>
        </>
    );
};

DeleteUserModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.shape({
        _id: PropTypes.string,
        fname: PropTypes.string,
    }),
};

export default DeleteUserModal;
