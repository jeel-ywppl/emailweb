import {useState} from "react";
import RegisterNewUser from "../../model/RegisterNewUser";
import PropTypes from "prop-types";
import {HiOutlinePlus} from "react-icons/hi";
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {FaRegCalendarAlt, FaUser} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const DynamicStatsBoxes = () => {
    const [showModal, setShowModal] = useState(false);
    const [totalUsers, setTotalUsers] = useState(10);
    const [usersThisMonth, setUsersThisMonth] = useState(5);

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

    // Chart Data
    const chartData = {
        labels: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        datasets: [
            {
                label: "Total Registered Users",
                data: Array.from({length: 12}, (_, i) => totalUsers + i),
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true,
                tension: 1,
            },
            {
                label: "Users This Month",
                data: Array.from({length: 12}, (_, i) => usersThisMonth + i),
                borderColor: "rgba(153, 102, 255, 1)",
                backgroundColor: "rgba(153, 102, 255, 0.2)",
                fill: true,
                tension: 1,
            },
        ],
    };

    return (
        <div className="py-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {boxes.map((box, index) => (
                    <div
                        key={index}
                        className="bg-white border shadow-lg rounded-lg p-6 flex items-center justify-between"
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
                                className="bg-white shadow-lg text-dark text-xl rounded px-1 py-1 hover:text-white hover:bg-primary1 transition-all duration-300 border border-primary1"
                                title="Register new user"
                            >
                                <HiOutlinePlus />
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <div className="mx-auto w-full  lg:w-[800px] ">
                <div className="gird grid-cols-1 mt-16 mb-16 items-center justify-center">
                    <h4 className="text-lg font-semibold text-gray-800">User Registration Stats</h4>
                    <Line data={chartData} options={{responsive: true}} />
                </div>
            </div>

            {showModal && (
                <RegisterNewUser
                    closeModal={closeModal}
                    handleNewUserRegistration={handleNewUserRegistration}
                />
            )}
        </div>
    );
};

DynamicStatsBoxes.propTypes = {
    closeModal: PropTypes.func.isRequired,
    handleNewUserRegistration: PropTypes.func.isRequired,
};

export default DynamicStatsBoxes;
