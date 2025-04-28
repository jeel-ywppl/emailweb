import {BanknotesIcon, ChartBarIcon, UserPlusIcon, UsersIcon} from "@heroicons/react/24/solid";
import {
    BellIcon,
    CreditCardIcon,
    LockOpenIcon,
    PlusCircleIcon,
    ShoppingCartIcon,
} from "lucide-react";

export const projectsTableData = [
    {
        img: "/img/logo-xd.svg",
        name: "Material XD Version",
        members: [
            {img: "/img/team-1.jpeg", name: "Romina Hadid"},
            {img: "/img/team-2.jpeg", name: "Ryan Tompson"},
            {img: "/img/team-3.jpeg", name: "Jessica Doe"},
            {img: "/img/team-4.jpeg", name: "Alexander Smith"},
        ],
        budget: "$14,000",
        completion: 60,
    },
    {
        img: "/img/logo-atlassian.svg",
        name: "Add Progress Track",
        members: [
            {img: "/img/team-2.jpeg", name: "Ryan Tompson"},
            {img: "/img/team-4.jpeg", name: "Alexander Smith"},
        ],
        budget: "$3,000",
        completion: 10,
    },
    {
        img: "/img/logo-slack.svg",
        name: "Fix Platform Errors",
        members: [
            {img: "/img/team-3.jpeg", name: "Jessica Doe"},
            {img: "/img/team-1.jpeg", name: "Romina Hadid"},
        ],
        budget: "Not set",
        completion: 100,
    },
    {
        img: "/img/logo-spotify.svg",
        name: "Launch our Mobile App",
        members: [
            {img: "/img/team-4.jpeg", name: "Alexander Smith"},
            {img: "/img/team-3.jpeg", name: "Jessica Doe"},
            {img: "/img/team-2.jpeg", name: "Ryan Tompson"},
            {img: "/img/team-1.jpeg", name: "Romina Hadid"},
        ],
        budget: "$20,500",
        completion: 100,
    },
    {
        img: "/img/logo-jira.svg",
        name: "Add the New Pricing Page",
        members: [{img: "/img/team-4.jpeg", name: "Alexander Smith"}],
        budget: "$500",
        completion: 25,
    },
    {
        img: "/img/logo-invision.svg",
        name: "Redesign New Online Shop",
        members: [
            {img: "/img/team-1.jpeg", name: "Romina Hadid"},
            {img: "/img/team-4.jpeg", name: "Alexander Smith"},
        ],
        budget: "$2,000",
        completion: 40,
    },
];

export const ordersOverviewData = [
    {
        icon: BellIcon,
        color: "text-blue-gray-300",
        title: "$2400, Design changes",
        description: "22 DEC 7:20 PM",
    },
    {
        icon: PlusCircleIcon,
        color: "text-blue-gray-300",
        title: "New order #1832412",
        description: "21 DEC 11 PM",
    },
    {
        icon: ShoppingCartIcon,
        color: "text-blue-gray-300",
        title: "Server payments for April",
        description: "21 DEC 9:34 PM",
    },
    {
        icon: CreditCardIcon,
        color: "text-blue-gray-300",
        title: "New card added for order #4395133",
        description: "20 DEC 2:20 AM",
    },
    {
        icon: LockOpenIcon,
        color: "text-blue-gray-300",
        title: "Unlock packages for development",
        description: "18 DEC 4:54 AM",
    },
    {
        icon: BanknotesIcon,
        color: "text-blue-gray-300",
        title: "New order #9583120",
        description: "17 DEC",
    },
];

export const statisticsCardsData = [
    {
        color: "gray",
        icon: BanknotesIcon,
        title: "Today's Money",
        value: "$53k",
        footer: {
            color: "text-green-500",
            value: "+55%",
            label: "than last week",
        },
    },
    {
        color: "gray",
        icon: UsersIcon,
        title: "Today's Users",
        value: "2,300",
        footer: {
            color: "text-green-500",
            value: "+3%",
            label: "than last month",
        },
    },
    {
        color: "gray",
        icon: UserPlusIcon,
        title: "New Clients",
        value: "3,462",
        footer: {
            color: "text-red-500",
            value: "-2%",
            label: "than yesterday",
        },
    },
    {
        color: "gray",
        icon: ChartBarIcon,
        title: "Sales",
        value: "$103,430",
        footer: {
            color: "text-green-500",
            value: "+5%",
            label: "than yesterday",
        },
    },
];
