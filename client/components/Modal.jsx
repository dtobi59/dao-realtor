import React, { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    className="text-black px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full pr-10 my-3"
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);


export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const { currentAccount, createAccount } = useContext(TransactionContext);

  const [formData, setFormData] = useState({
    officialName: "",
    governmentId: "",
    streetAddress: "",
    accountType: "",
    walletAddress: currentAccount,
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        const response = await createAccount(formData);
        if (response) {
          alert("Account created successfully!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  const isFormValid = () => {
    if (!formData.officialName || !formData.governmentId || !formData.streetAddress || !formData.walletAddress || !formData.accountType) {
      alert("Please fill out all fields.");
      return false;
    }
    return true;
  }

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
                </div>
                {/*body*/}
                <div className="relative px-8 flex-auto">


                  <div className="flex justify-center mt-5 items-center mb-6">
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-slate-700 rounded-2xl">
                      <p className="text-white-500">Please fill in the following form fields </p>

                      <select name="account_type" id="account_type" className="text-black rounded p-3 w-full my-3"
                        onChange={(e) => handleChange(e, "accountType")}
                        value={formData.accountType}
                      >
                        <option value="">Select Account Type</option>
                        <option value="investor">Investor</option>
                        <option value="developer">Developer</option>
                        <option value="validator">Validator</option>
                      </select>
                      <label htmlFor="">You're required to pay a fee for Developer and Investor Account</label>

                      <Input
                        placeholder="Official name"
                        name="officialName"
                        type="text"
                        value={formData.officialName}
                        handleChange={handleChange}
                      />
                      <Input
                        placeholder="Government ID"
                        name="governmentId"
                        type="text"
                        value={formData.governmentId}
                        handleChange={handleChange}
                      />
                      <Input
                        placeholder="Street Address"
                        name="streetAddress"
                        type="text"
                        value={formData.streetAddress}
                        handleChange={handleChange}
                      />

                      <div className="h-[1px] w-full bg-gray-400 my-2" />
                      <button
                        onClick={handleSubmit}
                        className=" self-center text-white justify-center items-center my-2 px-10 bg-[#2952e3] py-2 rounded-full cursor-pointer hover:bg-[#2546bd]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                  {/* <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Cancel
                  </button> */}
                  <button
                    className="bg-gray-400 text-white-500 font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
