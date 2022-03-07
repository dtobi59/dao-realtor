import React from 'react';

const Footer = () => {
  return (
    <p className="bg-black text-white text-sm text-center pb-5">
      Copyright &copy; {new Date().getFullYear()} DAO-Realtor
    </p>
  );
}

export default Footer