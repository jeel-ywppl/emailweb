import {useEffect, useState} from "react";
import {Pencil, Trash2, Copy, Search, Eye, EyeOff} from "lucide-react";
import {Button, Card, CardHeader, Typography} from "@material-tailwind/react";
import {CardContent} from "@mui/material";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../store";
import {createEnv, deleteEnv, findEnv, restartPm, updateEnv} from "../store/ENV";
import EnvEditDialog from "../model/EnvEditDialog";
import ConfirmDeleteDomainModal from "../model/ConfirmDeleteDomainModal";

const EnvDashboard = () => {
    const dispatch = useAppDispatch();
    const {env, isLoading, isError} = useAppSelector((state) => state.env);
    const [searchTerm, setSearchTerm] = useState("");
    const [newValue, setNewValue] = useState("");
    const [visibleSecrets, setVisibleSecrets] = useState({});
    const [editingEnv, setEditingEnv] = useState(null);
    const [mode, setMode] = useState("edit");
    const [deleteKey, setDeleteKey] = useState(null);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        dispatch(findEnv());
    }, [dispatch]);

    const filteredEnvData = env
        ? Object.entries(env).filter(([key]) =>
              key.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : [];

    const handleCopy = (value, name) => {
        navigator.clipboard.writeText(value);
        toast.success(`${name} copied to clipboard`);
    };

    const handleEdit = (key, value) => {
        setEditingEnv({key, value});
        setNewValue(value);
        setMode("edit");
    };

    const handleSaveEdit = () => {
        if (!editingEnv) return;

        const {key} = editingEnv;
        const isValidKey = /^[A-Z0-9_]+$/.test(key);
        const errors = {};

        if (!key) {
            errors.key = "Key is required.";
        } else if (!isValidKey) {
            errors.key = "Key must contain only uppercase letters, numbers, and underscores.";
        }

        if (!newValue) {
            errors.value = "Value is required.";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setFormErrors({});

        const action = mode === "create" ? createEnv : updateEnv;

        dispatch(action({key, value: newValue}))
            .unwrap()
            .then(() => {
                dispatch(findEnv());
                setEditingEnv(null);
            })
            .catch((err) => {
                if (err && typeof err === "object" && err.errors) {
                    setFormErrors(err.errors);
                } else {
                    setFormErrors({general: err || `Failed to ${mode} variable.`});
                }
            });
    };

    const handleDelete = (key) => {
        setDeleteKey(key);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteKey) {
            dispatch(deleteEnv(deleteKey))
                .unwrap()
                .then(() => {
                    toast.success("Environment variable deleted");
                    setDeleteModalOpen(false);
                    dispatch(findEnv());
                })
                .catch((err) => toast.error(err || "Failed to delete variable"));
        }
    };

    const toggleSecretVisibility = (key) => {
        setVisibleSecrets((prev) => ({...prev, [key]: !prev[key]}));
    };

    const handleRestartPm = () => {
        dispatch(restartPm())
            .unwrap()
            .then(() => {
                toast.success("PM restarted successfully.");
                dispatch(findEnv());
            })
            .catch((err) => {
                toast.error(err || "Failed to restart PM.");
            });
    };

    const isSecretKey = (key) => /secret|password|key|pass/i.test(key);

    if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;
    if (isError) return <div className="text-center text-red-500">Failed to load data</div>;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-2">
                Environment Variables
            </h1>

            <div className="relative mb-6 flex items-center justify-between">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Search environment variables..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 rounded-xl w-1/2"
                />
                <Button
                    onClick={() => {
                        setEditingEnv({key: "", value: ""});
                        setNewValue("");
                        setFormErrors({});
                        setMode("create");
                    }}
                >
                    + Add Environment Variable
                </Button>
                <Button
                    color="red"
                    onClick={handleRestartPm}
                    className="bg-red-500 hover:bg-red-600"
                >
                    Restart PM2
                </Button>
            </div>

            <Card className="bg-white shadow-md mt-8">
                <CardHeader className="bg-black text-white border-b border-slate-200 dark:border-slate-700 p-5">
                    <Typography className="text-lg font-semibold">
                        All Environment Variables
                    </Typography>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-100 dark:bg-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Value
                                    </th>
                                    <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {filteredEnvData.length > 0 ? (
                                    filteredEnvData.map(([key, value]) => {
                                        const isSecret = isSecretKey(key);
                                        return (
                                            <tr
                                                key={key}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                                            >
                                                <td className="py-3 px-4 text-sm font-medium">
                                                    {key}
                                                </td>
                                                <td className="py-3 px-4 font-mono text-xs">
                                                    <div className="flex items-center max-w-xs">
                                                        <div
                                                            className="truncate"
                                                            title={
                                                                isSecret && !visibleSecrets[key]
                                                                    ? "Hidden"
                                                                    : value
                                                            }
                                                        >
                                                            {isSecret && !visibleSecrets[key]
                                                                ? "••••••••••••••••"
                                                                : value}
                                                        </div>
                                                        {isSecret && (
                                                            <button
                                                                className="ml-2 h-7 w-7 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                                onClick={() =>
                                                                    toggleSecretVisibility(key)
                                                                }
                                                                aria-label={
                                                                    visibleSecrets[key]
                                                                        ? "Hide value"
                                                                        : "Show value"
                                                                }
                                                            >
                                                                {visibleSecrets[key] ? (
                                                                    <EyeOff className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                                ) : (
                                                                    <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                                                )}
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-right space-x-1">
                                                    <button
                                                        className="h-8 w-8 p-0 focus:outline-none"
                                                        onClick={() => handleCopy(value, key)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="h-8 w-8 p-0 text-amber-500"
                                                        onClick={() => handleEdit(key, value)}
                                                        title="Edit variable"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        className="h-8 w-8 p-0 text-red-500"
                                                        onClick={() => handleDelete(key)}
                                                        title="Delete variable"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={3}
                                            className="py-8 px-4 text-center text-gray-500"
                                        >
                                            No environment variables found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            <EnvEditDialog
                editingEnv={editingEnv}
                newValue={newValue}
                setNewValue={setNewValue}
                visibleSecrets={visibleSecrets}
                toggleSecretVisibility={toggleSecretVisibility}
                isSecretKey={isSecretKey}
                setEditingEnv={setEditingEnv}
                onClose={() => {
                    setEditingEnv(null);
                    setFormErrors({});
                }}
                onSave={handleSaveEdit}
                mode={mode}
                formErrors={formErrors}
            />

            <ConfirmDeleteDomainModal
                open={isDeleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm Delete"
                message={`Are you sure you want to delete the environment variable?`}
            />
        </div>
    );
};

export default EnvDashboard;
