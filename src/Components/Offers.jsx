import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"


const Offers = () => {
    const Navigate = useNavigate()
    const [ApiData, setApiData] = useState("")
    const FetchData = () => {
        fetch("https://fakestoreapi.com/products")
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                return setApiData(data)
            })
    }
    const OpenProduct = (id) => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                Navigate(
                    "/ProductInfo", {
                    state: {
                        Data: data
                    }
                }

                )
            })
    }
    useEffect(() => {
        FetchData()
    }, [])
    return (
        <>
            <h1 className='font-bold text-2xl m-1'>Best of electronics...</h1>
            <section className='flex flex-wrap  justify-evenly mb-2'>
                {ApiData !== "" && ApiData?.map((elem) => {
                    if (elem.category === "electronics") {

                        return <div onClick={() => {
                            OpenProduct(elem.id)
                        }} className='cursor-pointer mb-2 text-center w-52 border-2 border-gray-200 p-2 rounded-md'>
                            <img src={elem.image} className='w-[8rem] m-auto' alt="" srcset="" />
                            <h3>{elem.title}</h3>
                            <p className='font-bold'>${elem.price}</p>
                        </div>
                    }
                })}
            </ section >
            <h1 className='font-bold text-2xl m-1'>Best of men's clothing...</h1>
            <section className='flex flex-wrap  justify-evenly mb-2'>
                {ApiData !== "" && ApiData?.map((elem) => {
                    if (elem.category === "men's clothing") {

                        return <div onClick={() => {
                            OpenProduct(elem.id)
                        }} className='cursor-pointer mb-2 text-center w-52 border-2 border-gray-200 p-2 rounded-md'>
                            <img src={elem.image} className='w-[8rem] m-auto' alt="" srcset="" />
                            <h3>{elem.title}</h3>
                            <p className='font-bold'>${elem.price}</p>
                        </div>
                    }
                })}
            </ section >
            <h1 className='font-bold text-2xl m-1'>Best of women's clothing...</h1>
            <section className='flex  flex-wrap   justify-evenly mb-2'>
                {ApiData !== "" && ApiData?.map((elem) => {
                    if (elem.category === "women's clothing") {

                        return <div onClick={() => {
                            OpenProduct(elem.id)
                        }} className='cursor-pointer mb-2 text-center w-52 border-2 border-gray-200 p-2 rounded-md'>
                            <img src={elem.image} className='w-[8rem] m-auto' alt="" srcset="" />
                            <h3>{elem.title}</h3>
                            <p className='font-bold'>${elem.price}</p>
                        </div>
                    }
                })}
            </ section >
        </>
    )
}

export default Offers
