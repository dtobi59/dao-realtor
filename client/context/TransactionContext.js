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

  const saveData = async (data) => {
    //todo: implement sanity
    return "657457853hjf7823hjfvd";
  };

  const createAccount = async (data) => {
    switch (data.accountType) {
      case "developer":
        createDeveloperAccount(data)
        break
      case "validator":
        createValidatorAccount(data)
        break
      case "investor":
        createInvestorAccount(data)
        break
      default:
        throw new Error("Invalid Account type")

    }
  }

  const createDeveloperAccount = async (data, metamask = eth, connectedAccount = currentAccount,) => {
    console.log(data);
  }

  const createValidatorAccount = async (data, metamask = eth, connectedAccount = currentAccount,) => {
    console.log(data);

  }

  const createInvestorAccount = async (data, metamask = eth, connectedAccount = currentAccount,) => {
    //show dialog to enter details
    let _data = {
      name: data.officialName,
      account_type: data.accountType,
      govt_id: data.governmentId,
      address: data.streetAddress,
      wallet_address: currentAccount,
    };

    console.log(_data);

    const kyc_hash = false// saveData(_data);

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

  const createProperty = async (data, metamask = eth) => {
    if (!metamask) return alert('Please install metamask ')

    const transactionContract = getEthereumContract();

    const tx = await transactionContract.createProperty(data.price, data.name, data.description, data.longitude, data.latitude, data.image_hash, { gasLimit: 3000000 });
    console.log("tx", tx.hash);
    const reciept = await tx.wait();
    if (!reciept.hash) {
      alert("Transaction Failed");
      return false;
    }
    console.log("reciept", reciept);
    alert("Transaction Successful");
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
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        createAccount,
        createProperty
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
