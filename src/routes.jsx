import Domain from "./pages/Domain";
import Tables from "./pages/Tables";
import Home from "./pages/Home";
import Inbox from "./pages/email/Inbox.jsx";
import EmailView from "./componets/EmailView.jsx";
import Trash from "./pages/email/Trash.jsx";
import Sent from "./pages/email/Sent.jsx";
import StarredEmails from "./pages/email/Starred.jsx";
import Profile from "./pages/Profile";
import DnsSetting from "./pages/DnsSetting";
import AccountSettings from "./pages/AccountSettings";
import DomainTable from "./pages/CompanyData.jsx";
import {HomeIcon, TableCellsIcon} from "@heroicons/react/24/solid";
import {SiAwwwards} from "react-icons/si";
import {IoMailUnreadOutline} from "react-icons/io5";
import {GoStar} from "react-icons/go";
import {TbBuildingBank} from "react-icons/tb";
import {BsSendCheck} from "react-icons/bs";
import {CgTrash} from "react-icons/cg";

const icon = {
    className: "w-5 h-5 text-inherit",
};

export const routes = [
    {
        layout: "dashboard",
        pages: [
            {
                icon: <HomeIcon {...icon} />,
                name: "home",
                path: "/home",
                element: <Home />,
                roles: ["admin"],
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "user",
                path: "/tables",
                element: <Tables />,
                roles: ["admin"],
            },
            {
                icon: <SiAwwwards {...icon} />,
                name: "domain",
                path: "/domain",
                element: <Domain />,
                roles: ["admin"],
            },
            {
                icon: <TbBuildingBank {...icon} />,
                name: "company",
                path: "/domaintable",
                element: <DomainTable />,
                roles: ["admin"],
            },
            {
                icon: <IoMailUnreadOutline {...icon} />,
                name: "Inbox",
                path: "/inbox",
                element: <Inbox />,
                roles: ["admin", "user"],
            },
            {
                path: "/inbox/:id",
                element: <EmailView />,
                roles: ["admin", "user"],
            },
            {
                icon: <GoStar {...icon} />,
                name: "Starred",
                path: "/starred",
                element: <StarredEmails />,
                roles: ["admin", "user"],
            },
            {
                icon: <BsSendCheck {...icon} />,
                name: "Sent",
                path: "/sent",
                element: <Sent />,
                roles: ["admin", "user"],
            },
            {
                icon: <CgTrash {...icon} />,
                name: "Trash",
                path: "/trash",
                element: <Trash />,
                roles: ["admin", "user"],
            },
            {
                path: "/accountsettings",
                element: <AccountSettings />,
                roles: ["admin", "user"],
            },
            {
                path: "/profile",
                element: <Profile />,
                roles: ["admin", "user"],
            },
            {
                path: "/domain/:id",
                element: <DnsSetting />,
                roles: ["admin", "user"],
            },
        ],
    },
];

export default routes;
