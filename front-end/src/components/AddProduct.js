import React from 'react'
import { useState } from 'react';

function AddProduct() {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const [error , setError]=useState(false);

    const addProduct= async ()=>{
        console.warn(!name)
        if(!name || !company || !price || !category)
        {
            setError(true);
            return false;

        }
        console.warn(name,price,category,company);
        const userId = JSON.parse( localStorage.getItem('user'))._id;
        let result =  await fetch('http://localhost:5000/add-product',{
            method : 'POST',
            body : JSON.stringify({name,price,category,company,userId}),
            headers : {'Content-Type': 'application/json'}
        });
        result= await result.json();
        console.warn(result);

    }

  return (
    <div className='product'>
        <h1>ADD Product</h1>
        <input value={name} type='text ' className='inputBox' placeholder='enter product name' onChange={(e)=>{setName(e.target.value)}}  />
          {error && !name && <span className='invalid-input'>enter valid name</span>}
        <input value={price} type='text ' className='inputBox' placeholder='enter price ' onChange={(e)=>{setPrice(e.target.value)}}  />
        {error && !price && <span className='invalid-input'>enter valid name</span>}
        <input value={category} type='text ' className='inputBox' placeholder='enter category'  onChange={(e)=>{setCategory(e.target.value)}} />
        {error && !category && <span className='invalid-input'>enter valid name</span>}
        <input  value={company} type='text ' className='inputBox' placeholder='enter company 'onChange={(e)=>{setCompany(e.target.value)}}  />
        {error && !company && <span className='invalid-input'>enter valid name</span>}
        <button className='appButton' onClick={addProduct}> Add Product</button>


    </div>
  )
}

export default AddProduct