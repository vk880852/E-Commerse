import Order from "../models/order.model.js";

const Orders=async(req,res)=>{
    try{
        console.log("Welcome to the order");
        const order=await Order.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name").sort({ createdAt:-1});
        console.log(order);
        res.json(order);
    }
    catch(e)
    {
        console.log('something went wrong while accessing the order',e)
        res.status(501).send({m:"something went wrong while accessing the data",e})
    }
}
export {Orders}