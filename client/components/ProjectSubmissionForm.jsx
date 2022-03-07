// Project Submission Component
// Allows a developer to submit a project to the platform
import Image from 'next/image';
import { useContext, useRef, useState } from "react";
import { TransactionContext } from '../context/TransactionContext';
import { storeFiles } from "../lib/web3storage";


// Required Fields: 
// Name: Project Name
// Description: {description, bedrooms, bathrooms, area, address, country}
// Price: Total Price
// Longitude: Longitude
// Latitude: Latitude
// Image: {image, image2, image3, image4}

// Should be able to upload images to IPFS and store the hash in the database 

export default function ProjectSubmissionForm({ setLoading }) {
    const fileInputRef = useRef();
    const [name, setName] = useState('');
    const [description, setDescription] = useState({});
    const [price, setPrice] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [files, setFiles] = useState([]);
    const [increment, setIncrement] = useState(0);
    const { createProperty } = useContext(TransactionContext);

    const handleFileChange = (e) => {
        if (!e.target.files) { return fileInputRef.current.value = null; };

        const fileTypeRegex = /(\.jpg|\.jpeg|\.png)$/i;
        if (!fileTypeRegex.test(e.target.files[0].name)) {
            alert("File type not supported. Only jpg, jpeg, and png files are supported.");
            return fileInputRef.current.value = null;
        }

        setIncrement(increment + 1);

        const fileName = name.split(" ").join("").toLowerCase();
        const ext = e.target.files[0].name.substr(e.target.files[0].name.lastIndexOf('.') + 1);
        const imgObj = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            name: fileName + "_" + increment + "." + ext
        }
        setFiles([...files, imgObj]);
        return fileInputRef.current.value = null;
    }

    const handleDataBeforeSendingToBlockchain = async () => {
        const image_hash = await storeFiles(files);
        const descriptionString = JSON.stringify(description);
        const data = {
            price,
            name,
            description: descriptionString,
            longitude,
            latitude,
            image_hash
        }
        return data;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setLoading(true);
            const response = await handleDataBeforeSendingToBlockchain();
            if (response) {
                console.log("success", response);
                try {
                    const createPropertyOnChain = await createProperty(response);
                    if (createPropertyOnChain) {
                        setLoading(false);
                        return clearForm();
                    }
                } catch (error) {
                    setLoading(false);
                    console.error(error);
                    alert(`Error: ${error.data.message || "Unknown Error"}`);
                }
            }
        }
    }

    const isFormValid = () => {
        if (!name || !description || !price || !latitude || !longitude || !files.length >= 1) {
            alert("Please fill out all fields.");
            return false;
        }
        return true;
    }

    const clearImage = (index) => {
        setIncrement(increment + 1);
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    }

    const clearForm = () => {
        setName('');
        setDescription({});
        setPrice('');
        setLatitude('');
        setLongitude('');
        setFiles([]);
    }

    return (
        <div className="flex flex-wrap md:justify-between pb-10">
            <div className="w-full md:w-1/2 lg:w-6/12 px-4  place-content-center">
                <div className="rounded-lg p-2  shadow-lg  text-center">
                    <h2 className="text-2xl font-bold">Project Name</h2>
                    <input type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black" disabled={files.length > 0 ? true : false}
                        placeholder="Project Name" value={name || ''} onChange={(e) => setName(e.target.value)} />
                    <div className="py-4  text-center">
                        <div className="mb-6">
                            <p className="text-center">Description</p>
                            <textarea type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                placeholder="Description" value={description.description || ''} onChange={(e) => setDescription({ ...description, description: e.target.value })} />
                        </div>
                        <div className="mb-6">
                            <p className="text-center">Price</p>
                            <input type="number" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                placeholder="Price" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div className="mb-6 flex flex-row justify-center gap-4">
                            <div className="mb-2">
                                <p className="text-center">Bedrooms</p>
                                <input type="number" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="5" value={description.bedrooms || ''} onChange={(e) => setDescription({ ...description, bedrooms: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <p className="text-center">Bathrooms</p>
                                <input type="number" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="3.5" value={description.bathrooms || ''} onChange={(e) => setDescription({ ...description, bathrooms: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <p className="text-center">Area (sq ft)</p>
                                <input type="number" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="2000" value={description.area || ''} onChange={(e) => setDescription({ ...description, area: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-6 flex flex-row justify-center gap-4">
                            <div className="mb-4">
                                <p className="text-center">Address</p>
                                <input type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="Address" value={description.address || ''} onChange={(e) => setDescription({ ...description, address: e.target.value })} />
                            </div>
                            <div className="mb-2">
                                <p className="text-center">Country</p>
                                <input type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="Country" value={description.country || ''} onChange={(e) => setDescription({ ...description, country: e.target.value })} />
                            </div>
                        </div>
                        <div className="mb-6 flex flex-row justify-center gap-4">
                            <div className="mb-2">
                                <p className="text-center">Longitude</p>
                                <input type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="Latitude" value={latitude || ''} onChange={(e) => setLatitude(e.target.value)} />
                            </div>
                            <div className="mb-2">
                                <p className="text-center">Latitude</p>
                                <input type="text" className="bg-gray-200 w-full px-2 py-1 rounded text-black"
                                    placeholder="Longitude" value={longitude || ''} onChange={(e) => setLongitude(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 lg:w-6/12 px-4 sm:flex sm:justify-center sm:mb-20">
                <div className="max-w-[570px] pt-2 ">

                    <div className="pb-2  text-center">
                        <p className="text-center pb-3">Upload Images ({files.length} out of 5)</p>
                        <div className="flex flex-wrap justify-around gap-4">
                            {files && files.map((file, index) => { return <Image src={file.preview} width="150" height="150" onClick={() => clearImage(index)} key={index} /> })}
                        </div>
                    </div>
                    <hr />
                    <div className="pb-20">
                        <input type="file" accept="image/jpg,image/png" name="image" className="py-3" id="image" ref={fileInputRef} disabled={!name || files.length >= 5 && true} onChange={handleFileChange} />

                        <div className="flex flex-row ">
                            <button onClick={handleSubmit} className="bg-[#2952e3] block rounded cursor-pointer px-2 py-1 m-3 hover:bg-[#2546bd]">
                                Submit
                            </button>
                            <button onClick={clearForm} className="bg-gray-300 text-black block rounded cursor-pointer px-2 py-1  m-3 hover:bg-gray-500">Clear</button>
                            <button onClick={() => console.log(files)}>LOG</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
