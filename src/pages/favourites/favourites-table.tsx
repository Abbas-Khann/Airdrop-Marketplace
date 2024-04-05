import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import milkyWay from "@/assets/dashboard/milkyway.svg";
import network1 from "@/assets/dashboard/eth.svg";
import network2 from "@/assets/dashboard/network2.svg";
import React from "react";
import { Typography } from "@/components/ui/typography";

const mockData = [
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
  {
    protocol: {
      name: "MilkyWay",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti enim illum quod, nihil corporis optio repudiandae blanditiis ab repellendus, harum debitis, praesentium neque! Praesentium, ad. Eum molestiae vel accusamus in.",
      logo: milkyWay,
    },
    difficulty: "Easy",
    category: "Wallet",
    likelihood: "High",
    quest: "0/2",
    networks: [network1, network2],
  },
];

export default function FavouritesTable() {
  return (
    <>
      <div className="space-y-6 py-6 md:space-y-12">
        <Typography variant={"h2"} className=" font-raleway">
          {mockData.length} Airdrops
        </Typography>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="dark:text-slate-200">
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
        <div className="my-2" />
        <TableBody></TableBody>
      </Table>
    </>
  );
}
