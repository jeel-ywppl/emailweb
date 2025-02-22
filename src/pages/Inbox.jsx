import {useEffect, useState} from "react";
import {getAllEmailbyUser, getSinglMail} from "../store/email";
import {useAppDispatch, useAppSelector} from "../store";
import Emaillist from "../componets/Emaillist";

const Inbox = () => {
    const dispatch = useAppDispatch();
    const {emails, isLoading, isError, totalPages, limit} = useAppSelector((state) => state.email);

    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    useEffect(() => {
        dispatch(getAllEmailbyUser({page: totalPages, limit, received_status: true}));
    }, [dispatch, totalPages, limit]);

    useEffect(() => {
        if (selectedEmailId) {
            console.log("Dispatching getSinglMail with ID:", selectedEmailId);
            dispatch(getSinglMail(selectedEmailId));
        }
    }, [dispatch, selectedEmailId]);

    const handleSelectEmail = (emailId) => {
        setSelectedEmailId(emailId);
    };

    const handleToggleSelectAll = () => {
        if (isAllSelected) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(emails.map((email) => email?._id));
        }
        setIsAllSelected(!isAllSelected);
    };

    const handleToggleSelectEmail = (emailId) => {
        setSelectedEmails((prevSelected) => {
            if (prevSelected.includes(emailId)) {
                return prevSelected.filter((id) => id !== emailId);
            } else {
                return [...prevSelected, emailId];
            }
        });

        if (isAllSelected && selectedEmails.length === emails.length) {
            setSelectedEmails([]);
            setIsAllSelected(false);
        }
    };

    const handleDeleteSelected = () => {
        if (selectedEmails.length === 0) return;
    };

    if (isLoading) {
        return <p>Loading emails...</p>;
    }

    if (isError) {
        return <p>Error fetching emails: {isError}</p>;
    }

    return (
        <div className="h-full rounded-xl flex flex-col border scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack">
            <div className="flex-1 overflow-hidden">
                <Emaillist
                    emailList={emails}
                    onSelectEmail={handleSelectEmail}
                    selectedEmails={selectedEmails}
                    onToggleSelectEmail={handleToggleSelectEmail}
                    onToggleSelectAll={handleToggleSelectAll}
                    isAllSelected={isAllSelected}
                    onDeleteSelected={handleDeleteSelected}
                />
            </div>
        </div>
    );
};

export default Inbox;
