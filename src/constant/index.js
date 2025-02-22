import { BanknotesIcon, ChartBarIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/solid";
import { BellIcon, CreditCardIcon, LockOpenIcon, PlusCircleIcon, ShoppingCartIcon } from "lucide-react";

export const emailList = [
    {
        id: "1",
        sender: "Kevin Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "2",
        sender: "Kenda Jenner",
        senderEmail: "kenda.jenner@example.com",
        snippet:
            "La saeta, al final de la noche, fue uno de los momentos más emocionantes de mi vida. Mientras las luces brillaban, sentí una energía que nunca había experimentado antes. Fue un momento mágico, lleno de emociones y recuerdos. Estoy tan feliz de haber compartido esa experiencia contigo y de poder revivirla una y otra vez en mi mente.",
        subject: "Hola! ¿Cómo estás?",
        time: "18:30 PM",
        body: "¡Hola! Estaba pensando en ti y quería saber cómo te va. Hablamos pronto.",
        attachments: [{ filename: "report.pdf", size: "3MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        id: "3",
        sender: "Maria Lopez",
        senderEmail: "maria.lopez@example.com",
        snippet:
            "Here’s the updated report for this week. We’ve made significant progress on the project, and I believe we’re on track to meet all our deadlines. There are a few areas that still need some attention, but overall, the team is doing great. I’d appreciate your feedback once you’ve had a chance to review it.",
        subject: "Weekly Report Update",
        time: "08:00 UTC",
        body: "Please find attached the updated report for this week’s progress. Let me know if you have any questions.",
        attachments: [{ filename: "weekly_report.xlsx", size: "5MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        id: "4",
        sender: "John Doe",
        senderEmail: "john.doe@example.com",
        snippet:
            "Just wanted to confirm the meeting time for tomorrow. We’ll be discussing the new project and the key deliverables. It’s important that we align on all the details before moving forward, so I’m looking forward to hearing your thoughts. Let me know if there’s anything specific you’d like to add to the agenda.",
        subject: "Meeting Confirmation",
        time: "14:00 EST",
        body: "Hi, just a quick reminder to confirm our meeting at 2 PM tomorrow. Looking forward to discussing the new project.",
        attachments: [],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "5",
        sender: "Rohit Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "6",
        sender: "Kevin Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "7",
        sender: "Kenda Jenner",
        senderEmail: "kenda.jenner@example.com",
        snippet:
            "La saeta, al final de la noche, fue uno de los momentos más emocionantes de mi vida. Mientras las luces brillaban, sentí una energía que nunca había experimentado antes. Fue un momento mágico, lleno de emociones y recuerdos. Estoy tan feliz de haber compartido esa experiencia contigo y de poder revivirla una y otra vez en mi mente.",
        subject: "Hola! ¿Cómo estás?",
        time: "18:30 PM",
        body: "¡Hola! Estaba pensando en ti y quería saber cómo te va. Hablamos pronto.",
        attachments: [{ filename: "report.pdf", size: "3MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        sender: "Maria Lopez",
        senderEmail: "maria.lopez@example.com",
        snippet:
            "Here’s the updated report for this week. We’ve made significant progress on the project, and I believe we’re on track to meet all our deadlines. There are a few areas that still need some attention, but overall, the team is doing great. I’d appreciate your feedback once you’ve had a chance to review it.",
        subject: "Weekly Report Update",
        time: "08:00 UTC",
        body: "Please find attached the updated report for this week’s progress. Let me know if you have any questions.",
        attachments: [{ filename: "weekly_report.xlsx", size: "5MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        id: "8",
        sender: "John Doe",
        senderEmail: "john.doe@example.com",
        snippet:
            "Just wanted to confirm the meeting time for tomorrow. We’ll be discussing the new project and the key deliverables. It’s important that we align on all the details before moving forward, so I’m looking forward to hearing your thoughts. Let me know if there’s anything specific you’d like to add to the agenda.",
        subject: "Meeting Confirmation",
        time: "14:00 EST",
        body: "Hi, just a quick reminder to confirm our meeting at 2 PM tomorrow. Looking forward to discussing the new project.",
        attachments: [],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "9",
        sender: "Rohit Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "10",
        sender: "Kevin Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "11",
        sender: "Kenda Jenner",
        senderEmail: "kenda.jenner@example.com",
        snippet:
            "La saeta, al final de la noche, fue uno de los momentos más emocionantes de mi vida. Mientras las luces brillaban, sentí una energía que nunca había experimentado antes. Fue un momento mágico, lleno de emociones y recuerdos. Estoy tan feliz de haber compartido esa experiencia contigo y de poder revivirla una y otra vez en mi mente.",
        subject: "Hola! ¿Cómo estás?",
        time: "18:30 PM",
        body: "¡Hola! Estaba pensando en ti y quería saber cómo te va. Hablamos pronto.",
        attachments: [{ filename: "report.pdf", size: "3MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        id: "12",
        sender: "Maria Lopez",
        senderEmail: "maria.lopez@example.com",
        snippet:
            "Here’s the updated report for this week. We’ve made significant progress on the project, and I believe we’re on track to meet all our deadlines. There are a few areas that still need some attention, but overall, the team is doing great. I’d appreciate your feedback once you’ve had a chance to review it.",
        subject: "Weekly Report Update",
        time: "08:00 UTC",
        body: "Please find attached the updated report for this week’s progress. Let me know if you have any questions.",
        attachments: [{ filename: "weekly_report.xlsx", size: "5MB" }],
        isStarred: false,
        isDeleted: false,
    },
    {
        id: "13",
        sender: "John Doe",
        senderEmail: "john.doe@example.com",
        snippet:
            "Just wanted to confirm the meeting time for tomorrow. We’ll be discussing the new project and the key deliverables. It’s important that we align on all the details before moving forward, so I’m looking forward to hearing your thoughts. Let me know if there’s anything specific you’d like to add to the agenda.",
        subject: "Meeting Confirmation",
        time: "14:00 EST",
        body: "Hi, just a quick reminder to confirm our meeting at 2 PM tomorrow. Looking forward to discussing the new project.",
        attachments: [],
        isStarred: true,
        isDeleted: false,
    },
    {
        id: "14",
        sender: "Rohit Nicholas",
        senderEmail: "kevin.nicholas@example.com",
        snippet:
            "Sometimes I wish I could go back to those days when life was simple and everything seemed so much easier. The world has changed so much, and I feel like I’ve lost touch with so many things. But anyway, I’m still here, doing my best to move forward, and I hope you’re doing well too.",
        subject: "Hey! Long time no see.",
        time: "18:30 PM",
        body: "Hey there, just wanted to check in and see how you’re doing. It’s been a while since we last talked!",
        attachments: [
            { filename: "photo1.jpg", size: "2MB" },
            { filename: "document.pdf", size: "1.5MB" },
        ],
        isStarred: true,
        isDeleted: false,
    },
];


export const sentEmails = [
    {
        id: "1",
        receiver: "John Doe",
        receiverEmail: "john@example.com",
        snippet: "Hey John, just wanted to follow up on the project details.",
        time: "2:30 PM",
        profilePic: "",
        isStarred: false,
    },
    {
        id: "2",
        receiver: "Jane Smith",
        receiverEmail: "jane@example.com",
        snippet: "Hi Jane, here's the document you requested.",
        time: "1:15 PM",
        profilePic: "",
        isStarred: true,
    },
];

export const projectsTableData = [
    {
      img: "/img/logo-xd.svg",
      name: "Material XD Version",
      members: [
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      budget: "$14,000",
      completion: 60,
    },
    {
      img: "/img/logo-atlassian.svg",
      name: "Add Progress Track",
      members: [
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      budget: "$3,000",
      completion: 10,
    },
    {
      img: "/img/logo-slack.svg",
      name: "Fix Platform Errors",
      members: [
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      ],
      budget: "Not set",
      completion: 100,
    },
    {
      img: "/img/logo-spotify.svg",
      name: "Launch our Mobile App",
      members: [
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
        { img: "/img/team-3.jpeg", name: "Jessica Doe" },
        { img: "/img/team-2.jpeg", name: "Ryan Tompson" },
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
      ],
      budget: "$20,500",
      completion: 100,
    },
    {
      img: "/img/logo-jira.svg",
      name: "Add the New Pricing Page",
      members: [{ img: "/img/team-4.jpeg", name: "Alexander Smith" }],
      budget: "$500",
      completion: 25,
    },
    {
      img: "/img/logo-invision.svg",
      name: "Redesign New Online Shop",
      members: [
        { img: "/img/team-1.jpeg", name: "Romina Hadid" },
        { img: "/img/team-4.jpeg", name: "Alexander Smith" },
      ],
      budget: "$2,000",
      completion: 40,
    },
  ];


  export const authorsTableData = [
    {
      img: "/imgs/pfp_1.jpg",
      name: "John Michael",
      email: "john@creative-tim.com",
      job: ["Manager", "Organization"],
      online: true,
      date: "23/04/18",
    },
    {
      img: "/imgs/pfp_2.jpg",
      name: "Alexa Liras",
      email: "alexa@creative-tim.com",
      job: ["Programator", "Developer"],
      online: false,
      date: "11/01/19",
    },
    {
      img: "/imgs/pfp_3.jpg",
      name: "Laurent Perrier",
      email: "laurent@creative-tim.com",
      job: ["Executive", "Projects"],
      online: true,
      date: "19/09/17",
    },
    {
      img: "/imgs/pfp_4.jpg",
      name: "Michael Levi",
      email: "michael@creative-tim.com",
      job: ["Programator", "Developer"],
      online: true,
      date: "24/12/08",
    },
    {
      img: "/imgs/pfp_24.png",
      name: "Bruce Mars",
      email: "bruce@creative-tim.com",
      job: ["Manager", "Executive"],
      online: false,
      date: "04/10/21",
    },
    {
      img: "/imgs/pfp_11.jpeg",
      name: "Alexander",
      email: "alexander@creative-tim.com",
      job: ["Programator", "Developer"],
      online: false,
      date: "14/09/20",
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

  