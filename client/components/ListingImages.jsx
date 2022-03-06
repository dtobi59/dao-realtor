import Image from "next/image";
import { useEffect, useState } from "react";
import { getLinks } from "../lib/web3storage";

const Images = ({ data }) => {
    if (!data) return null;
    return data.map((item, index) => {
        return (
            <div className="sm:max-w-[250px] sm:h-[150px] md:max-w-50px md:float-right" key={index}>
                <Image objectFit="cover" src={`/api/imageProxy?imageUrl=${item.src}`} alt={item.alt || ""} width={1000} height={600} />
            </div>
        );
    });
};

export default function ListingImages({ id, data }) {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const getImages = async () => {
        const cid = data.image_hash
        const links = await getLinks(cid);
        const imageData = [];
        if (!links) return imageData;
        const url = `https://${cid}.ipfs.dweb.link/`
        links.forEach((link) => {
            imageData.push({
                src: url + link.name,
                alt: link.name
            });
        });
        setImages(imageData);
        setLoading(false);
    };

    useEffect(() => {
        getImages();
    }, []);

    console.log(images);


    return (
        <div className="flex flex-col justify-center gap-4 px-3 py-5 md:flex-row">
            {loading ? (
                <>Loading Images...</>
            ) : (
                <>
                    <Images data={images} />
                </>
            )}
        </div>
    )
}
