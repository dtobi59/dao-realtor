import React, { useEffect, useState } from "react";
import { ethers } from 'ethers'
import { contractABI, contractAddress } from '../lib/constants'

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

  /**
   * Prompts user to connect their MetaMask wallet
   * @param {*} metamask Injected MetaMask code from the browser
   */
  const connectWallet = async (metamask = eth) => {
    try {
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
        <TransactionContext.Provider  value={{
        connectWallet,
        currentAccount,
      }}>
            {children}
        </TransactionContext.Provider>
    )
}
