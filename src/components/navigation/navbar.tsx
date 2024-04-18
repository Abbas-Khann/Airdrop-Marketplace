import logoDark from "@/assets/dark-logo.svg";
import logoLight from "@/assets/light-logo.svg";
import logo from "@/assets/logo-symbol.svg";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { HeaderSheet } from "./header-sheet";
import { ConnectWalletButton } from "../ui/connect-button";
import { useAuth } from "@/context/authContext";

interface NavLinks {
  label: string;
  paths: {
    href: string;
    label: string;
  }[];
}

export function Header() {
  return (
    <div className="fixed z-50 flex w-full items-center justify-between border-b border-neutral-400/50 bg-white/50 p-4 backdrop-blur-xl dark:bg-black/50 md:px-16 md:py-4">
      <div className="hidden flex-1 md:block">
        <Link href="/" className="flex items-center justify-start">
          <Image
            src={logoDark}
            alt="etherway logo"
            className="block w-40 dark:hidden"
          />
          <Image
            src={logoLight}
            alt="etherway logo"
            className="hidden w-40 dark:block"
          />
        </Link>
      </div>
      <Link href={"/"} className="md:hidden">
        <Image
          src={logo}
          alt="Icon"
          className="block md:hidden"
          width={30}
          height={30}
        />
      </Link>
      <div className="hidden flex-1 items-center justify-center gap-3 md:flex">
        <NavLinks />
      </div>

      <div className="hidden  flex-1 items-center justify-end gap-3  md:flex">
        <ConnectWalletButton />
      </div>

      <div className="block md:hidden">
        <HeaderSheet />
      </div>
    </div>
  );
}

export function NavLinks() {
  const { isAdmin } = useAuth();
  return (
    <>
      <Link
        href={"/dashboard"}
        className={cn(buttonVariants({ variant: "navbar" }))}
      >
        Airdrop Marketplace
      </Link>
      {isAdmin && (
        <Link
          href={"/admin"}
          className={cn(buttonVariants({ variant: "navbar" }))}
        >
          Admin
        </Link>
      )}
    </>
  );
}
