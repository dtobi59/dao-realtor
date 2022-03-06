import { HeroSection, Layout } from '../components';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="bg-black flex flex-col  min-h-screen">
      <Header
        title="A web3 real estate investment platform."
        description="A real estate platform that is transparent in its transaction while allowing individuals to participate in the investment of real estate projects through fractional investment."
      />

      <Layout>
        <HeroSection />
      </Layout>
    </div>
  );
}
