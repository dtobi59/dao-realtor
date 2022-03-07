import React, { useContext } from "react";
import { Modal } from "../components";
import { TransactionContext } from "../context/TransactionContext";

const commonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

const HeroSection = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const handleSubmit = () => {};

  return (
    <div className="flex w-full md:justify-center  items-center">
      <div className="flex mf:flex-row  flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Decentralised Autonomous Organisation
            <br /> for Real estate investment.
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
          leveraging blockchain technology to provide an irresistible real estate experience, unlock untapped potentials in real esate investment.
          </p>

          {/* Checks if account is connected or not*/}

          {currentAccount ? (
            <Modal />
          ) : (
            <button
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] "
              type="button"
              onClick={() => connectWallet()}
            >
              <p className="text-white text-base font-semibold">
                Connect Wallet{" "}
              </p>
            </button>
          )}
          <div className="grid sm:grid-cols-3 grid-cols-2 width-full mt-10">
            <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
            <div className={commonStyles}>Investment</div>
            <div className={`rounded-tr-2xl ${commonStyles}`}>Real Estate</div>
            <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
            <div className={commonStyles}>Polygon</div>
            <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
