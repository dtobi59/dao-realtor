
import { homes } from "../../assets/data/homes.json";
import { Layout } from "../../components";
import Header from "../../components/Header";
import ListingDetails from "../../components/ListingDetails";
import ListingHeading from "../../components/ListingHeading";
import ListingImages from "../../components/ListingImages";

export default function HomeListing({ data, id }) {

    return (
        <Layout>
            <Header title={data.title} description={data.description.description} />
            <div className="flex flex-row sm:flex-col min-w-screen justify-self-auto justify-center w-full">
                <div className="md:block sm:hidden">
                    <ListingHeading data={data} />
                </div>
                <ListingImages id={id} data={data} />
                <ListingDetails data={data} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    const id = params.id;
    const data = homes[id];
    return { props: { data, id } }
}