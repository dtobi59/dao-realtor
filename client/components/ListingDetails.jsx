import { BiCurrentLocation } from "react-icons/bi";
import { BsBoundingBoxCircles, BsFillInfoCircleFill } from "react-icons/bs";
import { FaBath } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import ListingHeading from "./ListingHeading";

export default function ListingDetails({ data }) {
  return (
    <div className="flex justify-around">
      <div className="">
        <div className="sm:block md:hidden">
          <ListingHeading data={data} />
        </div>
        {/*  */}
        <div className="pb-4 my-10">
          <p className="text-xl mb-2 text-blue-600 mt-2">${data.price}</p>
          <div className="flex items-center text-xl mb-2">
            <BiCurrentLocation className="text-red-500" />
            <p className="ml-3">{data.description.address}</p>
          </div>
          <div className="flex items-center text-xl">
            <div className="flex items-center">
              <IoIosBed />
              <p className="ml-2">{data.description.bedrooms} bedrooms</p>
            </div>
            <div className="flex items-center ml-6">
              <FaBath />
              <p className="ml-2">{data.description.bathrooms} bathrooms</p>
            </div>
            <div className="flex items-center ml-6">
              <BsBoundingBoxCircles />
              <p className="ml-2">{data.description.area} sqft</p>
            </div>

          </div>

          <div className="flex items-center ml-6 py-10 text-xl">
            <BsFillInfoCircleFill />
            <p className="ml-2">{data.description.description} </p>
          </div>
        </div>
      </div>

      {/*  actions */}
      <div className=" w-80 border border-slate-500 rounded flex flex-col px-3 py-3 justify-center my-12">
        <div className="text-center items-center  p-3 flex">
          <p># of Validators</p>
          <button
            type="button"
            className="bg-[#2952e3] my-4 w-1/2 rounded-full cursor-pointer mx-4 px-2 py-1 hover:bg-[#2546bd] shadow-lg shadow-blue-500/50"
          >
            Validate
          </button>
        </div>
        <hr />
        <div className="py-4 flex flex-col">
          <input
            type="number"
            className="py-1 px-2 w-full mb-4"
            placeholder="Amount"
          />
          <button
            type="button"
            className="bg-[#2952e3] w-32 self-center rounded-full cursor-pointer px-2 py-1 hover:bg-[#2546bd] shadow-lg shadow-blue-500/50"
          >
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}
