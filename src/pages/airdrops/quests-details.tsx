import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import banner from "@/assets/dashboard/banner.svg";
import React from "react";
import Image from "next/image";
import DashboardCard from "@/components/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { ProjectDataType } from "@/utils/api/project";

interface ProjectDataProps {
  projectData: ProjectDataType;
}

export default function QuestsDetails({ projectData }: ProjectDataProps) {
  const { tasks } = projectData;

  const taskData = tasks?.map((task) => {
    return {
      title: task.name,
      description: "304 people completed", // TODO: Replace with actual data
      value: task.difficulty || "Not Specified",
      details: (
        <div>
          <div className="space-y-3">
            <Typography variant={"large"} className="text-zinc-900">
              About
            </Typography>
            <Typography variant={"paragraph"} className="text-zinc-900">
              {task.about ||
                "Detailed information about this task will be provided soon."}
            </Typography>

            {task.steps && task.steps.length > 0 ? (
              task.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <Typography variant={"list"} className="text-zinc-900">
                    <li>{step.name || "Step description coming soon."}</li>
                  </Typography>
                  <Typography variant={"muted"}>
                    Suscipit ultricies lacus tristique a feugiat nunc.
                  </Typography>
                </React.Fragment>
              ))
            ) : (
              <Typography variant={"paragraph"} className="text-zinc-900">
                Steps for this task will be added soon.
              </Typography>
            )}
          </div>

          <div className="mt-4 flex w-full items-center justify-center">
            <Button size={"lg"} variant={"accent"}>
              Mark as completed
            </Button>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Image src={banner} alt="banner" className=" w-full" />
        <DashboardCard className="flex w-full items-center justify-between p-5">
          <Typography variant={"smallTitle"}>0/3 Quest completed</Typography>
          <Typography variant={"smallTitle"}>304 people completed</Typography>
        </DashboardCard>
      </div>

      {taskData?.map(({ title, description, value, details }, idx) => (
        <Accordion key={idx} type="single" collapsible className=" md:max-w-md">
          <AccordionItem value="title">
            <AccordionTrigger
              className="flex flex-wrap items-center justify-between "
              key={idx}
            >
              <div className="flex flex-col text-start">
                <Typography variant={"large"}>{title}</Typography>
                <Typography
                  variant={"smallTitle"}
                  className="text-neutral-600 dark:text-neutral-300"
                >
                  {description}
                </Typography>
              </div>
              <div>
                <Typography>{value}</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent>{details}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
