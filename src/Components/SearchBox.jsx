import React, { useEffect, useState } from 'react'
import useOpenProduct from "../utils/OpenProduct"
const SearchBox = () => {
    const OpenProduct = useOpenProduct()
    const [Data, setData] = useState([])
    const [Inp, setInp] = useState("")
    const HandleChange = (e) => {
        setInp(e.target.value)
        const FindData = Data.filter((elem) => {
            return elem.title.toLowerCase().includes(Inp.toLowerCase())
        })
        setData(FindData)
    }
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setData(json))
    }, [Inp !== ""])
    return (
        <div >
            <input onChange={HandleChange} value={Inp} type="search" name="" id="" placeholder='Search for ....' className='p-1 rounded' />
            <div className={`${Inp === "" ? 'hidden' : 'h-20 overflow-scroll bg-white'}`}>
                {Inp !== "" && Data?.map((elem) => {
                    return <div className='flex flex-col '>
                        <button onClick={() => {
                            setInp("")
                            OpenProduct(elem.id)
                        }}>{elem.title.substring(0, 10)}..</button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default SearchBox
