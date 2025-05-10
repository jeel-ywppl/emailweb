import {
    Archive,
    Building2,
    Globe,
    HomeIcon,
    Mail,
    Notebook,
    SendHorizonal,
    Star,
    Table,
    Trash2Icon,
    UploadCloud,
    User,
    UserCog,
} from "lucide-react";
import AccountSettings from "./pages/AccountSettings";
import Home from "./pages/Home";
import Permission from "./pages/Permission";
import Profile from "./pages/Profile";
import CreateClientForm from "./pages/clients/Create/Index";
import Index from "./pages/clients/Index";
import ArchiveMail from "./pages/email/ArchiveMail";
import Draft from "./pages/email/Draft";
import Inbox from "./pages/email/Inbox";
import Sent from "./pages/email/Sent";
import StarredEmails from "./pages/email/Starred";
import Trash from "./pages/email/Trash";
import UserModule from "./pages/user/Index";
import UserView from "./pages/user/View/Index";
import ClientDetail from "./pages/clients/View/Index";
import Roles from "./pages/roles/Index";
import Domain from "./pages/domain/Index";
import Backup from "./pages/backup/Index";
import {Drafts} from "@mui/icons-material";
import BackupMail from "./pages/backup/View/Index";
import EmailView from "./pages/email/emailView/EmailView";
import Company from "./pages/company/Index";
import CompanyView from "./pages/company/View";
import Modules from "./pages/modules/Index";
import DnsSetting from "./pages/domain/Manage/Index";

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
                icon: <Building2 {...icon} />,
                name: "company",
                path: "/company",
                element: <Company />,
                isSideNav: true,
            },
            {
                icon: <Globe {...icon} />,
                name: "domain",
                path: "/domain",
                element: <Domain />,
                isSideNav: true,
            },
            {
                icon: <UserCog {...icon} />,
                name: "role",
                path: "/role",
                element: <Roles />,
                isSideNav: true,
            },
            {
                name: "client",
                path: "/client/create",
                element: <CreateClientForm />,
                isSideNav: false,
            },
            {
                icon: <Table {...icon} />,
                name: "user",
                path: "/user",
                element: <UserModule />,
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
                icon: <User {...icon} />,
                name: "client",
                path: "/client",
                element: <Index />,
                isSideNav: true,
            },
            {
                icon: <Mail {...icon} />,
                name: "inbox",
                path: "/inbox",
                element: <Inbox />,
                isSideNav: true,
            },
            {
                icon: <Star {...icon} />,
                name: "starred",
                path: "/starred",
                element: <StarredEmails />,
                isSideNav: true,
            },
            {
                icon: <SendHorizonal {...icon} />,
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
                icon: <Trash2Icon {...icon} />,
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
                name: "accountsettings",
                element: <AccountSettings />,
                isSideNav: false,
            },
            {
                path: "/backup/backup_emails",
                name: "backup",
                element: <BackupMail />,
                isSideNav: false,
            },
            {
                path: "/backup/backup_emails/:id",
                name: "backup",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/profile",
                name: "profile",
                element: <Profile />,
                isSideNav: false,
            },
            {
                path: "/client/:id",
                name: "client",
                element: <ClientDetail />,
                isSideNav: false,
            },
            {
                path: "/domain/:id",
                name: "domain",
                element: <DnsSetting />,
                isSideNav: false,
            },
            {
                path: "/company/:id",
                name: "company",
                element: <CompanyView />,
                isSideNav: false,
            },
            {
                path: "/user/:id",
                name: "user",
                element: <UserView />,
                isSideNav: false,
            },
            {
                path: "/trash/:id",
                name: "trash",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/archive/:id",
                name: "archive",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/sent/:id",
                name: "sent",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/starred/:id",
                name: "starred",
                element: <EmailView />,
                isSideNav: false,
            },
            {
                path: "/inbox/:id",
                name: "inbox",
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
