import { ethers } from 'ethers';
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from '../lib/constants';

export const TransactionContext = React.createContext();

let eth

if (typeof window !== 'undefined') {
  eth = window.ethereum
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  )

  return transactionContract
}


export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState()

  const saveData = async (data) => {
    //todo: implement sanity
    return "657457853hjf7823hjfvd";
  }

  const createAccount = async () => {
    //show dialog to enter details
    let data = {
      name: "",
      govt_id: "",
      address: "",
      wallet_address: currentAccount
    }

    const kyc_hash = saveData(data);

    if (is_saved) {
      //call smart function
    }

  }
  /**
* Checks if MetaMask is installed and an account is connected
* @param {*} metamask Injected MetaMask code from the browser
* @returns
*/
  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return alert('Please install metamask ')

      const accounts = await metamask.request({ method: 'eth_accounts' })

      if (accounts.length) {
        setCurrentAccount(accounts[0])
      }
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

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
      if (!metamask) return alert('Please install metamask ')

      const accounts = await metamask.request({ method: 'eth_requestAccounts' })

      setCurrentAccount(accounts[0])
    } catch (error) {
      console.error(error)
      throw new Error('No ethereum object.')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])


  return (
    <TransactionContext.Provider value={{
      connectWallet,
      currentAccount,
      createProperty
    }}>
      {children}
    </TransactionContext.Provider>
  )
}
