import { Layout } from "../components";

const about = () => {
  return (
    <div className="bg-black min-h-screen">
      <Layout>
        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl mb-4 border-b-2 w-56">
            Project Introduction:
          </h1>
          <p>
            We have built a Decentralised Autonomous Platform for Real estate
            investment that is KYC & AML compliant. This platform connects real
            estate developers and a large pool of investors that will be
            confident investing in a real estate project regardless of where the
            project is located through the help of a local real estate expert
            that will be able to convince them in a transparent manner.
          </p>
        </div>

        <div className="mx-32 mb-4 mt-10">
          <h1 className="text-left text-2xl mb-4 border-b-2 w-52">
            Project Motivation:
          </h1>
          <p>
            Real estate projects are usually capital intensive. Hence, anyone
            who wishes to embark on them must be financially credible. This
            creates a gap for young people like us who may not be patient enough
            to invest in our first property until we are financially credible to
            embark on such a project.
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default about;
