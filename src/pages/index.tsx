import DashboardHome from "@/components/dashboard/dashboard-home";
import DashboardLayout from "@/components/dashboard/layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center md:py-6 ">
        <DashboardHome />
      </div>
    </DashboardLayout>
  );
}
