import Head from "next/head";
import { Layout } from "@/components/dashboard/layout";

export default function Home() {
  return (
    <>
      <Layout>
        <Head>
          <title>Etherway Airdrop Marketplace</title>
          <meta name="description" content="Airdrop marketplace" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-col items-center justify-center">
          Landing page
        </main>
      </Layout>
    </>
  );
}
