import {Button, Dialog, Input, Typography} from "@material-tailwind/react";
import {Eye, EyeOff} from "lucide-react";
import PropTypes from "prop-types";

const EnvEditDialog = ({
    editingEnv,
    newValue,
    setEditingEnv,
    setNewValue,
    visibleSecrets,
    toggleSecretVisibility,
    isSecretKey,
    onClose,
    onSave,
    mode,
    formErrors
}) => {
    return (
        <Dialog open={!!editingEnv} handler={() => onClose()}>
            {editingEnv && (
                <div className="p-6">
                    {" "}
                    <Typography variant="h5" color="blue-gray" className="mb-4">
                        {editingEnv.key ? "Edit Environment Variable" : "Add Environment Variable"}
                    </Typography>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name:</label>
                        <Input
                            value={editingEnv.key}
                            onChange={(e) =>
                                setEditingEnv((prev) => ({
                                    ...prev,
                                    key: e.target.value,
                                }))
                            }
                            disabled={mode === "edit"}
                            className="bg-gray-100 dark:bg-gray-700"
                        />
                        {formErrors.key && <p className="text-red-500 text-sm">{formErrors.key}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">Value:</label>
                        <div className="relative">
                            <Input
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                type={
                                    isSecretKey(editingEnv.key) && !visibleSecrets[editingEnv.key]
                                        ? "password"
                                        : "text"
                                }
                            />
                            {isSecretKey(editingEnv.key) && (
                                <button
                                    type="button"
                                    size="sm"
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                                    onClick={() => toggleSecretVisibility(editingEnv.key)}
                                >
                                    {visibleSecrets[editingEnv.key] ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            )}
                            {formErrors.value && (
                                <p className="text-red-500 text-sm">{formErrors.value}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end gap-4">
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={onSave}>Save</Button>
                    </div>
                    {formErrors.general && (
                        <p className="text-red-500 text-sm mt-2">{formErrors.general}</p>
                    )}
                </div>
            )}
        </Dialog>
    );
};

EnvEditDialog.propTypes = {
    editingEnv: PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string,
    }),
    newValue: PropTypes.string.isRequired,
    setNewValue: PropTypes.func.isRequired,
    visibleSecrets: PropTypes.objectOf(PropTypes.bool).isRequired,
    toggleSecretVisibility: PropTypes.func.isRequired,
    isSecretKey: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    setEditingEnv: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(["edit", "create"]).isRequired,
    formErrors: PropTypes.object.isRequired,
};

export default EnvEditDialog;
