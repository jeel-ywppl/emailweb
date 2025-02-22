import {useState} from "react";
import PropTypes from "prop-types";
import {HiOutlinePlus} from "react-icons/hi";
import {FaRegCalendarAlt, FaUser} from "react-icons/fa";
import RegisterNewUser from "../model/RegisterNewUser";
import StatisticsCharts from "../componets/StatisticsCharts";
import DashboardOverview from "../componets/DashboardOverview";


const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [totalUsers, setTotalUsers] = useState();
    const [usersThisMonth, setUsersThisMonth] = useState();

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleNewUserRegistration = () => {
        setTotalUsers(totalUsers + 1);
        setUsersThisMonth(usersThisMonth + 1);
    };

    const boxes = [
        {
            title: "Total Registered Users",
            value: totalUsers,
            icon: <FaUser size={20} />,
        },
        {
            title: "Users This Month",
            value: usersThisMonth,
            icon: <FaRegCalendarAlt size={20} />,
        },
    ];

    
    
    
    return (
        <div className="py-3 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                {boxes.map((box, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-300 rounded-lg p-6 flex items-center justify-between"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="text-white bg-black border rounded p-2 ">
                                {box.icon}
                            </div>
                            <div>
                                <p className={`text-sm ${box.textColor}`}>{box.title}</p>
                                <p className="text-xl font-bold text-gray-800">{box.value}</p>
                            </div>
                        </div>
                        {box.title === "Total Registered Users" && (
                            <button
                                onClick={openModal}
                                className="bg-white hover:shadow-xl text-dark text-xl rounded px-1 py-1 hover:text-white hover:bg-primary1 transition-all duration-300 border border-primary1"
                                title="Register new user"
                            >
                                <HiOutlinePlus />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <StatisticsCharts />
            <DashboardOverview  />
            {showModal && (
                <RegisterNewUser
                    closeModal={closeModal}
                    handleNewUserRegistration={handleNewUserRegistration}
                />
            )}
        </div>
    );
};

Home.propTypes = {
    closeModal: PropTypes.func.isRequired,
    handleNewUserRegistration: PropTypes.func.isRequired,
};

export default Home;
