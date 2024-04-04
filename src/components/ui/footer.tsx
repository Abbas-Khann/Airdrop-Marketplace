import { cn } from "@/lib/utils";

interface FooterProps {
  isDashboard?: boolean;
}

export function Footer() {
  return (
    <div
      className={cn(
        "w-full bg-[#F6F6F6] p-6 py-14 dark:border-neutral-700 dark:bg-[#110E14] md:border-t md:pl-[130px] md:pr-8 lg:pl-[350px]",
      )}
    >
      Footer
    </div>
  );
}
