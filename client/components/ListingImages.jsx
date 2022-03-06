import Image from "next/image";
import { useEffect, useState } from "react";
import { getLinks } from "../lib/web3storage";

export default function ListingImages({ id, data }) {

    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState([]);

    const getImages = async () => {
        const links = await getLinks(data.image_hash);
        if (!links) return links;
        setImages(links);
        setLoading(false);
    };

    useEffect(() => {
        getImages();
    }, []);

    console.log(images);

    return (
        <section className="overflow-hidden">
            <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
                <div className="flex flex-wrap -m-1 md:-m-2">
                    {loading ? (
                        <>Loading images...</>
                    ) : (
                        images &&
                        <>
                            <div className="flex flex-wrap w-1/2">
                                <div className="w-full p-1 md:p-2">
                                    <Image
                                        width={1000}
                                        height={680}
                                        src={`/api/imageProxy?imageUrl=${images[0].src}`} alt={data.title}
                                        className="block object-cover object-center w-full h-full rounded-tl-2xl rounded-bl-2xl opacity-100 hover:opacity-90 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-1/2">
                                {images.map((image, index) => {
                                    if (index != 0) {
                                        return (
                                            <div className="w-1/2 p-1 md:p-2" key={index}>
                                                <Image
                                                    src={`/api/imageProxy?imageUrl=${image.src}`}
                                                    width={300}
                                                    height={200}
                                                    alt={data.title}
                                                    className="block object-cover object-center w-full h-full opacity-100 hover:opacity-90 cursor-pointer"
                                                />
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}



