import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
} from "@material-tailwind/react";
import {deleteUser, findUser} from "../store/user";
import {useAppDispatch} from "../store";

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
                    <Button color="gray" onClick={onClose} className="mr-2">
                        Cancel
                    </Button>
                    <Button color="red" onClick={handleDelete} className="mr-2">
                        Delete
                    </Button>
                    <Button color="green" >
                        Backup
                    </Button>
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
