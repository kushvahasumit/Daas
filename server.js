const express = require("express");
const cors = require('cors')
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors())

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/genImg",async (req,res) => {
    

    try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: "boy flying an aeroplane",
          n: 2,
          quality: "standard",
          size: "1024x1024",
          response_format: "url",
        });

        const image_url = response.data[0].url;
        res.status(200).json(
          response
        );
        res.send(response.data.data)
        // console.log(response.data[0].url)
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


app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
