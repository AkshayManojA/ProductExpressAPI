const express = require('express')
const products = require('../products')
const router = express.Router()

// /Products
router.get('/',(req,res)=>{
    try{
        res.status(200).json(products)

    }catch(error){
        res.status(404).json({error:error.message})
    }
})

//get product by id
router.get('/:id',(req,res)=>{
    try{
        const productID = parseInt(req.params.id)
        const product = products.find(prod=>prod.
        id===productID)
        
        if(!product) res.status(404).json
        ({error:"product Not Found"})
        res.status(200).json(product)

    }catch(error){
        res.status(404).json({error:error.message})
    }
})

//POST -Create product
router.post('/',(req,res)=>{
    try{
        
        if(!req.body) return res.status(404).json({message:"Name and Price are required"})
            const {name,price} = req.body

            const newProduct = {
                id:products.length?products[products.length-1].id +1:1,
                name:name,
                price:price
            }
            products.push(newProduct)

            res.status(201).json({message:"Product added",
                product:newProduct})

    }catch(error){
        res.status(404).json({error:error.message})
    }
})

//Update
router.patch('/:id',(req,res)=>{
    try{
        const productID = parseInt(req.params.id)
        const product = products.find(prod=>prod.
        id===productID)
        
        if(!product) res.status(404).json
        ({error:"product Not Found"})
        const {name,price} = req.body
        if(name) product.name = name
        if(price)product.price = price
        res.status(200).json(product)

    }catch(error){
        res.status(404).json({error:error.message})
    }
})

//Delete
router.delete('/:id',(req,res)=>{
    try{
        const productID = parseInt(req.params.id)
        const productIndex = products.findIndex(prod=>prod.
        id===productID)
        
        if(productIndex == -1)  return res.status(404).json
        ({error:"product Not Found"})
        const deletedProduct = products.splice(productIndex,1)
        res.status(200).json({message:"Product deleted",
            product:deletedProduct
        })

    }catch(error){
        res.status(404).json({error:error.message})
    }
})
 module.exports = router