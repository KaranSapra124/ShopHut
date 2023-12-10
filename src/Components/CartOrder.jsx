import React, { useState, useEffect, useMemo } from 'react'
import { getCookie } from '../Cookies/CookieFunc'
import {useNavigate} from 'react-router-dom'
const CartOrder = () => {
    const Navigate = useNavigate()
    var ProdTotal = 0
    const [cartItems, setCartItems] = useState("")
    const [Inc, setInc] = useState("")
    const Increment = (i) => {
        const ExistingItem = cartItems.find((elem) => {
            return elem.id === i
        })
        // console.log(ExistingItem);
        if (ExistingItem) {
            ExistingItem.Quantity += 1;
            var count = ExistingItem.Quantity
            setInc(ExistingItem.Quantity)
            fetch(`${import.meta.env.VITE_BackendUrl}ModifyCart`, {
                method: "POST",
                body: JSON.stringify({
                    UserEmail: getCookie("User_Info"),
                    ProdQuant: count,
                    ProdId: i
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then((response) => {
                response.json().then((data) => {
                    alert(data?.message)
                })
            })
        }
    }
    const Decrement = (i) => {
        const ExistingItem = cartItems.find((elem) => {
            return elem.id === i
        })
        // console.log(ExistingItem);
        if (ExistingItem && ExistingItem.Quantity !== 0) {
            ExistingItem.Quantity -= 1;
            setInc(ExistingItem.Quantity)
            var count = ExistingItem.Quantity
            fetch(`${import.meta.env.VITE_BackendUrl}ModifyCart`, {
                method: "POST",
                body: JSON.stringify({
                    UserEmail: getCookie("User_Info"),
                    ProdQuant: count,
                    ProdId: i
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }).then((response) => {
                response.json().then((data) => {
                    alert(data?.message)
                })
            })
        }
    }
    const RemoveItem = (i) => {
        const FilteredArr = cartItems?.filter((elem) => {
            // console.log(elem.id);
            return elem.id !== i
        })
        setCartItems(FilteredArr)
        fetch(`${import.meta.env.VITE_BackendUrl}ModifyCart`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: getCookie("User_Info"),
                FilteredArr: FilteredArr,
                ProdId: i
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response) => {
            response.json().then((data) => {
                alert(data?.message)
            })
        })

    }
    const HandleBuy = (item) => {
        fetch(`${import.meta.env.VITE_BackendUrl}Buy`, {
            method: "POST",
            body: JSON.stringify({
                amount: item.price * item.Quantity,
                currency: "INR",
                // receipt: "receipt#1",
                key1: item.title,
                payment_capture:1
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                response.json().then((data)=>{
                    return Navigate("/PayNow",{
                        state:{
                            ProductData:item,
                            OrderId:data?.message?.id,
                            Amount:data?.message?.amount,
                            Product:data?.message?.notes.key1
                        }
                    })
                })
            })
    }
    // UseEffect to fetch data from backend for just one time and to push it to cartItems through AddItem function
    useEffect(() => {
        // console.log("Fetched Cart");
        if (getCookie("User_Info")) {
            fetch(`${import.meta.env.VITE_BackendUrl}CartData`, {
                method: "POST",
                body: JSON.stringify({
                    UserEmail: getCookie("User_Info")
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
                .then((response) => {
                    response.json().then((data) => {
                        // console.log(data?.message, '///');
                        return setCartItems(data?.message)
                    })
                })
        }
    }, [])
    const memoizedCartItems = useMemo(()=>{
        // console.log("Memoized");
        return cartItems
    },[cartItems])

    return (
        <>
            <h1 className='text-2xl text-center font-bold'>My Orders</h1>

            <div className='flex flex-wrap justify-evenly '>
                <div className='flex flex-col'>

                    {memoizedCartItems?.length !== 0 ? memoizedCartItems?.map((elem, index) => {
                        return <div className='cursor-pointer flex flex-col w-fit border-2 border-gray-200 rounded-md m-2 p-2'>
                            <div>
                                <img src={elem?.image} className='w-[20rem] m-auto ' alt="" srcset="" />
                            </div>
                            <div className=' w-[30rem]  flex flex-col   p-4 rounded-md justify-center items-center'>

                                <h1 className='text-2xl'>{elem?.title} </h1>
                                <span className='mr-auto mt-5'>

                                    <h4 className='font-extrabold text-gray-500'> <span className='bg-green-700 text-white p-1 rounded'> {elem?.rating?.rate} ⭐</span> from {elem?.rating?.count} Reviews</h4>
                                    <p className='font-bold text-2xl mr-auto'><i class="fa-solid fa-indian-rupee-sign mr-1"></i>{elem?.price}</p>
                                    <div className='flex justify-around'>
                                        <button onClick={() => {
                                            if (elem.Quantity === 0) {
                                                alert("0 is quantity , increment it!!")
                                                return;
                                            }
                                            Decrement(elem?.id)
                                        }} className='border-[1px] rounded text-xl p-2 font-bold border-black'>-</button>
                                        <div className='border-[1px] rounded pt-2 pr-4 pl-4 border-black'>
                                            {elem?.Quantity}
                                        </div>
                                        <button onClick={() => { Increment(elem.id) }} className=' border-[1px] rounded text-xl p-2 font-bold border-black'>+</button>
                                        <div className='flex items-center'>
                                            <i onClick={() => {
                                                RemoveItem(elem.id)
                                            }} className="cursor-pointer text-red-500 ml-1 text-2xl fa-solid fa-trash"></i>
                                        </div>                                    </div>
                                    <button onClick={() => {
                                        HandleBuy(elem)
                                    }} className='bg-blue-500 mt-2 hover:bg-blue-900 text-bold text-white m-auto p-2 text-xl rounded'>Buy Now</button>
                                </span>
                            </div>
                        </div>
                    }) : <div className='flex justify-center items-center flex-col'>
                        <img src="data:image/png;base64,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" alt="" srcset="" />
                        <h1 className='text-4xl m-10 text-center '>Oops Nothing Here!!</h1>
                    </div>
                    }
                </div>
                <div className={`${cartItems.length === 0 ? 'hidden' : 'text-xl border-2 bg-gray-200 p-2 h-fit rounded flex justify-center flex-col'}`}>

                    {cartItems.length !== 0 ? cartItems?.map((elem, index) => {
                        return <> <div >
                            <span>

                                <h1 className='font-bold mb-2'>{elem.title} - <i class="ml-1 fa-solid fa-indian-rupee-sign mr-1"></i>{elem.price * elem.Quantity}
                                </h1>
                            </span>


                        </div>
                            <div className='hidden'>
                                {ProdTotal += elem.price * elem.Quantity}
                            </div>

                        </>
                    }) : <></>
                    }
                    <div className='text-center text-bold bg-white w-full'>
                        Total = {ProdTotal}
                    </div>
                    <button onClick={() => {
                        HandleBuy()
                    }} className='bg-blue-500 mt-2 hover:bg-blue-900 text-bold text-white m-auto p-2 text-xl rounded'>Buy Now</button>
                </div>

            </div>

        </>
    )
}

export default CartOrder
