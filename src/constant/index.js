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

export const data = {
    domain: "tushal.fun",
    mx: {
        found: true,
        records: [
            {
                exchange: "mail.tushal.fun",
                priority: 5,
                ip: "93.127.195.148",
                blacklist: [],
                smtp: {
                    success: true,
                    details: "SMTP connection successful on port 587.",
                },
                ttl: 294,
            },
        ],
        valid: true,
        details: "MX records found.",
        ttl: 294,
    },
    spf: {
        found: true,
        record: "v=spf1 ip4:93.127.195.148 -all",
        valid: true,
        details: "SPF record syntax looks valid. Total DNS lookups: 0.",
        mechanisms: [
            {
                qualifier: "",
                type: "v",
                value: "spf1",
                ttl: 300,
            },
            {
                qualifier: "+",
                type: "ip4",
                value: "93.127.195.148",
                ttl: 300,
            },
            {
                qualifier: "-",
                type: "all",
                value: "",
                ttl: 300,
            },
        ],
        multipleRecords: false,
        includes: [],
        lookupCount: 0,
        ttl: 300,
    },
    dmarc: {
        found: true,
        record: "v=DMARC1; p=reject; rua=mailto:akashkakadiya.ywppl@gmail.com; ruf=mailto:akashkakadiya.ywppl@gmail.com;",
        valid: true,
        details:
            "DMARC record includes valid policy tag. Warning: gmail.com DMARC does not permit reports from tushal.fun.",
        tags: {
            v: "DMARC1",
            p: "reject",
            rua: "mailto:akashkakadiya.ywppl@gmail.com",
            ruf: "mailto:akashkakadiya.ywppl@gmail.com",
        },
        multipleRecords: false,
        ttl: 300,
    },
    dkim: {
        found: true,
        selectors: ["default"],
        records: [
            {
                selector: "default",
                txt: "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqtZZJf0uxiO+EOJlKgkyvYAY2ABhUN4wcCHni1n69kkPeJgT6u13jfu4hsitnc034qvEQpzYl9t4UAV/jLSX5N4OMT7bu2Hm5vNfkAZM4lY8iaunvbAA8vd4HQmSoUa9scOy7uZOFDb44dlZ12RFpGSlQ9O0dP5NJX8aY/ON0xlLoB/WrXhegX3YWMvQJnPtY+SLuHJcQbytN83HSmtnLt/u1TWbPO4jfkV80UcY/uXqzpqgKqlwfNwOIPyiLWnaPdkJoR82MwzKH7ZWACF/pd8VuDGRQsILVIQo1M/CSpmDKbS3Em6TohnOMqMecU9GAWI0mc1vPp7mDEQTFqpz6QIDAQAB",
                tags: {
                    v: "DKIM1",
                    h: "sha256",
                    k: "rsa",
                    p: "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqtZZJf0uxiO+EOJlKgkyvYAY2ABhUN4wcCHni1n69kkPeJgT6u13jfu4hsitnc034qvEQpzYl9t4UAV/jLSX5N4OMT7bu2Hm5vNfkAZM4lY8iaunvbAA8vd4HQmSoUa9scOy7uZOFDb44dlZ12RFpGSlQ9O0dP5NJX8aY/ON0xlLoB/WrXhegX3YWMvQJnPtY+SLuHJcQbytN83HSmtnLt/u1TWbPO4jfkV80UcY/uXqzpqgKqlwfNwOIPyiLWnaPdkJoR82MwzKH7ZWACF/pd8VuDGRQsILVIQo1M/CSpmDKbS3Em6TohnOMqMecU9GAWI0mc1vPp7mDEQTFqpz6QIDAQAB",
                },
                ttl: 60,
            },
            {
                selector: "google",
                txt: [],
                details:
                    "DKIM lookup failed for selector 'google': DNS TXT lookup failed for google._domainkey.tushal.fun: queryTxt ENOTFOUND google._domainkey.tushal.fun",
                ttl: 0,
            },
            {
                selector: "s1",
                txt: [],
                details:
                    "DKIM lookup failed for selector 's1': DNS TXT lookup failed for s1._domainkey.tushal.fun: queryTxt ENOTFOUND s1._domainkey.tushal.fun",
                ttl: 0,
            },
            {
                selector: "s2",
                txt: [],
                details:
                    "DKIM lookup failed for selector 's2': DNS TXT lookup failed for s2._domainkey.tushal.fun: queryTxt ENOTFOUND s2._domainkey.tushal.fun",
                ttl: 0,
            },
            {
                selector: "selector1",
                txt: [],
                details:
                    "DKIM lookup failed for selector 'selector1': DNS TXT lookup failed for selector1._domainkey.tushal.fun: queryTxt ENOTFOUND selector1._domainkey.tushal.fun",
                ttl: 0,
            },
        ],
        valid: true,
        details:
            "DKIM record for selector 'default' includes valid public key. Public key length: 392 characters. Key type: rsa. Hash algorithms: sha256. DKIM public key length: 2048 bits.",
        ttl: 60,
    },
    dns: {
        soa: {
            nsname: "keira.ns.cloudflare.com",
            hostmaster: "dns.cloudflare.com",
            serial: 2371567540,
            refresh: 10000,
            retry: 2400,
            expire: 604800,
            minttl: 1800,
            ttl: 1107,
        },
        ns: [
            {
                name: "sergi.ns.cloudflare.com",
                ip: "172.64.35.68",
                ttl: 21600,
            },
            {
                name: "keira.ns.cloudflare.com",
                ip: "108.162.194.206",
                ttl: 21600,
            },
        ],
        a: [
            {
                ip: "93.127.195.148",
                ttl: 300,
            },
        ],
        details:
            " Warning: SOA serial 2371567540 indicates future year 2371. Warning: SOA expire 604800 is outside recommended range (1209600–2419200).",
    },
};