import React, { useEffect, useState } from 'react'
import Offers from './Offers'

const Home = () => {
    
    const [imgArr, setImgArr] = useState(["./assets/Banner1.jpg", "./assets/Banner2.webp", "./assets/Banner3.webp"])
    const [Img, setImg] = useState(0)
   
    const LeftImgSlider = (i) => {
        if (i <= 0) { // Change this condition to include 0
            i = imgArr.length - 1; // Set i to the last valid index
        } else {
            i--;
        }
        // console.log(i);
        setImg(i);
    }

    const RightImgSlider = (i) => {
        if (i > imgArr.length - 2) {
            i = 0
        } else {

            i++;
        }
        // console.log(i);
        setImg(i)
    }

    return (
        <>
            <div className='flex items-center relative left-0 right-0   m-3 '>
                <button className='m-1 absolute left-0 bg-white p-2 rounded font-bold mt-auto' onClick={() => {
                    LeftImgSlider(Img)
                }}><i class="fa-solid fa-arrow-left"></i></button>
                <button className='m-1 absolute  right-0 bg-white p-2 rounded font-bold mt-auto' onClick={() => {
                    RightImgSlider(Img)
                }}><i class="fa-solid fa-arrow-right"></i></button>
                <img src={imgArr[Img]} alt="" className='w-full h-52 rounded-lg' />
            </div>
            <div className='border-b-4 border-gray-200'></div>
            <Offers  />
        </>
    )
}

export default Home;
