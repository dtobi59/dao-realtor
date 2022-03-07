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
      <section className="overflow-hidden">
        <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
          <div className="flex flex-wrap -m-1 md:-m-2">
            <div className="flex flex-wrap w-1/2">
              <div className="w-full p-1 md:p-2">
                <Image
                  width={1000}
                  height={680}
                  src={images[frontImg]}
                  alt={data.title}
                  className="block object-cover object-center w-full h-full rounded-tl-2xl rounded-bl-2xl opacity-100 hover:opacity-90 cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-1/2">
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  src={images[interiorImg]}
                  width={300}
                  height={200}
                  alt={data.title}
                  className="block object-cover object-center w-full h-full opacity-100 hover:opacity-90 cursor-pointer"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  src={images[bathImg]}
                  width={300}
                  height={200}
                  alt={data.title}
                  className="block object-cover object-center w-full h-full rounded-tr-2xl opacity-100 hover:opacity-90 cursor-pointer"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  src={images[floorplanImg]}
                  width={300}
                  height={200}
                  alt={data.title}
                  className="block object-cover object-center w-full h-full  opacity-100 hover:opacity-90 cursor-pointer"
                />
              </div>
              <div className="w-1/2 p-1 md:p-2">
                <Image
                  src={images[floorplanAImg]}
                  width={300}
                  height={200}
                  alt={data.title}
                  className="block object-cover object-center w-full h-full rounded-br-2xl opacity-100 hover:opacity-90 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}
