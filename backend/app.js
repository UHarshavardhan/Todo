const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router =require("./index")

const app = express();
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb+srv://uharsha200124:Harsha@cluster0.ezewj.mongodb.net/", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



app.use(cors());
app.use(express.json());




app.use('/',router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

