import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <div className="h-screen items-center justify-center ">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout