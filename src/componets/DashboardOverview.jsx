import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ArrowUpIcon,
} from "@heroicons/react/24/solid";
import { ordersOverviewData, projectsTableData } from "../constant";

const DashboardOverview = () => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 flex items-center justify-between p-6"
        >
          <div>
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Companies
            </Typography>
            
          </div>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-6 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-medium uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "blue"}
                            className="h-1"
                          />
                        </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {/* Orders Overview Card */}
      <Card className="border border-blue-gray-100 shadow-sm">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 p-6">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Orders Overview
          </Typography>
          <Typography variant="small" className="flex items-center gap-1 font-normal text-blue-gray-600">
            <ArrowUpIcon strokeWidth={3} className="h-3.5 w-3.5 text-green-500" />
            <strong>24%</strong> this month
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          {ordersOverviewData.map(({ icon, color, title, description }, key) => (
            <div key={title} className="flex items-start gap-4 py-3">
              <div
                className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                  key === ordersOverviewData.length - 1 ? "after:h-0" : "after:h-4/6"
                }`}
              >
                {React.createElement(icon, { className: `!w-5 !h-5 ${color}` })}
              </div>
              <div>
                <Typography variant="small" color="blue-gray" className="block font-medium">
                  {title}
                </Typography>
                <Typography as="span" variant="small" className="text-xs font-medium text-blue-gray-500">
                  {description}
                </Typography>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};

export default DashboardOverview;
