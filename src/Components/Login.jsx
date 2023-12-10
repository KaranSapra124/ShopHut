import React, { useContext, useEffect, useState } from 'react';
// import { BackendUrl } from '../Secret/FrontendSecret';
import UserContext from '../utils/UserContext';
import { useDispatch } from 'react-redux';
import { Add_User } from '../reducers/UserReducers';
import { checkCookie, getCookie, setCookie } from '../Cookies/CookieFunc';

const Login = () => {
    const { User, setUser, updateUser } = useContext(UserContext)
    const Dispatch = useDispatch()
    const [UserEmail, setUserEmail] = useState("")
    const [Password, setPassword] = useState("")


    const Login = () => {
        fetch(`${import.meta.env.VITE_BackendUrl}Login`, {
            method: "POST",
            body: JSON.stringify({
                UserEmail: UserEmail,
                Password: Password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
            .then((response) => {
                response.json().then((data) => {
                    updateUser(data?.message?.UserName)
                    alert("Logged In Successfully!!")
                    Dispatch(Add_User(data?.message))
                    setCookie("User_Info", data?.message?.UserEmail, 10)
                })
            })
    }

    useEffect(() => {
        console.log(import.meta.env.VITE_BackendUrl);
        if (getCookie("User_Info")){
            fetch(`${import.meta.env.VITE_BackendUrl}CheckAuthentication`, {
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
                    updateUser(data?.message?.UserName)
                    alert("Authenticated Successfully!!")
                    Dispatch(Add_User(data?.message))
                })
            })
            .catch((err) => {
                alert("Error while authenticating");
                console.log(err);
            })
        }
    }, [])

    return (
        <div className="flex items-center justify-center h-screen text-2xl">
            <div className="w-full max-w-xs">
                <h1 className='font-bold text-xl text-center'>Login</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className=" text-2xl block text-gray-700  font-bold mb-2" htmlFor="UserEmail">
                            UserEmail
                        </label>
                        <input onChange={(e) => {
                            setUserEmail(e.target.value)
                        }} value={UserEmail}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="UserEmail"
                            type="email"
                            placeholder="UserEmail"
                        />
                    </div>
                    <div className="mb-6">
                        <label className=" text-2xl block text-gray-700  font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e) => {
                            setPassword(e.target.value)
                        }} value={Password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={Login}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            LogIn
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
