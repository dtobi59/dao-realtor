import Head from "next/head";
import { Layout, HeroSection } from '../components';



export default function Home() {
  return (
    <div className="bg-black flex flex-col  min-h-screen">
      <Head>
        <title>DOA-REALTOR</title>
        <meta name="description" content="Team dao-realtor" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-grow">
        <Layout>
          <HeroSection />
        </Layout>
      </div>
    </div>
  );
}
