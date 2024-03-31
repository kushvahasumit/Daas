const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const route = require("../daas/routes/openAiRoute")
const app = express();
app.use(express.json());
app.use("/openAi",route)

// enable body parser

app.use(express.urlencoded({extended : false}))


app.listen(PORT, () => console.log(`Server is running on PORT : ${PORT}`));
