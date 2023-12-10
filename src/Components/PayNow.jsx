import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Key_Id } from '../Secret/Secret';
import { getCookie } from '../Cookies/CookieFunc';

const PayNow = () => {
    const Navigate = useNavigate()
    const Location = useLocation()
    const { OrderId, Amount, Product, ProductData } = Location?.state
    // alert(Amount)
    const [shippingAddress, setShippingAddress] = useState({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const LoadScript = (src) => {
        return new Promise((resolve) => {
            const Script = document.createElement("script")
            Script.src = src;
            Script.onload = () => {
                resolve(true)
            }
            Script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(Script)
        })
    }

    const handlePayment = async () => {
        // console.log("Hello");
        const res = await LoadScript("https://checkout.razorpay.com/v1/checkout.js")

        var options = {
            // console.log(typeof(Key_Id));
            "key": "rzp_test_MFLairdosIUWOF", // Enter the Key ID generated from the Dashboard
            "amount": Amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "key_secret": "4H8OS2F1X92aZ1y5cAUEwMgn",
            "name": "Karan Sapra", //your business name
            "description": "Test Transaction",
            "order_id": OrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": shippingAddress.fullName, //your customer's name
                "email": "Arun@example.com",
                "contact": "1234567890" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": shippingAddress.addressLine1
            },
            "theme": {
                "color": "#3399cc"
            }, "handler": (data) => {
                fetch(`${import.meta.env.VITE_BackendUrl}CallBack_Url`, {
                    method: "POST",
                    body: JSON.stringify({
                        razorpay_payment_id: data.razorpay_payment_id,
                        razorpay_order_id: data.razorpay_order_id,
                        razorpay_signature: data.razorpay_signature
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }).then((response) => {
                    response.json().then((data) => {
                        alert("Payment Succesfull")
                        fetch(`${import.meta.env.VITE_BackendUrl}Order`,
                            {
                                method: "POST",
                                body: JSON.stringify({
                                    ProdData: ProductData,
                                    UserEmail: getCookie("User_Info")
                                }),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                }
                            }).then((response) => {
                                response.json().then((data) => {
                                    alert(data?.message)
                                    Navigate("/Profile")
                                })
                            })

                    })
                }).catch(() => {
                    alert("Request Denied")
                })
            },
        };
        var rzp1 = new window.Razorpay(options);
        // console.log(rzp1);
        rzp1.open()

    };

    return (
        <div className="bg-white rounded-lg mb-2 text-2xl shadow-lg p-6 mx-auto mt-10 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>

            {/* Shipping Address Form */}
            <div className="mb-4">
                <h2 className="text-2xl mb-2">Shipping Address</h2>
                <form>
                    <div className="mb-2">
                        <label className="text-gray-600">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={shippingAddress.fullName}
                            onChange={handleAddressChange}
                            className="block w-full rounded-lg border border-gray-300 p-2"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="text-gray-600">Address Line 1</label>
                        <input
                            type="text"
                            name="addressLine1"
                            value={shippingAddress.addressLine1}
                            onChange={handleAddressChange}
                            className="block w-full rounded-lg border border-gray-300 p-2"
                        />
                    </div>
                    {/* Add similar input fields for other address details like addressLine2, city, state, and zipCode */}
                </form>
            </div>

            {/* Order Price Summary */}
            <div className="mb-4">
                <h2 className="text-2xl mb-2">Order Summary</h2>
                <ul>

                    <li className="text-gray-600">
                        {Product}: ${Amount / 100}
                    </li>

                </ul>
                <p className="text-2xl font-bold mt-4">Total: ${Amount / 100}</p>
            </div>

            {/* Payment Button */}
            <button
                onClick={() => {
                    handlePayment()
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
                Pay Now
            </button>
        </div>
    );
};

export default PayNow;
