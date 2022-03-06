import React, { useState } from 'react';
import NextLink from 'next/link';
// import Link from 'next/link';

const NavbarItem = ({ title, classProps }) => {
  const url = title === "Home" ? '' : title.split(" ").join("").toLowerCase();
  return (
    <li className={`block rounded px-2 py-1 cursor-pointer hover:bg-[#2546bd] ${classProps}`}>
      <a href={`/${url}`}>  {title} </a>
    </li>
  );
};

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="md:px-4 md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-between px-4">
        <div>
          <NextLink href="/">
            <img
              src="https://www.creativefabrica.com/wp-content/uploads/2020/06/24/Luxury-real-estate-logo-collection-Graphics-4446386-1-1-580x348.jpg"
              alt="logo"
              className="w-36 cursor-pointer"
            />
          </NextLink>
        </div>
        <div className="md:hidden pr-5">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="block text-[#2546bd] hover:[#2546bd]"
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 100 80">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`px-4 pt-2 pb-4 md:pb-0 md:flex md:p-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="text-white md:flex list-none flex-row justify-between items-center flex-initial">
<<<<<<< HEAD
          {[
            // "Home",
            "Amenities",
            "Floor Plans",
            "Home Listings",
            "Wallets",
            "Contact",
          ].map((item, index) => (
            <NavbarItem key={item + index} title={item} />
          ))}
=======
          {["Home", "Project Submission", "Home Listings", "Contact"].map(
            (item, index) => (
              <NavbarItem key={item + index} title={item} />
            )
          )}
>>>>>>> 261b1cb831f7812c05a803b400178abc69cf4a92
          <li className="bg-[#2952e3] block rounded-full cursor-pointer px-2 py-1 hover:bg-[#2546bd]">
            Login
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;