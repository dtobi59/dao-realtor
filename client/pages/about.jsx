import Image from "next/image";
import { Layout } from "../components";

const about = () => {
  return (
    <div className="bg-black h-screen">
      <Layout>
        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl border-b-2 inline pb-1 border-sky-700">
            Project Introduction:
          </h1>
          <p className="mt-5">
            We have built a Decentralised Autonomous Platform for Real estate
            investment that is KYC & AML compliant. This platform connects real
            estate developers and a large pool of investors that will be
            confident investing in a real estate project regardless of where the
            project is located through the help of a local real estate expert
            that will be able to convince them in a transparent manner.
          </p>
        </div>

        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl border-b-2 inline pb-1 border-sky-700">
            Project Inspiration:
          </h1>
          <p className="mt-5">
            Real estate projects are usually capital intensive. Hence, anyone
            who wishes to embark on them must be financially credible. This
            creates a gap for young people like us who may not be patient enough
            to invest in our first property until we are financially credible to
            embark on such a project.
          </p>
        </div>
        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl mb-4 border-b-2 inline  border-sky-700">
            Challenges faced in the devlopment and how they were overcamed:
          </h1>
          <p className="mt-5">
            <span className="mr-2 text-blue-600">➼</span> Making the project
            fully web3 compatible, however, we overcame this problem by hosting
            the project in an IPFS server via filecoin.
          </p>
          <p className="mt-5">
            <span className="mr-2 text-blue-600">➼</span>Woking with the{" "}
            <strong>ether</strong> currency while deploying the dao-realtor
            project to the polygon chain which uses <strong>matics</strong> .
            However, we were able to over this challenge through extensive
            research or consultation from experienced web3 developers.
          </p>
        </div>
        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl border-b-2 inline pb-1 border-sky-700">
            Future Plans after the Hackathon:
          </h1>
          <p className="mt-5">
            Yes, the team has agreed to continue adding new features and
            reviewing the business model(incentive structure) of the dao-realtor
            app after the web3con hackathon.
          </p>
        </div>

        <div className="my-20 flex justify-center">
          <p className="text-center text-3xl border-b-2 inline pb-1 border-sky-700">
            Meet the Team
          </p>
        </div>
        <div className="flex justify-around items-center mb-48">
          <div>
            <div className="border-4 border-indigo-500/75 rounded-full mb-8">
              <Image
                width={265}
                height={300}
                src="/AK.PNG"
                alt="jaymes-image"
                className="rounded-full object-contain border-2"
              />
            </div>
            <p className="text-white text-center italic text-xl">
              Avrahm Kleinholz
            </p>
          </div>
          <div>
            <div className="border-4 border-indigo-500/75 rounded-full mb-8">
              <Image
                width={265}
                height={300}
                src="/vercel.svg"
                alt="jaymes-image"
                className="rounded-full object-contain border-2"
              />
            </div>
            <p className="text-white text-center italic text-xl">
              Olaboye David Tobi
            </p>
          </div>
          <div>
            <div className="border-4 border-indigo-500/75 rounded-full mb-8">
              <Image
                width={240}
                height={300}
                src="/Jaymes.png"
                alt="jaymes-image"
                className="rounded-full object-contain"
              />
            </div>
            <p className="text-white text-center italic text-xl">
              Clement James Jnr
            </p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default about;
