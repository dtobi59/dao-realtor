import { ethers } from 'ethers';
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../lib/constants";

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
  const [formData, setFormData] = useState({
    officialName: "",
    governmentId: "",
    address: "",
    walletAddress: "",
  });
  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };


  const saveData = async (data) => {
    //todo: implement sanity
    return "657457853hjf7823hjfvd";
  };

  const createInvestorAccount = async (metamask = eth, connectedAccount = currentAccount,) => {
    //show dialog to enter details
    let data = {
      name: "David",
      govt_id: "342847284",
      address: "Road 9, Nigeria",
      wallet_address: currentAccount,
    };

    const kyc_hash = saveData(data);

    if (kyc_hash) {
      if (!metamask) return alert('Please install metamask ')
      const transactionContract = getEthereumContract()
      const parsedAmount = ethers.utils.parseEther("0")

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

      const transactionHash = await transactionContract.createInvestor(kyc_hash)


      await transactionHash.wait()

      alert("Account created onchain");


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

  const createProperty = async (data) => {
    const transactionContract = getEthereumContract();
    const tx = await transactionContract.createProperty(data.price, data.name, data.description, data.longitude, data.latitude, data.cid);
    console.log(tx);
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
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        createInvestorAccount,
        handleChange,
        createProperty
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
