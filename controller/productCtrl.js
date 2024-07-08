const Product = require("../model/product.model")


class APIFeatues{
    constructor(query,queryString){
        this.query = query
        this.queryString=queryString
    }

    
   
    filtering(){

        const queryObj = {...this.queryString}

        const excludeFields= ['page','sort','limit'];
        excludeFields.forEach(el=> delete(queryObj[el]))


        let queryStr= JSON.stringify(queryObj)
        queryStr=queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g,match => '$' + match)

        this.query=this.query.find(JSON.parse(queryStr))

        console.log("i am inside filtering")

        return this


    }
    sorting(){

        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(',').join('')
            // console.log(sortBy)
            console.log("i am inside sorting")

            this.query = this.query.sort(sortBy)

        }else{
            this.query = this.query.sort('-createdAt')
        }

        return this

    }

     pagination(){

        const page = Number(this.queryString.page) || 1
        console.log(page)
        console.log(this.queryString)
        const limitskip = Number(this.queryString.limit) || 10
        

        const startIdx = (page - 1)*limitskip;

        this.query=this.query.limit(limitskip).skip(startIdx);
        console.log("i am inside pagination")
        return this

    }

}

const productCtrl={

    getProduct:async(req,res)=>{

        try{

            const feature= new APIFeatues(Product.find(),req.query).filtering().sorting().pagination()
            const products=await feature.query
            

             res.status(201).json(products)

        }
        catch(err){
            res.status(500).json({message:err.message,"hello":"hello"})
        }
    },
    createProduct:async(req,res)=>{
        try{

            const {product_id,title,price,description,content,category}=req.body

            const existProduct= await Product.findOne({product_id})

            if(existProduct)
                {
                    res.json({message:"product already exist"})
                }
            
            const newProduct = new Product({
                product_id,title:title.toLowerCase(),price,description,content,category

            })

            await newProduct.save()
            res.json({message:"product created",newProduct})



        }
        catch(err){
            res.json({message:err.message})
        }
    }
    ,
    deleteProduct:async(req,res)=>{
        try{
            const {id}=req.params

            await Product.findByIdAndDelete(id)


            res.json({message:"product deleted"})


        }
        catch(err){
            res.json({message:err.message})
        }
    },
    updateProduct:async(req,res)=>{
        try{
            const {id}=req.params

            await Product.findByIdAndUpdate(id,req.body)

            res.json({message:"product updated"})

        }
        catch(err){
            res.json({message:err.message})
        }
    }
}


module.exports=productCtrl