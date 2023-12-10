import React, { useEffect, useState } from 'react'
import CategorizedProducts from './CategorizedProducts'

const AllProducts = () => {
    const [SelectedCategory, setSelectedCategory] = useState("")
    const [Categories, setCategories] = useState('')
    const AllCategory = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then((res) => {
                return res.json()
            })
            .then((json) => {
                return setCategories(json)
            })
    }
    const setCategory = (selected) => {
        return setSelectedCategory(selected)
    }
    useEffect(() => {
        AllCategory()
    }, [])
    return (
    <>
        <div className='flex bg-white  justify-around items-center'>
            {Categories !== "" ? Categories?.map((elem) => {
                return <button onClick={() => {
                    setCategory(elem)
                }} className='bg-black text-white p-1 rounded-md m-1 font-bold shadow-xl'>{elem}</button>
            }):<h1 className='text'>Loading...</h1>}
        </div>
        <CategorizedProducts category={SelectedCategory} />
    </>
    )
}

export default AllProducts
