import PropTypes from "prop-types";
import {Dialog} from "@material-tailwind/react";
import MyButton from "../componets/MyButton";

const ConfirmationModal = ({isOpen, onClose, onConfirm}) => {
    

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <div className="p-5">
                <h2 className="text-lg font-bold">Confirm Deletion</h2>
                <p>Are you sure you want to delete this backup email?</p>
                <div className="flex justify-end mt-4">
                    <MyButton label="Delete" onClick={onConfirm} type="danger" />

                    <MyButton
                        label="Cancel"
                        onClick={onClose}
                        type="outlineGray"
                        className="ml-2"
                    />
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
