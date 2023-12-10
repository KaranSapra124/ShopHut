import React, {  useState } from 'react'
// import { import.meta.env.VITE_BackendUrl } from '../Secret/FrontendSecret';
import { useSelector } from 'react-redux';

const EditProfile = () => {
    const message = useSelector((store)=>{
        return store.UseReducers.User_Data;
    })
    const [Name, setName] = useState(message?.UserName)
    const [Email, setEmail] = useState(message?.UserEmail)
    const [Address, setAddress] = useState(message?.UserAddress)

    const SaveForm = () => {
        fetch(`${import.meta.env.VITE_BackendUrl}EditForm`, {
            method: "POST",
            body: JSON.stringify({
                UserName:Name,
                UserEmail: Email,
                UserAddress:Address
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        }).then((response)=>{
            response.json().then((data)=>{
                alert(data?.message)
            })
        })
    }

    return (
        <div className="flex items-center justify-center h-screen text-2xl">

            <div className="w-full max-w-xs">
                <h1 className='font-bold text-xl text-center'>Edit Profile</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="  block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input onChange={(e) => {
                            setName(e.target.value)
                        }} value={Name}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="  block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={Email}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="  block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Address
                        </label>
                        <input onChange={(e) => {
                            setAddress(e.target.value)
                        }} value={Address}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="text"
                            placeholder="Address"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={SaveForm}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
