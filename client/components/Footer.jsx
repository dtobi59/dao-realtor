import React from 'react';

const Footer = () => {
  return (
    <p className="text-white text-sm text-center py-20">
      Copyright &copy; {new Date().getFullYear()} DAO-Realtor
    </p>
  );
}

export default Footer