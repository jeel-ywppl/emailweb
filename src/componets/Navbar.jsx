import {useState} from "react";
import ComposeEmailModal from "../model/ComposeEmailModal";

const Navbar = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSendEmail = (email) => {
        // You can send the email here, or handle it according to your app logic.
    };

    const currentDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className=" font-sans">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between px-4 py-2 border-b bg-white shadow-sm">
                <div className="text-[#1C1F26] text-lg font-semibold mb-2 sm:mb-0">
                    {currentDate}
                </div>
                <div className="flex flex-wrap sm:flex-nowrap items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-[900px]">
                    <div className="">
                        <button
                            className="p-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-secondary shadow-lg w-full sm:w-auto whitespace-nowrap"
                            aria-label="Compose Email"
                            onClick={handleOpenModal}
                        >
                            Compose Email
                        </button>
                        <ComposeEmailModal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onSend={handleSendEmail}
                        />
                    </div>
                    <div className="flex-grow w-full sm:max-w-[600px]">
                        <input
                            type="text"
                            placeholder="Search people, word or anything..."
                            className="w-full p-3 rounded-lg shadow-lg outline-none text-gray-700 bg-[#F6F7FB] "
                            aria-label="Search bar"
                        />
                    </div>
                    <div className="flex items-center space-x-2 w-full sm:w-auto">
                        <img
                            src="/imgs/pfp.jpeg"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full border-2 border-[#F6F7FB] shadow-lg"
                        />
                        <div className="text-sm text-center sm:text-left">
                            <p className="font-medium text-[#818592] text-[14px]">Kenda Jenner</p>
                            <p className="font-medium text-[#818592] text-[10px]">
                                kendajenner@mail.com
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
