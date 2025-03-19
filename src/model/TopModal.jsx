import {Button, Dialog, DialogHeader, DialogBody, DialogFooter} from "@material-tailwind/react";
import PropTypes from "prop-types"; 

const TopModal = ({onComplete, is2FAEnabled}) => {
    return (
        <Dialog open={true} aria-labelledby="dialogTitle" aria-describedby="dialogDescription">
            <DialogHeader id="dialogTitle">
                {is2FAEnabled ? "Two-factor Authentication Disabled" : "Two-factor Authentication Enabled"}
            </DialogHeader>
            <DialogBody id="dialogDescription">
                <p className="text-gray-600">
                    {is2FAEnabled
                        ? "Your account is no longer protected with two-factor authentication."
                        : "Your account is now protected with two-factor authentication."}
                </p>
            </DialogBody>
            <DialogFooter>
                <Button onClick={onComplete}>Done</Button>
            </DialogFooter>
        </Dialog>
    );
};

TopModal.propTypes = {
    onComplete: PropTypes.func.isRequired, 
    is2FAEnabled: PropTypes.bool.isRequired, 
};

export default TopModal;
