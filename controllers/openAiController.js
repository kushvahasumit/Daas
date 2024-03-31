const {OpenAI} = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


const generateImg = async (req,res,next) => {
    const {prompt,size} = req.body;
    
    const imgSize = size === 'small' ? '256x256' : size === 'medium' ? '512x512' : '1024x1024';

    try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: prompt,
          n: 1,
          quality: "standard",
          size: imgSize,
          response_format: "url",
        });
        const image_url = response.data[0].url;
        res.status(200).json({
          sucess: true,
          data:response,
        });

        console.log(response.data)
        console.log(image_url)
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
};

module.exports = {generateImg};