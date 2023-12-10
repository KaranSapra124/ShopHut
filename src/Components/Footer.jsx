import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='flex justify-evenly bg-gray-800 text-white p-2'>
        <Link to="/" className='text-xl'>Home</Link>
        <Link to="/" className='text-xl'>About Us</Link>
        <Link to="/" className='text-xl'>Products</Link>
        <Link to="/" className='text-xl'>Contact</Link>
       
    </div>
  )
}

export default Footer
