import Link from "next/link";
import React, { useState } from "react";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="flex flex-row w-96 self-center justify-center items-center my-5 bg-[#15c05c] p-3 rounded-full cursor-pointer hover:bg-[#3faf3f]"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <p className="text-white text-base font-semibold">Create Account</p>
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-sm">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-100 outline-none focus:outline-none">
                {/*header*/}
                <div className="flex  flex-col justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl text-black ml-24 font-semibold">
                    Create Account{" "}
                  </h3>
                  <h3 className="text-sm  font-semibold text-red-600 mt-5">
                    Please select Account type{" "}
                  </h3>
                </div>
                {/*body*/}
                <div className="relative px-8 flex-auto">
                  <button
                    className="flex flex-row w-80 self-center justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    type="button"
                  >
                    <p className="text-white text-base font-semibold">
                      Developer
                    </p>
                  </button>
                  <p className="text-red-500 -mt-5">
                    (Account creation fee of $5,000 is required)
                  </p>
                  <button
                    className="flex flex-row w-80 self-center mb-10 justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                    type="button"
                  >
                    <p className="text-white text-base font-semibold ">
                      Validator
                    </p>
                  </button>
                  <Link href="/form-page">
                    <button
                      className="flex flex-row w-80 self-center justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                      type="button"
                    >
                      <p className="text-white text-base font-semibold">
                        Investor
                      </p>
                    </button>
                  </Link>
                  <p className="text-red-500 -mt-5 mb-3">
                    (Account creation fee of $15,000 is required)
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Cancel
                  </button> */}
                  <button
                    className="bg-gray-400 text-red-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
