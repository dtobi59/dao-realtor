import React from 'react'

const NavbarItem = ({ title, classProps }) => {
  return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2020/06/24/Luxury-real-estate-logo-collection-Graphics-4446386-1-1-580x348.jpg"
          alt="logo"
          className="w-36 cursor-pointer"
        />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Home", "Amenities", "Floor Plans", "Wallets", "Contact"].map(
          (item, index) => (
            <NavbarItem key={item + index} title={item} />
          )
        )}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;