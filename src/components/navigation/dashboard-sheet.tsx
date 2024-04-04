import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { DashboardSidebar } from "../dashboard/sidebar";

export function DashboardSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="rotate-90" />
      </SheetTrigger>
      <SheetContent side={"left"} className=" border-neutral-600 p-0">
        <DashboardSidebar />
      </SheetContent>
    </Sheet>
  );
}
