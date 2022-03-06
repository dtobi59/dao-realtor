import Image from "next/image";
import { homes } from "../../assets/data/homes.json";
import { Layout } from "../../components";
import { BiCurrentLocation } from "react-icons/bi";
import { IoIosBed } from "react-icons/io";
import { FaBath } from "react-icons/fa";
import { BsBoundingBoxCircles } from "react-icons/bs";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../../assets/images", false, /\.(png|jpe?g|svg)$/)
);

const HomeCard = (home, index) => {
  const imgLink = `home_front_${index}.jpeg`;

  return (
    <div className="flex flex-col mt-5" key={index}>
      <div className="flex flex-row  mx-44  border-b-2 border-slate-500 py-8">
        <div>
          <Image
            src={images[imgLink]}
            width={400}
            height={250}
            alt={home.title}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col items-start justify-between px-4 pb-4 ml-12">
          <h2 className="text-3xl font-semibold ">{home.title}</h2>
          <div className="pb-4">
            <p className="text-xl mb-2 text-blue-600 mt-2">{home.price}</p>
            <div className="flex items-center text-xl mb-2">
              <BiCurrentLocation className="text-red-500 animate-pulse" />
              <p className="ml-3">{home.address}</p>
              <p className="ml-1">
                {home.city}, {home.state} {home.zip}
              </p>
            </div>
            <div className="flex items-center text-xl">
              <div className="flex items-center">
                <IoIosBed />
                <p className="ml-2">{home.beds} beds</p>
              </div>
              <div className="flex items-center ml-6">
                <FaBath />
                <p className="ml-2">{home.baths} baths</p>
              </div>
              <div className="flex items-center ml-6">
                <BsBoundingBoxCircles />
                <p className="ml-2">{home.area} </p>
              </div>
            </div>
            <p className="flex mt-4">
              {Array(home.rating)
                .fill()
                .map((_, i) => (
                  <p>⭐</p>
                ))}
            </p>
          </div>
          <a
            href={`/homelistings/${index}`}
            type="button"
            className="bg-[#2952e3] block rounded-full cursor-pointer px-4 py-2 hover:bg-[#2546bd]"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
};

export default function HomeListings({ data }) {
  return (
    <div className="bg-black min-h-screen items-center justify-center text-white">
      <Layout>
        <div className="pb-5">
          <div className="flex flex-col py-3 ">
            <h1 className="text-2xl font-bold text-center">Home Listings</h1>
            <p className="text-center">Click on a home to learn more.</p>
            <div className="py-4">
              <a
                href="/projectsubmission"
                className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500"
              >
                <div className="flex items-center space-x-3">
                  <svg
                    className="w-6 h-6 stroke-sky-500 group-hover:stroke-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      className="fill-content"
                      d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
                    />
                  </svg>
                  <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">
                    New project
                  </h3>
                </div>
                <p className="text-slate-500 group-hover:text-white text-sm">
                  Submit a new project to the DAO.
                </p>
              </a>
            </div>
          </div>
          {homes &&
            homes.map((home, index) => {
              return HomeCard(home, index);
            })}
        </div>
      </Layout>
    </div>
  );
}
