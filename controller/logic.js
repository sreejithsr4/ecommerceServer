const { json } = require('express')
const {admin,products,users,carts,wishlists}=require('../modals/collection')
login=(req,res)=>{
    const {uname,psw}=req.body
    admin.findOne({uname,psw}).then(user=>{
        if(user){
            res.status(200).json({
                message:"login successfull",
                status:true,
                statuscode:200,
                uname:user.uname
            })
        }
        else{
            res.status(401).json({
                message:"invalid username or password",
                status:false,
                statuscode:401
            })
        }
    })
}
addProduct=(req,res)=>{
    const {pname,price,image,rating,description,count}=req.body
    products.findOne({pname}).then(user=>{
        if(user){
            res.status(401).json({
                message:"product already exist",
                status :false,
                statuscode:401,
            })
        }
        else{
            let newProduct = new products({
                pname,
                price,
                image,
                rating,
                description,
                count
            })
            newProduct.save()
            res.status(201).json({
                message: "product added successfully",
                status: true,
                statusCode: 201
            })
        }
    })
}
getAllProduct=(req,res)=>{
    products.find().then(product=>{
        if(product){
            res.status(200).json({
                message:"product data retrived",
                status:true,
                statuscode:200,
                products:product
            })
        }
        else{
            res.status(404).json({
                message:"error",
                status:false,
                statusCode:404,
            })
        }
    })

}
editproduct=(req,res)=>{
    const {id}=req.params
    const {pname,price,image,rating,description,count}=req.body

    products.findOne({_id:id}).then(product=>{
        if(product){
            product.pname=pname
            product.price=price
            product.image=image
            product.rating=rating
            product.description=description
            product.count=count

            product.save()
            res.status(200).json({
                message:"product updated",
                status:true,
                statuscode:200
            })
        }
        else{
            res.status(404).json({
                message:"error",
                status:false,
                statusCode:404,
            }) 
        }
    })
}
deleteproduct=(req,res)=>{
    const {id}=req.params
    products.deleteOne({_id:id}).then(data=>{
        if(data){
            res.status(200).json({
                message:"product deleted",
                status:true,
                statuscode:200
            })
        }
        else{
            res.status(404).json({message:"product notfound",
        status:false,
    statuscode:404})
        }
     
      
    })
}
getproduct=(req,res)=>{
    const {id}=req.params
    products.findOne({_id:id}).then(pdata=>{
        if(pdata){
            res.status(200).json({
                message:pdata,
                status:true,
                statuscode:200
            })
        }
        else{
            res.status(404).json({
                message:"not found",
                status:false,
                statuscode:404
            })
        }
    })
}
userregister=(req,res)=>{
    const {email,psw}=req.body
    users.findOne({email}).then(user=>{
        if(user){
            res.status(401).json({
                message:"user exists",
                status:false,
                statuscode:401
            })
        }
        else{
            let newuser=new users({
                email,
                psw

            })
            newuser.save()
            res.status(200).json({
                message:"signup successful",
                status:false,
                statuscode:200
            })
        }
    })

}
ulogin=(req,res)=>{
    const {email,psw}=req.body
    users.findOne({email,psw}).then(user=>{
        if(user){
            res.status(200).json({
                message:"login successful",
                status:true,
                statuscode:200,
                id:user._id
            })
        }
        else{
            res.status(404).json({
                message:"user not found",
                status:false,
                statuscode:404
            })
        }

    }
    )
}
addCart=(req,res)=>{
    const {userid,pid}=req.body
    carts.findOne({userid,pid}).then(data=>{
        if(data){
            data.quantity+=1
            data.totalprice=data.quantity*data.price
            data.save()
            res.status(200).json({
                message:"product added again",
                status:true,
                sttuscode:200
            })
        }
        else{
            products.findOne({_id:pid}).then(product=>{
                if(product){
                    let newCart= new carts({
                        userid,
                        pid,
                        pname:product.pname,
                        price:product.price,
                        image:product.image,
                        rating:product.rating,
                        description:product.description,
                        quantity:1,
                        totalprice:product.price
                    })
                    newCart.save()
                    res.status(200).json({
                        message:"Product added to cart",
                        status:true,
                        sttuscode:200
                    })
                } })
        }
    })

    
}
cartcount=(req,res)=>{
    const {userid}=req.params
    carts.find({userid}).then(product=>{

        res.status(200).json({
            message:product.length,
            status:true,
            sttuscode:200
        })
    })

}
getcart=(req,res)=>{
    const {userid}=req.params
    carts.find({userid}).then(product=>{
        if(product){
            res.status(200).json({
                message:product,
                status:true,
                sttuscode:200
            })
        }
 
    })
}
addquantity=(req,res)=>{
    const {pid,userid}=req.body
carts.findOne({pid,userid}).then(product=>{
    product.quantity+=
    product.totalprice=data.quantity*data.price
    product.save()

    res.status(200).json({
        message:"cart added",
        status:true,
        sttuscode:200
    })
})
}
totalprice=(req,res)=>{
    const {userid}=req.params
    carts.find({userid}).then(product=>{
        if(product.length>0){
            fullprice=product.map(i=>i.totalprice).reduce((a,b)=>a+b)
            res.status(200).json({
                message:fullprice,
                status:true,
                sttuscode:200
                
            })
        }
     
    })
}
quantityincremenet=(req,res)=>{
    const{id}=req.params
    carts.findOne({_id:id}).then(data=>{
        if(data){
            data.quantity+=1
            data.totalprice=data.quantity*data.price
            data.save()
            res.status(200).json({
                message:data.quantity,
                status:true,
                sttuscode:200,
                price:data.totalprice
                
            })
        }
    })
}
quantitydecremenet=(req,res)=>{
    const{id}=req.params
    carts.findOne({_id:id}).then(data=>{
        
            if(data.quantity>1){
                data.quantity-=1
                data.totalprice=data.price*data.quantity
                data.save()
                res.status(200).json({
                    message:data.quantity,
                    status:true,
                    sttuscode:200,
                    price:data.totalprice
                    
                })
            }
        else{
            res.status(401).json({
                message:"cart empty",
                status:false,
                sttuscode:401,
               
            })
        }
    } )} 


remove=(req,res)=>{
    const {id}=req.params
    carts.deleteOne({_id:id}).then(data=>{
       
            res.status(200).json({
                message:"Item removed",
                status:true,
                sttuscode:200,
               
            })
        
    })
}
addwishlist=(req,res)=>{
    const {userid,pid}=req.body
    wishlists.findOne({userid,pid}).then(data=>{
        if(data){
            
            res.status(200).json({
                message:"product already in wishlist",
                status:true,
                sttuscode:200
            })
        }
        else{
            products.findOne({_id:pid}).then(product=>{
                if(product){
                    let newWishlist= new wishlists({
                        userid,
                        pid,
                        pname:product.pname,
                        price:product.price,
                        image:product.image,
                        rating:product.rating,
                        description:product.description
                    })
                    newWishlist.save()
                    res.status(200).json({
                        message:"Added to wishlist",
                        status:true,
                        sttuscode:200
                    })
                } })
        }
    })


}
getwishlist=(req,res)=>{
    const {userid}=req.params
    wishlists.find({userid}).then(data=>{
        res.status(200).json({
            message:data,
            status:true,
            sttuscode:200
        })
    })
}
wishremove=(req,res)=>{
    const {pid}=req.params
    wishlists.deleteOne({pid}).then(data=>{
       
        res.status(200).json({
            message:"Item removed",
            status:true,
            sttuscode:200,
           
        })
    
})
}
userdata=(req,res)=>{
    users.find().then(data=>{
        if(data){
            res.status(200).json({
                message:data,
                status:true,
                sttuscode:200
            })
        }
    })
}
deleteuser=(req,res)=>{
    const {id}=req.params
    users.deleteOne({_id:id}).then(data=>{
        carts.deleteMany({userid:id}).then(data=>{
            wishlists.deleteMany({userid:id}).then(data=>{
                res.status(200).json({
                    message:"user removed",
                    status:true,
                    sttuscode:200,
                   
                })
            })
        })
        
    })
}


module.exports={login,addProduct,getAllProduct,
    editproduct,deleteproduct,getproduct,userregister,
    ulogin,addCart,cartcount,getcart,totalprice,quantityincremenet,
    quantitydecremenet,remove,addwishlist,getwishlist,wishremove,userdata,deleteuser}