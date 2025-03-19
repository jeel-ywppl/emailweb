import PropTypes from "prop-types";
import { Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { Button } from "flowbite-react";
import { deleteUser, findUser } from "../store/user";
import { useAppDispatch } from "../store";

const DeleteUserModal = ({ isOpen, onClose, user }) => {

    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        if (!user?._id) {
            return;
        }
        await dispatch(deleteUser(user._id));
        dispatch(findUser())
        onClose();
    };

    return (
        <Dialog open={isOpen} handler={onClose}>
            <DialogHeader>Confirm Delete</DialogHeader>
            <DialogBody>
                <Typography>
                    Are you sure you want to delete{" "}
                    <strong className="text-black font-semibold">{user?.fname}</strong>?
                </Typography>
            </DialogBody>
            <DialogFooter>
                <Button variant="text" color="gray" onClick={onClose} className="mr-2">
                    Cancel
                </Button>
                <Button variant="gradient" color="red" onClick={handleDelete}>
                    Delete
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

DeleteUserModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    user: PropTypes.shape({
        _id: PropTypes.string,
        fname: PropTypes.string,
    }),
    removeUserFromState: PropTypes.func, // Add this prop
};

export default DeleteUserModal;