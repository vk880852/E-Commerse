import {Category} from '../models/category.model.js'
import slugify from 'slugify';
import { Product } from '../models/product.model.js';
const categoryController=async(req,res)=>
{
    try {
         const {name}=req.body;
         if(!name)
            {
              return  res.status(401).send(
               {
                    message:"name is required",
                })
            }
            const existCategory=await Category.findOne({name});
            if(existCategory)
                {
                    return res.status(200).send(
                    {
                     message:"Category is Already exist",
                    })
                }
            const newCategory=await Category.create({name,slug:slugify(name)})
            return res.status(201).send(
            {message:"new Category successfully added",
             newCategory
            })
    } catch (error) {
        console.log(`Error happened during creation of category ${error}`)
        return res.status(401).send({message:`Error Happened During Creation of Category`.error})
    }
}
const updateCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCategory = await Category.findByIdAndUpdate(id, {
            $set: {
                name: req.body.updatedName
            }
        }, { new: true }); 

        res.status(200).json({ success: true, category: updatedCategory });
    } catch (error) {
        console.error(`Error occurred while updating category: ${error}`);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

const allcategory=async(req,res)=>{
    try{
        const category=await Category.find({});
        return res.status(201).send({message:"All Category is Found",
        category})
    }
    catch(e)
    {
        console.log(e);
        return res.status(401).send({message:`Error Happened During access of Category`.e})

    }
}
const singlecategory=async(req,res)=>{
    
    try{
        const {slug}=req.params;
        const category=await Category.findOne({slug});
        const product=await Product.find({category}).select("-photo").populate("category");
        console.log(product);
        return res.status(201).send({message:"Category and Product is Found",
        product})
    }
    catch(e)
    {
        console.log(e);
        return res.status(401).send({message:`Error Happened During access of single Category`.e})

    }
}
const deletecategory=async(req,res)=>{
    try{
        const {id}=req.params;
        const res=await Category.findByIdAndDelete(id);
        return res.status(201).send({message:`successtfully deleted`,res});
    }
    catch(e)
    {
        return res.status(401).send({messange:`something went wrong while deleting the category`,e})
        console.log(e);
    }
}
export {categoryController,allcategory,singlecategory,deletecategory,updateCategory}