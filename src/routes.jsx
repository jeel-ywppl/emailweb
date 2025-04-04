import Domain from "./pages/Domain";
import Roles from "./pages/Roles";
import Tables from "./pages/Tables";
import Home from "./pages/Home";
import Inbox from "./pages/email/Inbox";
import Trash from "./pages/email/Trash";
import Sent from "./pages/email/Sent";
import StarredEmails from "./pages/email/Starred";
import Profile from "./pages/Profile";
import DnsSetting from "./pages/DnsSetting";
import AccountSettings from "./pages/AccountSettings";
import DomainTable from "./pages/CompanyData";
import {HomeIcon, TableCellsIcon} from "@heroicons/react/24/solid";
import {SiAwwwards} from "react-icons/si";
import {IoMailUnreadOutline} from "react-icons/io5";
import {GoStar} from "react-icons/go";
import {TbBuildingBank} from "react-icons/tb";
import {BsSendCheck} from "react-icons/bs";
import {CgTrash} from "react-icons/cg";
import EmailView from "./componets/emailView/EmailView";
import {Archive, Notebook, UploadCloud} from "lucide-react";
import Backup from "./pages/Backup";
import BackupMail from "./pages/email/BackupMail";
import ArchiveMail from "./pages/email/ArchiveMail";
import Draft from "./pages/email/Draft";
import {Drafts} from "@mui/icons-material";
import Permission from "./pages/Permission";
import Modules from "./pages/Modules";

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
                isSideNav: true,
            },
            {
                icon: <TableCellsIcon {...icon} />,
                name: "user",
                path: "/user",
                element: <Tables />,
                isSideNav: true,
            },
            {
                icon: <SiAwwwards {...icon} />,
                name: "domain",
                path: "/domain",
                element: <Domain />,
                isSideNav: true,
            },
            {
                icon: <Notebook {...icon} />,
                name: "module",
                path: "/modules",
                element: <Modules />,
                isSideNav: true,
            },
            {
                icon: <Notebook {...icon} />,
                name: "role",
                path: "/role",
                element: <Roles />,
                isSideNav: true,
            },
            {
                icon: <TbBuildingBank {...icon} />,
                name: "company",
                path: "/company",
                element: <DomainTable />,
                isSideNav: true,
            },
            {
                icon: <IoMailUnreadOutline {...icon} />,
                name: "inbox",
                path: "/inbox",
                element: <Inbox />,
                isSideNav: true,
            },
            {
                icon: <GoStar {...icon} />,
                name: "starred",
                path: "/starred",
                element: <StarredEmails />,
                isSideNav: true,
            },
            {
                icon: <BsSendCheck {...icon} />,
                name: "sent",
                path: "/sent",
                element: <Sent />,
                isSideNav: true,
            },
            {
                icon: <Archive {...icon} />,
                name: "archive",
                path: "/archive",
                element: <ArchiveMail />,
                isSideNav: true,
            },
            {
                icon: <Drafts {...icon} />,
                name: "draft",
                path: "/draft",
                element: <Draft />,
                isSideNav: true,
            },
            {
                icon: <CgTrash {...icon} />,
                name: "trash",
                path: "/trash",
                element: <Trash />,
                isSideNav: true,
            },
            {
                icon: <UploadCloud {...icon} />,
                name: "backup",
                path: "/backup",
                element: <Backup />,
                isSideNav: true,
            },
            {
                path: "/accountsettings",
                name: "accountsettings/:id-hidden",
                element: <AccountSettings />,
                isSideNav: false,
            },
            {
                path: "/backup/backup_emails",
                name: "backup/backup_emails/:id-hidden",
                element: <BackupMail />,
                isSideNav: false,
            },
            {
                path: "/backup/backup_emails/:id",
                name: "backup/backup_emails/:id-hidden",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/profile",
                name: "profile-hidden",
                element: <Profile />,
                isSideNav: false,
            },
            {
                path: "/domain/:id",
                name: "domain-hidden",
                element: <DnsSetting />,
                isSideNav: false,
            },
            {
                path: "/trash/:id",
                name: "/trash/:id-hidden",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/archive/:id",
                name: "archive/:id-hidden",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/sent/:id",
                name: "/sent/:id-hidden",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/starred/:id",
                name: "starred/:id",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/inbox/:id",
                name: "inbox/id",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/role/permission/:id",
                element: <Permission />,
                name: "permission",
                isSideNav: false,
            },
            {
                path: "/user/permission/:id",
                name: "permission",
                element: <Permission />,
                isSideNav: false,
            },
        ],
    },
];

export default routes;
