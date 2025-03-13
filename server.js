const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const jwt = require("jsonwebtoken");    
const bcrypt = require("bcrypt");

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname,"./client/build")));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

let connectToMDB =  async ()=>{
    try{

        await mongoose.connect("mongodb+srv://bharathkumarveeravalli042:bharath123@cluster0.8zvqj.mongodb.net/StudentsData?retryWrites=true&w=majority&appName=Cluster0");
        console.log("successfully connected to MDB");

    }catch(err){
        console.log("Unable to connect to MDB");

    }
}
connectToMDB();



let userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    phoneNo:String,
    profilePic:String,
})

let User = new mongoose.model("user",userSchema,"user");

app.get("*",(req,res)=>{
    res.sendFile("./client/build/index.html");
})





app.post("/signup",upload.single("profilePic"), async(req,res)=>{
    console.log("inside sign up");

    let encryptedPassword = await bcrypt.hash(req.body.password,10);

    try{
        let newSignUp = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:encryptedPassword,
            phoneNo:req.body.phoneNo,
            profilePic:req.file.path,
            
        })

        await newSignUp.save();

        res.json({status:"success",msg:"new user created successfully "
        });


    }catch(err){
        res.json({status:"failure",msg:"unable to create the user "
        });

    }
    

   

});

app.patch("/updateProfile",upload.single("profilePic"),async(req,res)=>{
    console.log("received details for update");
    console.log(req.body);

    if(req.body.firstName.trim().length>0){

        await User.updateMany({email:req.body.email},{firstName:req.body.firstName});
    }
    if(req.body.lastName.trim().length>0){

        await User.updateMany({email:req.body.email},{lastName:req.body.lastName});
    }
    if(req.body.age>0){

        await User.updateMany({email:req.body.email},{age:req.body.age});
    }
    if(req.body.password.length>0){

        await User.updateMany({email:req.body.email},{password:req.body.password});
    }
    if(req.body.phoneNo.trim().length>0){

        await User.updateMany({email:req.body.email},{phoneNo:req.body.phoneNo});
    }
    if(req.file){

        await User.updateMany({email:req.body.email},{profilePic:req.file.path});
    }
    res.json({status:"success",msg:"profile updates successfully"});

})

app.delete("/deleteProfile",async(req,res)=>{
    console.log(req.query);

   let response =  await User.deleteMany({email:req.query.email});

   console.log(response);
   if(response.deletedCount>0){
    res.json({status:"success",msg:"User deleted successfully"});
   }else{
    res.json({status:"failure",msg:"User not deleted "});

   }

})

app.post("/login",upload.none(), async (req,res)=>{

  let userDataArr = await  User.find().and([{email:req.body.email}]);

  

  if(userDataArr.length>0){

  let passwordComparision = await bcrypt.compare(req.body.password,userDataArr[0].password);

   

    
    if(passwordComparision == true) {

        let token = jwt.sign({email:req.body.email,password:req.body.password},"kumar");

        let userDetails = {
            firstName:userDataArr[0].firstName,
            lastName:userDataArr[0].lastName,
            age:userDataArr[0].age,
            email:userDataArr[0].email,
            phoneNo:userDataArr[0].phoneNo,
            profilePic:userDataArr[0].profilePic,
            token:token,

            
        
        }
        res.json({status:"success",data:userDetails});
       
        // console.log(userDataArr[0]);

    }else{
        res.json({status:"failure",msg:"Invalid password"})
    }


  }else{
    res.json({status:"failure",msg:"User does not exist."})
  }
  console.log(userDataArr);

});

app.post("/validateToken",upload.none(),async (req,res)=>{
    console.log("inside validate token")
    console.log(req.body.token);

    let decryptedToken = jwt.verify(req.body.token,"kumar");
    console.log(decryptedToken);

    let userDataArr = await  User.find().and([{email:decryptedToken.email}]);

  

    if(userDataArr.length>0){
  
      
      if(userDataArr[0].password == decryptedToken.password) {
  
  
          let userDetails = {
              firstName:userDataArr[0].firstName,
              lastName:userDataArr[0].lastName,
              age:userDataArr[0].age,
              email:userDataArr[0].email,
              phoneNo:userDataArr[0].phoneNo,
              profilePic:userDataArr[0].profilePic,
                
  
              
          
          }
          res.json({status:"success",data:userDetails});
         
          // console.log(userDataArr[0]);
  
      }else{
          res.json({status:"failure",msg:"Invalid password"})
      }
  
  
    }else{
      res.json({status:"failure",msg:"User does not exist."})
    }
  


})


app.listen(12345,()=>{
    console.log("Listening to port 12345");
})