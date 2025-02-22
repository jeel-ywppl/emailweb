import {Card, CardHeader, CardBody, CardFooter, Typography} from "@material-tailwind/react";
import {BanknotesIcon, UserPlusIcon, UsersIcon, ChartBarIcon} from "@heroicons/react/24/solid";

const StatisticsCards = () => {
    const statisticsCardsData = [
        {
            color: "gray",
            icon: <BanknotesIcon className="w-6 h-6 text-white" />,
            title: "Today's Money",
            value: "$53k",
            footer: (
                <Typography className="font-normal text-blue-gray-600">
                    <strong className="text-green-500">+55%</strong> than last week
                </Typography>
            ),
        },
        {
            color: "gray",
            icon: <UsersIcon className="w-6 h-6 text-white" />,
            title: "Today's Users",
            value: "2,300",
            footer: (
                <Typography className="font-normal text-blue-gray-600">
                    <strong className="text-green-500">+3%</strong> than last month
                </Typography>
            ),
        },
        {
            color: "gray",
            icon: <UserPlusIcon className="w-6 h-6 text-white" />,
            title: "New Clients",
            value: "3,462",
            footer: (
                <Typography className="font-normal text-blue-gray-600">
                    <strong className="text-red-500">-2%</strong> than yesterday
                </Typography>
            ),
        },
        {
            color: "gray",
            icon: <ChartBarIcon className="w-6 h-6 text-white" />,
            title: "Sales",
            value: "$103,430",
            footer: (
                <Typography className="font-normal text-blue-gray-600">
                    <strong className="text-green-500">+5%</strong> than yesterday
                </Typography>
            ),
        },
    ];

    return (
        <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
            {statisticsCardsData.map(({color, icon, title, value, footer}, index) => (
                <Card key={index} className="border border-blue-gray-100 shadow-sm">
                    <CardHeader
                        variant="gradient"
                        color={color}
                        floated={false}
                        shadow={false}
                        className="absolute grid h-12 w-12 place-items-center"
                    >
                        {icon}
                    </CardHeader>
                    <CardBody className="p-4 text-right">
                        <Typography variant="small" className="font-normal text-blue-gray-600">
                            {title}
                        </Typography>
                        <Typography variant="h4" color="blue-gray">
                            {value}
                        </Typography>
                    </CardBody>
                    <CardFooter className="border-t border-blue-gray-50 p-4">{footer}</CardFooter>
                </Card>
            ))}
        </div>
    );
};

export default StatisticsCards;
