import Image from "next/image";

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

export default function ListingImages({ id, data }) {
    const frontImg = `home_front_${id}.jpeg`;
    const interiorImg = `home_interior_${id}.jpeg`;
    const bathImg = `home_bath_${id}.jpeg`;
    const floorplanImg = `home_floorplan_${id}.jpeg`;
    const floorplanAImg = `home_floorplan_${id}a.jpeg`;

    return (
        <div className="flex flex-col justify-center gap-4 px-3 py-5 md:flex-row">
            <div className="md:max-w-[550px] w-full">
                <Image objectFit="cover" src={images[frontImg]} alt={data.title} />
            </div>
            <div className="grid grid-cols-4 gap-4 place-content-center md:grid-cols-2">
                <div className="md:max-w-[250px] h-[150px]">
                    <Image objectFit="cover" src={images[interiorImg]} alt={data.title} />
                </div>
                <div className="max-w-[250px]">
                    <Image objectFit="cover" src={images[bathImg]} alt={data.title} />
                </div>
                <div className="max-w-[250px]">
                    <Image objectFit="cover" src={images[floorplanImg]} alt={data.title} />
                </div>
                <div className="max-w-[250px]">
                    <Image objectFit="cover" src={images[floorplanAImg]} alt={data.title} />
                </div>
            </div>
        </div>
    )
}
