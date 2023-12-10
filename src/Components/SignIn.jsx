import React , {useState} from 'react';

const Signup = () => {
    const [Username,setUsername] = useState("")
    const [Password,setPassword] = useState("")
    const [UserEmail,setUserEmail] = useState("")

    const HandleSignIn =()=>{
        fetch(`${import.meta.env.VITE_BackendUrl}SignIn`,{
            method:"POST",
            body: JSON.stringify({
                UserName:Username,
                Password:Password,
                UserEmail:UserEmail
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then((response)=>{
            response.json().then((data)=>{
                alert(data?.message)
            })
        })
    }






    return (
        <div className="flex items-center justify-center h-screen">

            <div className="w-full max-w-xs">
                <h1 className='font-bold text-xl text-center'>Sign In</h1>
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input onChange={(e)=>{
                            setUsername(e.target.value)
                        }} value={Username}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input onChange={(e)=>{
                            setUserEmail(e.target.value)
                        }} value={UserEmail}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input onChange={(e)=>{
                            setPassword(e.target.value)
                        }} value={Password}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button onClick={HandleSignIn}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
