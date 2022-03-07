import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../lib/constants";
import { client } from "../lib/sanityClient";
const generated_hash = require("crypto");

export const TransactionContext = React.createContext();

let eth;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();

  const [listings, setListings] = useState([]);
  useEffect(() => {
    if (!currentAccount) return;
    (async () => {
      console.log("Account changed! reload page...");
    })();
  }, [currentAccount]);

  const saveData = async (data) => {
    //todo: implement sanity
    const _hash = generated_hash
      .createHash("sha256")
      .update(data, "utf8")
      .digest("hex");

    const txDoc = {
      _type: "users",
      _id: _hash,
      name: data.officialName,
      address: data.currentAccount,
      account_type: data.accountType,
      government_id: data.governmentId,
      home_address: data.streetAddress,
    };

    await client.createIfNotExists(txDoc);

    return _hash;
  };

  const createAccount = async (data) => {
    switch (data.accountType) {
      case "developer":
        createDeveloperAccount(data);
        break;
      case "validator":
        createValidatorAccount(data);
        break;
      case "investor":
        createInvestorAccount(data);
        break;
      default:
        alert("Invalid Account type");
    }
  };

  const createDeveloperAccount = async (
    data,
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    let _data = {
      name: data.officialName,
      account_type: data.accountType,
      govt_id: data.governmentId,
      address: data.streetAddress,
      wallet_address: currentAccount,
    };

    const kyc_hash = saveData(data);

    if (kyc_hash) {
      if (!metamask) return alert("Please install metamask ");
      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther("0.0001")

      var _params = {
        value: parsedAmount,
      };

      // await metamask.request({
      //   method: 'eth_sendTransaction',
      //   params: _params
      // })

      const transactionHash = await transactionContract.createValidator(kyc_hash, _params)

      await transactionHash.wait();

      alert("Developer Account created onchain");
    }
  };

  const createValidatorAccount = async (
    data,
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    let _data = {
      name: data.officialName,
      account_type: data.accountType,
      govt_id: data.governmentId,
      address: data.streetAddress,
      wallet_address: currentAccount,
    };

    const kyc_hash = saveData(data);

    if (kyc_hash) {
      if (!metamask) return alert("Please install metamask ");
      const transactionContract = getEthereumContract();

      // var _params = [
      //   {
      //     gas: '0x7EF40', // 520000 Gwei
      //     value: parsedAmount._hex,
      //   },
      // ]

      // await metamask.request({
      //   method: 'eth_sendTransaction',
      //   params: _params
      // })
      const parsedAmount = ethers.utils.parseEther("0.005")
      var _params =
      {
        value: parsedAmount
      };

      const transactionHash = await transactionContract.createValidator(
        kyc_hash,
        _params
      );

      await transactionHash.wait();

      alert("Validator Account created onchain");
    }
  };

  const createInvestorAccount = async (
    data,
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    //show dialog to enter details
    let _data = {
      name: data.officialName,
      account_type: data.accountType,
      govt_id: data.governmentId,
      address: data.streetAddress,
      wallet_address: currentAccount,
    };

    console.log(_data);

    const kyc_hash = await saveData(_data);

    if (kyc_hash) {
      if (!metamask) return alert("Please install metamask ");
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther("0");

      // var _params = [
      //   {
      //     from: connectedAccount,
      //     to: "",
      //     gas: '0x7EF40', // 520000 Gwei
      //     value: parsedAmount._hex,
      //   },
      // ]

      // await metamask.request({
      //   method: 'eth_sendTransaction',
      //   params: _params
      // })

      const transactionHash = await transactionContract.createInvestor(
        kyc_hash
      );

      await transactionHash.wait();

      alert("Account created onchain");
    }
  };

  const getPropertyListings = async () => {

    const formatListings = (listings) => {

      const formattedListings = [];

      listings.map((listing) => {
        formattedListings.push({
          price: listing.price.toNumber(),
          image_hash: listing.image_hash,
          id: listing.id.toNumber(),
          description: JSON.parse(listing.description),
          longitude: listing.longitude,
          latitude: listing.latitude,
          title: listing.name,
          developer: listing.developer,
        });
      });

      return formattedListings;
    };

    const transactionContract = getEthereumContract();
    const propertyListings = await transactionContract.getAllProperty();
    console.log(propertyListings)
    if (propertyListings.length > 0) {
      setListings(formatListings(propertyListings));
    }
  };

  /**
   * Checks if MetaMask is installed and an account is connected
   * @param {*} metamask Injected MetaMask code from the browser
   * @returns
   */
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install metamask ");

      const accounts = await metamask.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const createProperty = async (data, metamask = eth) => {
    if (!metamask) return alert("Please install metamask ");

    const transactionContract = getEthereumContract();

    const tx = await transactionContract.createProperty(data.price, data.name, data.description, data.longitude, data.latitude, data.image_hash, { gasLimit: 3500000, });

    console.log("tx", tx.hash);
    const reciept = await tx.wait();
    console.log("reciept", reciept);
    if (!reciept) {
      alert("Transaction Failed");
      return false;
    }
    // alert("Transaction Successful");
    return true;
  };

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
      console.log("Connectin metamask!");
      if (!metamask) return alert("Please install metamask ");

      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    getPropertyListings()
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        createAccount,
        createProperty,
        listings
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
