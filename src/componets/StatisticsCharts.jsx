import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { ClockIcon } from "@heroicons/react/24/solid";
import Chart from "react-apexcharts";

const chartsConfig = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  title: {
    show: "",
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "#37474f",
        fontSize: "13px",
        fontFamily: "inherit",
        fontWeight: 300,
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#dddddd",
    strokeDashArray: 5,
    xaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 5,
      right: 20,
    },
  },
  fill: {
    opacity: 0.8,
  },
  tooltip: {
    theme: "dark",
  },
};


const statisticsChartsData = [
  {
    color: "white",
    title: "Website View",
    description: "Last Campaign Performance",
    footer: "campaign sent 2 days ago",
    chart: {
      type: "bar",
      height: 220,
      series: [
        {
          name: "Views",
          data: [50, 20, 10, 22, 50, 10, 40],
        },
      ],
      options: {
        ...chartsConfig,
        colors: "#388e3c",
        plotOptions: {
          bar: {
            columnWidth: "16%",
            borderRadius: 5,
          },
        },
        xaxis: {
          ...chartsConfig.xaxis,
          categories: ["M", "T", "W", "T", "F", "S", "S"],
        },
      },
    },
  },
  {
    color: "white",
    title: "Daily Sales",
    description: "15% increase in today sales",
    footer: "updated 4 min ago",
    chart: {
      type: "line",
      height: 220,
      series: [
        {
          name: "Sales",
          data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
      ],
      options: {
        ...chartsConfig,
        colors: ["#0288d1"],
        stroke: {
          lineCap: "round",
        },
        markers: {
          size: 5,
        },
        xaxis: {
          ...chartsConfig.xaxis,
          categories: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
    },
  },
  {
    color: "white",
    title: "Completed Tasks",
    description: "Last Campaign Performance",
    footer: "just updated",
    chart: {
      type: "line",
      height: 220,
      series: [
        {
          name: "Tasks",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
      ],
      options: {
        ...chartsConfig,
        colors: ["#388e3c"],
        stroke: {
          lineCap: "round",
        },
        markers: {
          size: 5,
        },
        xaxis: {
          ...chartsConfig.xaxis,
          categories: [
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      },
    },
  },
];

const StatisticsCharts = () => {
  return (
    <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
      {statisticsChartsData.map(({ color, chart, title, description, footer }, index) => (
        <Card key={index} className="border border-blue-gray-100 shadow-sm">
          <CardHeader variant="gradient" color={color} floated={false} shadow={false}>
            <Chart {...chart} />
          </CardHeader>
          <CardBody className="px-6 pt-0">
            <Typography variant="h6" color="blue-gray">
              {title}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              {description}
            </Typography>
          </CardBody>
          <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
            <Typography
              variant="small"
              className="flex items-center font-normal text-blue-gray-600"
            >
              <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
              &nbsp;{footer}
            </Typography>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default StatisticsCharts;
