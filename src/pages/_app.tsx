import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from "@rainbow-me/rainbowkit-siwe-next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in",
});

const queryClient = new QueryClient();

const wagmiConfig = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_WALLETCONNECT_APP_NAME || "",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "",
  chains: [mainnet],
  ssr: true,
});

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <main className={`font-sans ${inter.variable}`}>
      <WagmiProvider config={wagmiConfig}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitSiweNextAuthProvider
              getSiweMessageOptions={getSiweMessageOptions}
            >
              <RainbowKitProvider>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="dark"
                  // enableSystem={true}
                >
                  <Component {...pageProps} />
                </ThemeProvider>
              </RainbowKitProvider>
            </RainbowKitSiweNextAuthProvider>
          </QueryClientProvider>
        </SessionProvider>
      </WagmiProvider>
    </main>
  );
}

export default MyApp;
