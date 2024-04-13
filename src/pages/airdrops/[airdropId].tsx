"use client";
import React, { useEffect } from "react";
import AirdropDetails from "./airdrop-details";
import QuestsDetails from "./quests-details";
import DashboardLayout from "@/components/dashboard/layout";
import dynamic from "next/dynamic";
import { getProject } from "@/utils/api/project";
import { useRouter } from "next/router";

function AirdropPage() {
  const router = useRouter();

  useEffect(() => {
    const params = router.query;
    const fetchProject = async (id: number) => {
      try {
        const response = await getProject({ id: id });
        console.log(response);
        if (response) {
          // setProjectData(response);
        }
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch projects:", error);
        // setProjectData([]);
      }
    };

    console.log(params);

    if (params != undefined && params.airdropId != undefined) {
      fetchProject(Number(params.airdropId));
    }
  }, [router.query]);

  return (
    <DashboardLayout>
      <div className="mx-auto md:max-w-7xl">
        <div className="airdrop-layout py-6">
          <AirdropDetails />
          <QuestsDetails />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default dynamic(() => Promise.resolve(AirdropPage), {
  ssr: false,
});
