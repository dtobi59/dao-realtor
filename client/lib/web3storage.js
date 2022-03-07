import { create } from 'ipfs-http-client';
import { Web3Storage } from 'web3.storage';

function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an 
    // environement variable or other configuration that's kept outside of 
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE4NmU3ODdhNzQ1NUIxQjc0Q2VEMDJkMDU0RTZBMEUxNTJDYjQzRDgiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDY1MTQ5ODkwMDMsIm5hbWUiOiJyZWFsdG9yREFPIn0.6Lt8vrGvVZQURQM6E4vJLMNHjaBAb5_DUHSL-VhpZTk";

    // const token = process.env.WEB3STORAGE_TOKEN
    return token;
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

const createFileObjects = (files) => {
    if (!files) { return };
    const fileObjects = [];
    files.forEach((file, index) => {
        const blob = new Blob([file.raw], { type: file.raw.type });
        const fileObject = new File([blob], file.name, { type: file.raw.type });
        fileObjects.push(fileObject);
    })
    return fileObjects;
}

export async function storeFiles(files) {
    if (files.length < 1) {
        console.error('No files to push');
        return
    }
    const client = makeStorageClient()
    const fileObjects = createFileObjects(files);
    const cid = await client.put(fileObjects)
    return cid
}

const formatLinks = async (links, cid) => {
    if (!links) { return };
    const formattedLinks = [];
    const url = `https://${cid}.ipfs.dweb.link/`
    links.forEach((link) => {
        formattedLinks.push({
            src: url + link.name,
            name: link.name
        });
    });
    return formattedLinks;
}


export async function getLinks(cid) {
    if (!cid) {
        console.error('No CID provided');
        return null;
    }
    const url = 'https://dweb.link/api/v0'
    const ipfs = create({ url })
    const links = [];
    for await (const link of ipfs.ls(cid)) {
        links.push(link)
    }
    return await formatLinks(links, cid);
}