import Image from "next/image";
import { BiCurrentLocation } from "react-icons/bi";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { FaBath } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    return (images[item.replace("./", "")] = r(item));
  });
  return images;
}

const images = importAll(
  require.context("../assets/images", false, /\.(png|jpe?g|svg|gif)$/)
);

export default function HomeCard(home, index) {
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
          <h2 className="text-2xl font-semibold">{home.title}</h2>
          <div className="">
            <p className="text-xl mb-2 text-blue-600 -mt-14">${home.price}</p>
            <div className="flex items-center text-xl mb-2 mt-4">
              <BiCurrentLocation className="text-red-500 animate-pulse" />
              <p className="ml-3">{home.description.address}</p>
            </div>
            <div className="flex items-center text-xl ">
              <div className="flex items-center text-xl">
                <IoIosBed />
                <p className="ml-2">{home.description.bedrooms} bedrooms</p>
              </div>
              <div className="flex items-center ml-6">
                <FaBath />
                <p className="ml-2">{home.description.bathrooms} bathrooms</p>
              </div>
              <div className="flex items-center ml-6">
                <BsBoundingBoxCircles />
                <p className="ml-2">{home.description.area} sqft</p>
              </div>
            </div>
          </div>
          <a
            href={`/homelistings/${home.id}`}
            type="button"
            className="bg-[#2952e3] block rounded-full cursor-pointer px-4 py-2 hover:bg-[#2546bd] -mt-8 shadow-lg shadow-blue-500/50"
          >
            Learn more
          </a>
        </div>
      </div>
    </div>
  );
}
