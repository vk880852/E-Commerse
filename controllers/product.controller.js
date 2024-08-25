import { Product } from "../models/product.model.js";
import fs from "fs";
import slugify from "slugify";
import path from 'path'
import braintree from "braintree"
import orderModel from "../models/order.model.js";
 import dotenv from 'dotenv'
dotenv.config({
   path:'./.env'
 })

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//token -function

const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
 const braintreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    let cart1=[];
    cart.map((i) => {
      total += i[0].price;
      cart1.push(i[0]._id);
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: [...cart1],
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const { photo } = req.files;
    if (
      [name, description, price, category, quantity].some(
        (x) => x?.trim() === ""
      )
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }
    if (!photo || !photo.length) {
      return res.status(400).send({ message: "Photo is required" });
    }

    const photoData = fs.readFileSync(photo[0].path);
    const newProduct = new Product({
      name,
      description,
      price,
      slug: slugify(name),
      category,
      quantity,
      shipping,
      photo: {
        data: photoData,
        contentType: photo[0].mimetype,
      },
    });

    await newProduct.save();

    return res
      .status(201)
      .send({
        success: true,
        message: "product created successfully",
        newProduct,
      });
  } catch (error) {
    console.error("Error occurred while creating product:", error);
    return res
      .status(500)
      .send({
        message: "Something went wrong while creating the product",
        error,
      });
  }
};

const getallproduct = async (req, res) => {
  try {
    const allProducts = await Product.find({})
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 })
      .populate("category");
    return res
      .status(200)
      .send({ message: "All Products Fetched", allProducts });
  } catch (error) {
    console.error("Error occurred while fetching all products:", error);
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getsingleproduct = async (req, res) => {
  try {
    const {slug} = req.params;
    const product = await Product.findOne({slug} )
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    return res.status(200).send({ message: "Single Product fetched", product });
  } catch (error) {
    console.error("Error occurred while fetching single product:", error);
    return res.status(500).send({ message: "Something went wrong", error });
  }
};

const getproductphoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pId);
    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({ message: "Photo not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Something went wrong while accessing data", error });
  }
};
const deleteProductController = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.pId).select(
      "-photo"
    );
    res
      .status(201)
      .send({ message: "Product is deleted successfully", product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "something went wrong", error });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    const { photo } = req.files;

    const product = await Product.findById(req.params.pId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    if (photo && photo[0]) {
      const photoFile = photo[0];
      const photoData = await fs.readFileSync(photoFile.path);

      if (product.photo && product.photo.filename) {
        const oldPhotoPath = path.join(process.cwd(), 'client', 'public', 'images', product.photo.filename);
        try {
          await fs.unlinkSync(oldPhotoPath);
          console.log("Old photo deleted successfully");
        } catch (err) {
          console.error("Error occurred while deleting the old photo:", err);
        }
      }

      product.photo = {
        data: photoData,
        contentType: photoFile.mimetype,
        filename: photoFile.filename,
      };
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (category) product.category = category;
    if (quantity) product.quantity = quantity;
    if (shipping !== undefined) product.shipping = shipping;

    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error occurred while updating product:", error);
    return res.status(500).send({
      message: "Something went wrong while updating the product",
      error,
    });
  }
};
//filter by price
const filterProduct=async(req,res)=>{
  try 
  {
    const {check,radio}=req.body;
    let args={};
    if(check.length>0)args.category=check;
    if(radio.length>0)args.price={$gte:radio[0],$lte:radio[1]};
    const product=await Product.find(args);
    return res.status(200).send({success:true,message:'accessfully sort',product});
  } catch (error) {

    res.status(400).send({success:false,message:`something went wrong while Pricesorting the Product ${error}`});
  }
}

const productCountController=async(req,res)=>
{
try {
  const product=await Product.find({}).estimatedDocumentCount();
  return res.status(201).send({success:true,product});
} catch (error) {
  return res.status(401).send({success:false,message:`something went wrong ${error}`})
}

}
//product List Page
const productListController = async (req, res) => {
  try {
    const perPage = 3;
    const page =parseInt(req.params.page);
    const products = await Product.find({})
       .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
     res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(`Error occurred while listing Page: ${error}`);
    res.status(500).json({
      success: false,
      message: `Failed to fetch the list of products: ${error}`,
    });
  }
};
const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }).select("-photo");

    console.log(result); 
    
    return res.status(200).json({ success: true, result }); 
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' }); // Added error response
  }
};
const relatedProduct=async(req,res)=>{
  const {cId,pId}=req.params;
  const similarProducts=await Product.find({category:cId,_id:{$ne:pId}}).select("-photo").populate("category");
  res.status(200).send({
    success:true,
    similarProducts
  })
}

export default updateProduct;
  
export {
  relatedProduct,
  braintreeTokenController,
  braintreePaymentController,
  createProduct,
  productListController,
  searchProductController,
  productCountController,
  getallproduct,
  getsingleproduct,
  getproductphoto,
  deleteProductController,
  updateProduct,
  filterProduct
};
