import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { Add_Item } from "../reducers/cartReducers"
import useOpenProduct from "../utils/OpenProduct"
// import { import.meta.env.VITE_BackendUrl } from '../Secret/FrontendSecret'
import { getCookie } from '../Cookies/CookieFunc'
const ProductPage = () => {
    // console.log(Add_Item,'////');
    const ItemCount = useSelector((state) => state?.EcommCart?.Items)
    // console.log(ItemCount, '////');
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const Location = useLocation();
    const [CategoryData, setCategoryData] = useState("")
    const { state } = Location;
    const { Data } = state;
    const { category } = Data
    // console.log(category);
    const { rate, count } = Data?.rating;

    const FetchCategory = () => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then((data) => {
                return data.json()
            }).then((data) => {
                // console.log(data);
                return setCategoryData(data)
            })
            .catch((err) => {
                return err + 'Error occured'
            })
    }
    const OpenProduct = useOpenProduct()
    const AddItem = (data) => {
        // console.log(data);
        const ProdData = data;
        ProdData["Quantity"] = 1
        // alert("Succesfully Added 😀")
        fetch(`${import.meta.env.VITE_BackendUrl}Cart`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: getCookie("User_Info"),
                cartData: ProdData
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            response.json().then((data) => {
                return alert(data?.message);
            })
        })
    }
    useEffect(() => {
        FetchCategory()
    }, [])




    return (
        <>
            <div className='flex flex-col m-auto mt-2 text-center bg-none   p-2 '>
               
                <div className='flex justify-center flex-wrap'>
                    <div>
                        <img src={Data?.image} className='h-[20rem] w-[20rem] animate-bounce m-auto ' alt="" srcset="" />
                    </div>
                    <div className=' w-[50rem] animate-bounce flex flex-col   p-4 rounded-md justify-center items-center'>

                        <h1 className='text-2xl'>{Data?.title} </h1>
                        <span className='mr-auto mt-5'>

                            <h4 className='font-extrabold text-gray-500'> <span className='bg-green-700 text-white p-1 rounded'> {rate} ⭐</span> from {count} Reviews</h4>
                            <p className='font-bold text-2xl mr-auto'><i class="fa-solid fa-indian-rupee-sign mr-2"></i>{Data?.price}</p>
                            <p className='text-justify font-bold'>Description: <span className='font-normal'>{Data?.description}</span></p>
                        </span>
                    </div>
                </div>
                <div>
                    <button onClick={() => {
                        AddItem(Data)
                    }} className='bg-orange-400 p-3 hover:bg-orange-500 text-2xl text-white rounded-md mt-2'>Add To Cart</button>
                </div>
            </div>
            <div className='mt-2 flex justify-evenly flex-col mb-5'>
                <h1 className='text-2xl font-bold '>Products You Will Like...</h1>
                <div className='flex justify-evenly mt-2 flex-wrap '>
                    {CategoryData !== "" ? CategoryData?.map((elem) => {
                        if (elem.id !== Data?.id) {

                            return <div onClick={() => {
                                OpenProduct(elem.id)
                            }} className='mb-2 text-center w-52 border-2 border-gray-200 p-4 rounded-md '>
                                <img src={elem.image} className=' w-[8rem] m-auto' alt="" srcset="" />
                                <h3>{elem.title}</h3>
                                <p className='font-bold'><i class="fa-solid fa-indian-rupee-sign mr-1"></i>{elem.price}</p>
                            </div>
                        }
                    }) : <div className="m-auto w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductPage
