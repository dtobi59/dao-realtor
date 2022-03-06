import { HeroSection, Layout } from '../components';
import Header from '../components/Header';

export default function Home() {
  return (
    <Layout>
      <Header title="A web3 real estate investment platform." description="A real estate platform that is transparent in its transaction while allowing individuals to participate in the investment of real estate projects through fractional investment." />
      <HeroSection />
    </Layout>
  );
}
