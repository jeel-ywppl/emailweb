import {Dialog, Typography} from "@material-tailwind/react";
import PropTypes from "prop-types";
import MyButton from "../componets/MyButton";

const DeleteRoleModal = ({open, onClose, onConfirm, roleId}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <div className="p-5">
                <Typography variant="h6" className="mb-4">
                    Confirm Deletion
                </Typography>
                <Typography className="mb-4">
                    Are you sure you want to delete this role? This action cannot be undone.
                </Typography>
                <div className="flex justify-end space-x-2">
                    <MyButton
                        label="Cancel"
                        htmlType="button"
                        onClick={onClose}
                        type="outlineGray"
                        className="w-full sm:w-auto"
                    />
                    <MyButton
                        label="delete"
                        onClick={() => {
                            onConfirm(roleId);
                            onClose();
                        }}
                        type="danger" 
                        className="w-full sm:w-auto"
                    />
                </div>
            </div>
        </Dialog>
    );
};

DeleteRoleModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    roleId: PropTypes.string.isRequired,
};

export default DeleteRoleModal;
