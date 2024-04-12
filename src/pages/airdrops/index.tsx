import DashboardLayout from "@/components/dashboard/layout";
import AirdropsTable from "./airdrops-table";
import AirdropsSignup from "./airdrop-signup";

export default function AirdropHunterPage() {
  // Here we will be checking if the user is logged in or not
  // If the user is not logged in, we will ask to log in

  // If the user is logged in, we will check if the user is eligible for AirdropsTable

  // If the user is eligible, we will show AirdropsTable

  // If the user is not eligible, we will show AirdropsSignup
  return (
    <DashboardLayout>
      <AirdropsTable />
      {/* <AirdropsSignup /> */}
    </DashboardLayout>
  );
}
