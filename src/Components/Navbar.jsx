import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import SearchBox from './SearchBox';
import UserContext from '../utils/UserContext';

const Navbar = () => {
  const { User } = useContext(UserContext);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Menu */}
      <div className='border-b-4 border-gray-200 sticky top-0 z-50  justify-around items-center font-medium bg-white p-2 hidden md:flex'>
        <div className='text-black'>
          <Link to='/' className='text-xl'>
            ShopHut
          </Link>
        </div>
        <Link to='/' className='text-xl'>
          Home
        </Link>
        <Link to='/SignIn' className='text-xl'>
          Sign-In
        </Link>
        <Link to='/Products' className='text-xl'>
          Products
        </Link>
        <Link to='/Login' className='text-xl'>
          Login
        </Link>
        <Link
          to='/Profile'
          className='text-xl font-bold border-2 rounded-[100%] border-black p-3 bg-purple-500 text-white'
        >
          {User !== '' && User?.substring(0, 1)}
        </Link>
        <Link to='/Orders' className='text-xl'>
          <i className='fa-solid fa-cart-shopping'></i>
        </Link>
        <SearchBox />
      </div>

      {/* Mobile Menu */}
      <div className='md:hidden'>
        <button
          onClick={toggleMobileMenu}
          className='p-2 text-gray-500 focus:outline-none'
        >
          <i className='fa-solid fa-bars text-2xl'></i>
        </button>
        {isMobileMenuOpen && (
          <div className='bg-white p-4 text-center animate-ping font-bold'>
            <Link to='/' className='block mb-2 text-xl'>
              Home
            </Link>
            <Link to='/SignIn' className='block mb-2 text-xl'>
              Sign-In
            </Link>
            <Link to='/Products' className='block mb-2 text-xl'>
              Products
            </Link>
            <Link to='/Login' className='block mb-2 text-xl'>
              Login
            </Link>
            <Link to='/Profile' className='block mb-2 text-xl'>
              Profile
            </Link>
            <Link to='/Orders' className='block mb-2 text-xl'>
              Orders
            </Link>
          </div>
        )}
      </div>

      <Outlet />
      <Footer />
    </>
  );
};

export default Navbar;
