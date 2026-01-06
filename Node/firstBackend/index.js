import dotenv from 'dotenv'
dotenv.config();

import express from 'express'


const app = express();

app.get("/", (req, res) => {
  console.log("Server is Running");
  res.json({message:"Server is running sucessfully"});
})


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Started at port", port);

})

