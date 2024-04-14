import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import milkyWay from "@/assets/dashboard/milkyway.svg";
import network1 from "@/assets/dashboard/eth.svg";
import network2 from "@/assets/dashboard/network2.svg";
import { Search, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Typography } from "@/components/ui/typography";
import { getProjects } from "@/utils/api/getProjects";
import { Project, Task } from "@prisma/client";
import arbitrumLogo from "public/chain-icons/arbitrum.svg";
import { activeChains } from "@/constants/config/chainsConfig";

// TODO: add supported chains to db schema for the project details

const difficulty = [
  {
    label: "Esay",
    value: "esay",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
const likelihood = [
  {
    label: "Esay",
    value: "esay",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Hard",
    value: "hard",
  },
];
const category = [
  {
    label: "Wallet",
    value: "wallet",
  },
  {
    label: "NFT",
    value: "nft",
  },
  {
    label: "DEX",
    value: "dex",
  },
];
const network = [
  {
    label: "Network 1",
    value: "network1",
    logo: network1,
  },
  {
    label: "Network 2",
    value: "network2",
    logo: network2,
  },
];

interface ProjectWithTask extends Project {
  tasks: Task[];
}

export default function AirdropsTable() {
  const [projectData, setProjectData] = useState<ProjectWithTask[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        if (response && Array.isArray(response)) {
          setProjectData(response);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setProjectData([]);
      }
    };

    fetchProjects();
  }, []);

  const filters = (
    <>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          {difficulty.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {category.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Likelihood" />
        </SelectTrigger>
        <SelectContent className="">
          {likelihood.map(({ label, value }, idx) => (
            <SelectItem key={idx} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className=" w-32 md:w-[180px]">
          <SelectValue placeholder="Network" className=" " />
        </SelectTrigger>
        <SelectContent>
          {network.map(({ label, value, logo }, idx) => (
            <SelectItem key={idx} value={value}>
              <div className=" flex items-center gap-2">
                <Image src={logo} alt={label} /> <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );

  return (
    <>
      {projectData.length > 0 ? (
        <>
          <div className="space-y-6 py-6 md:space-y-12">
            <div className="flex w-full flex-col justify-between gap-4 md:flex-row md:items-center">
              <Typography variant={"h2"} className="font-raleway">
                {projectData.length} Airdrops
              </Typography>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="rounded-xl bg-[#E9E9E9] pl-10 pr-28 text-black dark:bg-white/30"
                />
                <Search className="absolute left-3 top-3 h-4 w-4" />
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Likelihood</TableHead>
                <TableHead>Quest</TableHead>
                <TableHead>Networks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectData.map((project, idx) => (
                <React.Fragment key={idx}>
                  <TableRow className="z-10 rounded-xl border-0 bg-[#b5b4b6]/30 px-8 py-7 backdrop-blur-md hover:bg-[#b5b4b6]/20 dark:bg-white/10 dark:text-white">
                    <TableCell className="cursor-pointer rounded-l-xl">
                      <Star />
                    </TableCell>
                    <TableCell className="font-medium">{idx + 1}</TableCell>
                    <TableCell>
                      <Link
                        href={`/airdrops/${project.id}`}
                        className="flex items-center gap-2"
                      >
                        {/* TODO: how do we get the project logo?  */}
                        <Image src={arbitrumLogo} alt={project.name} />
                        <span className="block space-y-0">
                          <Typography variant={"large"}>
                            {project.name}
                          </Typography>
                          <Typography
                            variant={"paragraph"}
                            className="max-w-[20ch] truncate"
                          >
                            {project.shortDescription}
                          </Typography>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>{project.difficulty}</TableCell>
                    <TableCell>{project.category}</TableCell>
                    <TableCell>{project.likelihood}</TableCell>
                    <TableCell>{project.tasks?.length}</TableCell>
                    <TableCell className="rounded-r-xl text-center">
                      <span className="flex items-center">
                        {activeChains.map((network, networkIdx) => (
                          <Image
                            src={network.iconUrl || ""}
                            alt="network"
                            key={networkIdx}
                            width={20}
                            height={20}
                            className="rounded-full"
                          />
                        ))}
                      </span>
                    </TableCell>
                  </TableRow>
                  {idx < projectData.length - 1 && (
                    <tr className="spacer" style={{ height: "10px" }}></tr>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}
