import {Dialog} from "@material-tailwind/react";
import PropTypes from "prop-types";
import MyButton from "../componets/MyButton";

const QRModal = ({imageUrl, onConfirm, open, onCancel}) => {

    return (
        <Dialog
            open={open}
            handler={onCancel}
            aria-labelledby="2fa-dialog-title"
            aria-describedby="2fa-dialog-description"
        >
            <div className="bg-white p-6 rounded-lg shadow-xl w-full space-y-4">
                <h3 className="text-xl font-semibold text-center text-black capitalize mb-4">
                    Set up Two-Factor Authentication
                </h3>
                <img
                    src={imageUrl || "/fallback-qr.png"}
                    alt="QR Code"
                    onError={(e) => (e.target.src = "/fallback-qr.png")}
                    className="w-40 h-40 mx-auto mb-4"
                />

                <p className="text-sm text-center text-gray-600 mb-2">
                    Use an authenticator app like Google Authenticator or Authy to scan the QR code.
                </p>
                <div className="flex justify-center mt-10">
                    <MyButton
                        label="Confirm"
                        onClick={onConfirm}
                        type="primary"
                        className="w-full sm:w-auto py-2 text-sm font-medium"
                    />
                </div>
            </div>
        </Dialog>
    );
};

QRModal.propTypes = {
    open: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default QRModal;
