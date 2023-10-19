const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema({
    uname:String,
    psw:String,
    classes:[],
    noti:[]
})
const productSchema=new mongoose.Schema({
    pname:String,
    price:Number,
    image:String,
    rating:Number,
    description:String,
    count:Number
})
const userSchema=new mongoose.Schema({
    email:String,
    psw:String

})
const cartSchema= new mongoose.Schema({
    userid:String,
    pid:String,
    pname:String,
    price:Number,
    image:String,
    rating:Number,
    description:String,
    quantity:Number,
    totalprice:Number


})
const wishListSchema= new mongoose.Schema({
    userid:String,
    pid:String,
    pname:String,
    price:Number,
    image:String,
    rating:Number,
    description:String
})
const wishlists= new mongoose.model("wishlists",wishListSchema)
const carts=new mongoose.model("carts",cartSchema)
const users=new mongoose.model("users",userSchema)
const products=new mongoose.model("products",productSchema)
const admin=new mongoose.model("admin",adminSchema)
module.exports={admin,products,users,carts,wishlists}