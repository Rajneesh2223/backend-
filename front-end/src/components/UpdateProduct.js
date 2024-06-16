import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';

function UpdateProduct() {
    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [category,setCategory]=useState('');
    const [company,setCompany]=useState('');
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
       
        getProductDetails();

    },[]);
   
    const getProductDetails = async () => {
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);

    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

  return (
    <div className='product'>
        <h1>Update Product</h1>
        <input value={name} type='text ' className='inputBox' placeholder='enter product name' onChange={(e)=>{setName(e.target.value)}}  />
         
        <input value={price} type='text ' className='inputBox' placeholder='enter price ' onChange={(e)=>{setPrice(e.target.value)}}  />
        <input value={category} type='text ' className='inputBox' placeholder='enter category'  onChange={(e)=>{setCategory(e.target.value)}} />
        
        <input  value={company} type='text ' className='inputBox' placeholder='enter company 'onChange={(e)=>{setCompany(e.target.value)}}  />
        <button className='appButton' onClick={updateProduct}> Update Product</button>


    </div>
  )
}

export default UpdateProduct