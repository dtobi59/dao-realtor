import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-black items-center justify-center text-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout