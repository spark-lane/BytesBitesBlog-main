const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");
const connectToMongo = require("./db");

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));

connectToMongo(); 

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },filename:(req,file,cb)=>{
    cb(null,req.body.name);
  }
});
// Destination function determines where the uploaded files will be stored
// cb - callback function with null as first arguement
// 
const upload = multer({storage:storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/category",categoryRoute);

app.listen("5000", () => {
  console.log("Backend is running.");
});
