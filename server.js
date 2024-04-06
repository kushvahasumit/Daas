const express = require("express");
const cors = require('cors')
require("dotenv").config();
const fs = require('fs')
const multer = require('multer')
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
  destination : (req,res,cb) => {
    cb(null, 'images')
  },
  filename : (req, file, cb)=>{
    console.log('file',file)
    cb(null,Date.now() + "-" + file.originalname)
  }
})

const upload = multer({storage:storage}).single('file')
let filePath;


app.post("/genImg",async (req,res) => {
 const inputData = req.body.value;
 console.log("Input received:", inputData);
 const sizeOptions =
   req.body.size === "small"
     ? "256x256"
     : req.body.size === "medium"
     ? "512x512"
     : req.body.size === "large"
     ? "1024x1024"
     : [];
 console.log("size received:", sizeOptions);

    try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: inputData,
          n: 2,
          quality: "hd",
          size: sizeOptions,
          response_format: "url",
        });

        const image_url = response.data[0].url;
        res.status(200).json(
          response
        );
        res.send(response.data.data)
        console.log("this is backend image",image_url)
    } catch (error) {
         if (error.response) {
           console.log(error.response.status);
           console.log(error.response.data);
         } else {
           console.log(error.message);
         }
        res.status(400).json({
            sucess:false,
            error:"Something went wrong"
        })
       
    }
});

app.post('/upload',async (req,res)=>{
       upload(req,res,(error)=>{
        if (error instanceof multer.MulterError) {
          return res.status(500).json(error)
        }else if(error){
          return res.status(500).json(error);
        }
        console.log(req.file.path)
        filePath = req.file.path;
       })
})

app.post('/variation',async (req,res)=>{
  try {
        const response = await openai.images.createImageVariation(
          fs.createReadStream(filePath),
          "dall-e-2",
          2,
          "256x256"
        );
        
        const image_url = response.data.data[0].url;
        console.log("This is image u want", image_url)
      } catch (error) {
        console.log(error)
      }
})

app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
