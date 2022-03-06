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

export default function HomeCard(home, index) {
    const imgLink = `home_front_${index}.jpeg`;

    return (
        <div className="flex flex-col items-center justify-center" key={index}>
            <div className="flex flex-row items-center justify-center py-2">
                <div>
                    <Image src={images[imgLink]} width={300} height={200} alt={home.title} />
                </div>
                <div className="flex flex-col items-center justify-center px-4 py-4">
                    <h2 className="text-2xl font-bold text-center">{home.title}</h2>
                    <div className="py-4">
                        <p className="text-center">{home.description.address}</p>
                        <p className="text-center">{home.description.bedrooms} bedrooms, {home.description.bathrooms} bathrooms</p>
                        <p className="text-center">{home.description.area} sqft</p>
                        <p className="text-center">${home.price}</p>
                    </div>
                    <a href={`/homelistings/${index}`} type="button" className="bg-[#2952e3] block rounded-full cursor-pointer px-2 py-1 hover:bg-[#2546bd]">
                        Learn more
                    </a>
                </div>
            </div>
            <hr className="bg-gray-400 border-t w-1/2" />
        </div>
    )
}