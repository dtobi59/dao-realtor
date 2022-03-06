

export default function ListingHeading({ data }) {
    return (
        <div className="flex flex-row justify-around items-center pb-2">
            <div className="flex flex-col items-center px-8">

                <div className="text-[32px] py-1">
                    {data.title}
                </div>
                <div className="py-2">
                    Developed by:
                </div>
            </div>
            <div className="px-10">
                share buttons
            </div>
        </div>
    )
}
