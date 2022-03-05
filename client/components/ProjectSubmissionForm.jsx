// Project Submission Component
// Allows a developer to submit a project to the platform

import Image from "next/image";
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
    const { createProperty } = useContext(TransactionContext);

    const handleFileChange = (e) => {
        if (!e.target.files) { return fileInputRef.current.value = null; };

        const fileTypeRegex = /(\.jpg|\.jpeg|\.png)$/i;
        if (!fileTypeRegex.test(e.target.files[0].name)) {
            alert("File type not supported. Only jpg, jpeg, and png files are supported.");
            return fileInputRef.current.value = null;
        }

        const fileName = name.split(" ").join("").toLowerCase();
        const ext = e.target.files[0].name.substr(fileName.lastIndexOf('.') + 1);
        const imgObj = {
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
            name: fileName + "_" + files.length + ext
        }
        setFiles([...files, imgObj]);
        return fileInputRef.current.value = null;
    }

    const handleDataBeforeSendingToBlockchain = async () => {
        const cid = await storeFiles(files);
        const descriptionString = JSON.stringify(description);
        const data = {
            price,
            name,
            description: descriptionString,
            longitude,
            latitude,
            cid
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
                const createPropertyOnChain = await createProperty(response);
                console.log("createPropertyOnChain", createPropertyOnChain);
                setLoading(false);
                clearForm();
            } else {
                console.log("error");
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
        <div className="container">
            <div className="flex flex-wrap md:justify-between">
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
                <div className="w-full md:w-1/2 lg:w-6/12 px-4 sm:flex sm:justify-center">
                    <div className="max-w-[570px] pt-2 ">

                        <div className="pb-2  text-center">
                            <p className="text-center pb-3">Upload Images</p>
                            <div className="flex flex-wrap justify-around gap-4">
                                {files && files.map((file, index) => { return <Image src={file.preview} width="70" height="70" onClick={clearImage} key={index} /> })}
                            </div>
                        </div>
                        <hr />
                        <div className="">
                            <input type="file" accept="image/jpg,image/png" name="image" className="py-3" id="image" ref={fileInputRef} disabled={!name || files.length >= 5 && true} onChange={handleFileChange} />
                            <button onClick={handleSubmit} className="bg-[#2952e3] block rounded cursor-pointer px-2 py-1 hover:bg-[#2546bd]">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
