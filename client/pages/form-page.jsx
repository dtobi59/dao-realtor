import React, {useState, useContext} from 'react'
import { Layout } from '../components'
import { TransactionContext } from "../context/TransactionContext";



const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    placeholder={placeholder}
    type={type}
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

const formPage = () => {
    const { handleChange } = useContext(TransactionContext);

  return (
    <div className="bg-black min-h-screen">
      <Layout>
        <div className="flex justify-center items-center">
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center bg-slate-700">
            <Input
              placeholder="Official name"
              name=""
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder="Government ID"
              name=" "
              type="text"
              handleChange={handleChange}
            />
            <Input
              placeholder=" Address "
              name=""
              type="text"
              handleChange={handleChange}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <button className=" self-center text-white justify-center items-center my-5 px-10 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
              Submit
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default formPage