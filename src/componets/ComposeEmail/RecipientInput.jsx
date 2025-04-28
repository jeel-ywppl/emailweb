import PropTypes from "prop-types";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

const RecipientInput = ({label, recipients, setRecipients}) => {
    const [inputValue, setInputValue] = useState("");
    const [backspaceCount, setBackspaceCount] = useState(0);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            addRecipient(inputValue.trim());
        }

        if (e.key === "Backspace" && !inputValue) {
            if (backspaceCount === 1 && recipients.length > 0) {
                setRecipients(recipients.slice(0, -1));
                setBackspaceCount(0);
            } else {
                setBackspaceCount(backspaceCount + 1);
            }
        }
    };

    const handleBlur = () => {
        if (inputValue.trim()) {
            addRecipient(inputValue.trim());
        }
    };

    const addRecipient = (email) => {
        setRecipients([...recipients, {email}]); 
        setInputValue(""); 
        setBackspaceCount(0);
    };

    const removeRecipient = (index) => {
        setRecipients(recipients?.filter((_, i) => i !== index));
    };

    return (
        <div className="w-full mb-4">
            <span className="text-gray-600 text-sm p-1 font-semibold">{label} :</span>
            <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 p-1 min-h-[10px]">
                {recipients.map((recipient, index) => (
                    <div
                        key={index}
                        className="flex items-center bg-gray-200 rounded-full px-2 text-sm"
                    >
                        <span className="mr-1">
                            {typeof recipient === "string" ? recipient : recipient.email}
                        </span>
                        <button type="button" onClick={() => removeRecipient(index)}>
                            <XMarkIcon className="h-3 w-3 text-gray-600 cursor-pointer" />
                        </button>
                    </div>
                ))}
                <input
                    type="email"
                    placeholder="Enter email"
                    className="flex-1 outline-none bg-transparent min-w-[120px] border-none py-1 px-2 border-b"
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                />
            </div>
        </div>
    );
};

RecipientInput.propTypes = {
    label: PropTypes.string,
    recipients: PropTypes.array,
    setRecipients: PropTypes.func,
};

export default RecipientInput;
