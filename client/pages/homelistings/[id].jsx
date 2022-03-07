
import { useContext, useEffect, useState } from "react";
import { Layout } from "../../components";
import Header from "../../components/Header";
import ListingDetails from "../../components/ListingDetails";
import ListingHeading from "../../components/ListingHeading";
import ListingImages from "../../components/ListingImages";
import { TransactionContext } from "../../context/TransactionContext";

export default function HomeListing({ id }) {

  const { listings } = useContext(TransactionContext);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  function findListing(id) {
    if (!listings) return;
    listings.map((listing) => {
      if (listing.id == id) {
        setData(listing);
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    if (!listings) return;
    findListing(id);
  }, [listings]);

  return (
    <Layout>
      {loading ? (
        <div className="h-screen text-xl flex justify-center items-center">Loading...</div>
      ) : (
        <>
          <Header title={data.title} description={data.description.description} />
          <div className="flex flex-row sm:flex-col min-w-screen justify-self-auto justify-center w-full">
            <div className="md:block sm:hidden">
              <ListingHeading data={data} />
            </div>
            <ListingImages id={id} data={data} />
            <ListingDetails data={data} />
          </div>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {

  const id = params.id;
  // const src = homes[id];
  return { props: { id } };
}



// export async function getServerSideProps({ data }) {

//   const home = data.home;
//   return { props: { data: home } };
// }