const http = require('http');
const express = require('express');
const host = 'localhost'
const {amazon} = require('./controller/scrapper');
const productModel=require('./model/product')
const mongo=require('./controller/connect');
const cors=require('cors');
require('dotenv').config();
const app = express();

app.use(express.json()); 

const main = () =>{
    console.log('Running amazon');
    amazon();
}

app.use(cors())

app.use('/get',async(req,res,next)=>{
    try{
        const product=await productModel.find();
        return res.send(product);
        
    }catch(err){
        console.log(err);
    }
})

const port=process.env.PORT||8080

app.listen(port, host, ()=> {
    console.log(`Server running at http://${host}:${process.env.PORT}`);
    main();
})