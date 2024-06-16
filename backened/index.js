const express = require('express');
const cors = require('cors');
require('./db/config')
const user = require('./db/Users');
const Product = require('./db/Product');
const Jwt= require('jsonwebtoken');
const jwtKey='e-comm';
const app = express();

const port = 5000;
app.use(cors())
app.use(express.json());

// <------------------------------------------------------------------------------------------------>
// this down code is of user database fetch api for registraintonn and login
app.post('/register',async (req,res)=>{
    let newUser = new user(req.body);//it is the data that we are getting from the postman 
    let result = await newUser.save(); //here we will save the data in result or create a new user data 
    result = result.toObject();
    delete result.password;
    Jwt.sign({result},jwtKey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        res.send({result:"something went wrong "});
      }res.send({result,auth:token})

      })
})

app.post("/login", async (req, res) => {
  let newUser = await user.findOne(req.body).select("-password");
  if(req.body.password && req.body.email){
    
  if (newUser) {
    Jwt.sign({newUser},jwtKey,{expiresIn:"2h"},(err,token)=>{
      if(err){
        res.send({result:"something went wrong "});
      }res.send({newUser,auth:token})

      })
  } else {
    res.send({ result: "no user found" });
  }
  }else{
    res.send({ result: "no user found" });

  }


});

// <.........................................................>
app.post('/add-product',async(req,res)=>{
  let product =new Product(req.body);
  let result= await product.save();
  res.send(result);
  
})

// <.............below is to get the product item from database ............................................ >
app.get('/products',async(req,res)=>{
  let products =await  Product.find();
  if(products.length>0){
    res.send(products)
  }else{
    res.send({result: " not found"});
  }

})
// <.............below is to delete item from database............................................ >
app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result)
}),


app.get("/product/:id", async (req, res) => {
        let result = await Product.findOne({ _id: req.params.id });
        if(result){
          res.send(result);
        }else{
          res.send({result: " not found"});
        }
})

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
  )
  resp.send(result)
});


// <????????????????????????????????????below is search api>>>>


app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
      "$or": [
          {
              name: { $regex: req.params.key }  
          },
          {
              company: { $regex: req.params.key }
          },
          {
              category: { $regex: req.params.key }
          }
      ]
  });
  resp.send(result);
})




// <--------------------------------the down part is only server port ----------------------------->
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

