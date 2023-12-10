import React, { useEffect, useState } from 'react'
import useOpenProduct from '../utils/OpenProduct'
// import useOpenProduct from '../utils/OpenProduct'
const CategorizedProducts = ({ category }) => {
    const OpenProduct = useOpenProduct()

    const [Data, setData] = useState([])
    const FetchCategoryVal = () => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((res) => { return res.json() })
            .then((json) => { return setData(json) })
    }
    const LowToHigh = () => {
        const FilteredArr = Data?.slice().sort((a, b) => b?.price - a?.price);
        return setData(FilteredArr)
    }
    const HighToLow = () => {
        const FilteredArr = Data?.slice().sort((a, b) => a?.price - b?.price);
        return setData(FilteredArr)
    }
    const PopularitySort = () => {
        const FilteredArr = Data?.slice().sort((a, b) => b?.rating.rate - a?.rating.rate);
        return setData(FilteredArr)
    }

    useEffect(() => {
        FetchCategoryVal()
    }, [category])
    return (
        <>
            <div className='mt-5 cursor-pointer'>
                <div className='flex justify-around font-bold mb-2 '><h3>Sort By</h3>
                    <button className='hover:text-blue-500' onClick={() => {
                        PopularitySort()
                    }}>Popularity</button>
                    <button className='hover:text-blue-500' onClick={() => {
                        HighToLow()
                    }}>Price--Low to High</button>
                    <button className='hover:text-blue-500' onClick={() => {
                        LowToHigh()
                    }}>Price--High to Low</button>
                </div>
                {Data.length !== 0 ? Data.map((elem) => {
                    return <div onClick={() => {
                        OpenProduct(elem.id)
                    }} className='flex w-fit justify-around cursor-pointer  items-center  m-auto mb-2 p-1 rounded'>
                        <div className='flex'>
                            <img className='h-52 w-[10rem]' src={elem.image} alt="" />
                            <div className='flex'>

                                <div className='ml-1' >
                                    <h1 className='font-extrabold text-md hover:text-blue-500'>{elem.title}</h1>
                                    <h4 className='font-extrabold text-gray-500 text-sm mt-1 mb-1'> <span className='bg-green-800 text-white p-1 rounded'> {elem.rating.rate} ⭐</span> from {elem.rating.count} Reviews</h4>
                                    <p className='leading-7'>{elem.description.substring(0, 100)}....</p>
                                </div>
                                <div className='ml-2'>
                                    <h2><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Math.round(elem.price * 80)}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                }) : <div className="mt-5 mb-5 m-auto w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>}
            </div>
        </>
    )
}

export default CategorizedProducts
