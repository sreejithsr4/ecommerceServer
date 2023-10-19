require('dotenv').config()

const express=require('express')
const router = require('./route/route')
const cors =require('cors')



const server=express()
server.use(express.json())
server.use(cors())
server.use(router)
require ('./db/connection')
const port=3000 || process.env.port
server.listen(port,(port,()=>{
    console.log(`.........server started at port:${port}.........`);
}))
