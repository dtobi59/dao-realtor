import ListingHeading from "./ListingHeading";

export default function ListingDetails({ data }) {
    return (

        <div className="flex flex-col w-full justify-center py-5 md:flex-row justify-self-auto">

            <div className="max-w-[500px] w-full">
                <div className="sm:block md:hidden">
                    <ListingHeading data={data} />
                </div>
                <div className="py-4">
                    <p className="text-center">{data.description.address}</p>

                    <p className="text-center">{data.description.bedrooms} bedrooms, {data.description.bathrooms} bathrooms</p>
                    <p className="text-center">{data.description.area} sqft</p>
                    <p className="text-center">${data.price}</p>
                    <p className="text-center py-5">{data.description.description}</p>
                </div>

            </div>

            {/*  actions */}
            <div className="max-w-[250px] w-full border rounded flex flex-col px-3 py-3 justify-center">
                <div className="text-center items-center  p-3 flex flex-row">
                    <p># of Validators</p>
                    <button type="button" className="bg-[#2952e3] my-4 w-1/2 rounded-full cursor-pointer px-2 py-1 hover:bg-[#2546bd]">
                        Validate
                    </button>
                </div>
                <hr />
                <div className="py-4">
                    <input type="number" className="py-1 px-2 w-full mb-4" placeholder="Amount" />
                    <button type="button" className="bg-[#2952e3] w-full rounded-full cursor-pointer px-2 py-1 hover:bg-[#2546bd]">
                        Invest
                    </button>
                </div>
            </div>
        </div>
    )
}
