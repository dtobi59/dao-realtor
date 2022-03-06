import { useEffect, useState } from "react";
import { homes } from "../../assets/data/homes.json";
import { Layout } from "../../components";
import Header from "../../components/Header";
import HomeCard from "../../components/HomeCard";

const getListings = async () => {
  const listings = homes //fetch("../../assets/data/homes.json").then(res => res.json());
  return listings;
};

export default function HomeListings({ data }) {

  const [listings, setListings] = useState([]);

  useEffect(() => {
    getListings().then(listings => {
      setListings(listings);
    });
    return () => {
      // cleanup
    }
  }, [])


  return (
    <Layout>
      <Header title="Listings - Find your next investment!" description="Find your next investment" />
      <div className="pb-5">
        <div className="flex flex-col py-3 ">
          <h1 className="text-2xl font-bold text-center">Investment Opportunities</h1>
          <p className="text-center">Click on a property to learn more.</p>
          <div className="py-4">
            <a href="/projectsubmission" className="group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 stroke-sky-500 group-hover:stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path className="fill-content" d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z" />
                </svg>
                <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">New project</h3>
              </div>
              <p className="text-slate-500 group-hover:text-white text-sm">Submit a new project to the DAO.</p>
            </a>
          </div>
        </div>
        {listings && listings.map((listing, index) => {
          return HomeCard(listing, index);
        })}
      </div>
    </Layout>
  )
}
