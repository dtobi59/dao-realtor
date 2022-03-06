import { AiOutlineShareAlt, AiOutlineTwitter } from "react-icons/ai";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";

export default function ListingHeading({ data }) {
  return (
    <div className="flex flex-row justify-around items-center pb-2">
      <div className="flex flex-col items-center px-8">
        <div className="text-[32px] py-1">{data.title}</div>
        <p className="text-xl">Developed by:</p>
      </div>
      <div className="flex items-center">
        <button className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-400 mx-3">
          <AiOutlineShareAlt className="text-white " />
        </button>
        <button className="px-4 py-2 bg-blue-900 rounded-md hover:bg-blue-500 mx-3">
          <FaFacebookF className="text-white " />
        </button>
        <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-700 mx-3">
          <AiOutlineTwitter className="text-white " />
        </button>
        <button className="px-4 py-2 bg-sky-600 rounded-md hover:bg-blue-700 mx-3">
          <FaTelegramPlane className="text-white " />
        </button>
      </div>
    </div>
  );
}
