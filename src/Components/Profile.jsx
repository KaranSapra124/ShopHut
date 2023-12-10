import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteCookie } from '../Cookies/CookieFunc';

const Profile = () => {
    var Total = 0;
    const message = useSelector((store) => store.UseReducers.User_Data);
    const Navigate = useNavigate();
    const [Orders, setOrders] = useState(message?.UserOrders)

    const EditForm = () => {
        Navigate("/EditForm");
    };
    const CancelOrder = (item) => {
        fetch(`${import.meta.env.VITE_BackendUrl}CancelOrder`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: message.UserEmail,
                ProdData: item
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                response.json().then((data) => {
                    setOrders(data.message)
                })
            })
    }
    const FetchOrder = () => {
        fetch(`${import.meta.env.VITE_BackendUrl}FetchOrders`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: message.UserEmail,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                response.json().then((data) => {
                    // console.log(data, "+++++++++++++=");
                    setOrders(data?.message)
                })
            })
    }
    const DeleteProfile = (id) => {
        alert(id)
        fetch(`${import.meta.env.VITE_BackendUrl}DeleteProfile`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: id,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then((response)=>{
            response.json().then((data)=>{
                alert(data?.message)
                Navigate("/Login")
                deleteCookie("User_Info")
            })
        })
    }


    return (
        <div className="bg-white rounded-lg mb-2 text-2xl shadow-lg p-6 mx-auto mt-10 max-w-3xl">
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-3xl font-bold">{message?.UserName}</h1>
                <i onClick={()=>{
                    DeleteProfile(message?.UserEmail)
                }} className="cursor-pointer text-red-500 ml-1 text-2xl fas fa-trash"></i>
            </div>

            <p className="text-gray-600 mb-4">{message?.UserEmail}</p>

            <div className="mb-4">
                {message?.UserAddress === "" ? (
                    <div className="flex items-center">
                        <p className="text-gray-600">No Address Right Now!!</p>
                        <button
                            onClick={EditForm}
                            className="ml-2 px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                        >
                            <i className="fas fa-pencil"></i>
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-600 flex items-center">
                        <p className="mr-2">{message?.UserAddress}</p>
                        <button
                            onClick={EditForm}
                            className="px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                        >
                            <i className="fas fa-pencil"></i>
                        </button>
                    </div>
                )}
            </div>

            <h1 className="text-2xl mt-4 mb-2 font-extrabold">Your Orders</h1>

            <div className="border p-4 max-h-96 overflow-y-auto  ">
                <i onClick={FetchOrder} class="fa-solid fa-rotate-right"></i>
                {Orders?.length !== 0 ? (
                    <div>
                        {Orders?.map((elem, index) => (<>
                            <div key={index} className='m-2'>
                                <div className="m-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow p-5 mb-5">
                                    <a href="#">
                                        <img className="rounded-t-lg w-full  object-cover" src={elem.image} alt="" />
                                    </a>
                                    <div className="p-3">
                                        <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-800">{elem.title}</h5>
                                        <p className="mb-2 font-normal text-black">Price: ${elem.price * elem.Quantity}</p>
                                        <div className='hidden'>{Total += elem.price * elem.Quantity}</div>
                                        <p className="mb-2 font-normal text-black">Quantity: {elem.Quantity}
                                            <span className='float-right text-red-700 border-2 cursor-pointer hover:bg-red-600 hover:text-white hover:border-none border-black rounded-lg p-1'>
                                                <i onClick={() => {
                                                    CancelOrder(elem.title)
                                                }} class="fa-solid fa-xmark"></i>
                                            </span>   </p>
                                    </div>
                                </div>
                            </div>

                        </>
                        ))}
                    </div>
                ) : (
                    <img src="https://assets.materialup.com/uploads/16e7d0ed-140b-4f86-9b7e-d9d1c04edb2b/preview.png" alt="" srcSet="" />
                )}
                {Total !== 0 && <div className='text-center font-bold border-2 w-fit p-1 m-auto rounded-md hover:bg-black hover:text-white cursor-pointer'>
                    Total: $<span className='pl-1 font-extrabold'>{Total}</span>
                </div>}
            </div>
        </div>
    );
}

export default Profile;
