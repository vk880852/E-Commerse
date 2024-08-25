import { Router } from "express";
import { userRegister, LoginUser, LogoutUser, updateUser,getInformation } from '../controllers/user.controller.js';
import { authuser } from '../middleware/auth.middleware.js';
import { categoryController, allcategory, singlecategory, deletecategory,updateCategory } from "../controllers/category.controller.js";
import { createProduct,getallproduct,getsingleproduct,getproductphoto,deleteProductController,updateProduct,filterProduct, productCountController,productListController, searchProductController, relatedProduct, braintreeTokenController, braintreePaymentController } from "../controllers/product.controller.js";
import {upload} from '../middleware/upload.middleware.js'
import {Orders} from '../controllers/order.controller.js'
const router = Router();
router.post('/register', userRegister);
router.get('/get-user-information',authuser,getInformation);
router.post('/update-user',updateUser)
router.post('/login', LoginUser);
router.post('/logout', authuser, LogoutUser);

// Category routes
router.post('/create-category', categoryController);
router.get('/category', allcategory);
router.get('/single-category/:slug', singlecategory);
router.post('/delete-category/:id', deletecategory);
router.put('/update-category/:id',updateCategory)

// Upload photos
router.post("/upload",upload.fields([{name:"photo",maxCount:1}]),createProduct);
router.post("/allproduct",getallproduct)
router.get("/getsingleproduct/:slug",getsingleproduct);
router.get("/getphoto/product/:pId",getproductphoto);
router.post("/product/delete-product/:pId",deleteProductController);
router.put("/product/update-product/:pId",upload.fields([{name:"photo",maxCount:1}]),updateProduct);
//filter Product
router.post("/product/product-sort",filterProduct);
//pagination in filter
router.get("/product-count",productCountController);
router.get("/product-list/:page",productListController);
//search
router.get("/product/search/:keyword",searchProductController);
//related Product
router.get("/product/similar-product/:pId/:cId",relatedProduct);//
//payment gateway
router.get("/braintree/token",braintreeTokenController);
router.post("/braintree/payment",authuser,braintreePaymentController);
//order routers
router.get("/orders",authuser,Orders)

export default router;
