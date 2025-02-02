const dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express()
const port = process.env.PORT||3000

const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute');
const commentRoute = require('./routes/commentRoute');
const generalRoute = require('./routes/generalRoute');

const mongoose = require('mongoose');
const ValidateUser = require('./middleware/userValidation');
const Authorize = require('./middleware/authorization');

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('MongoDB connected....'));

app.use(express.json());
app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);
  
app.use(express.static(path.resolve('./public')));

app.use('/api/user',userRoute);
app.use('/api/post',ValidateUser,postRoute);
app.use('/', generalRoute);
app.use('/api/post/comment', ValidateUser, commentRoute);

app.get('/api/user/',ValidateUser,Authorize(['ADMIN', 'USER']), (req, res)=>{
    res.status(200).json({message:`Hello ${req.user.name}`});
});

app.get('/api/admin/', ValidateUser, Authorize(['ADMIN']), (req, res)=>{
    return res.status(200).json({message:"Welcome Admin!"});
})

app.listen(port, () => console.log(`Server is running on port ${port}....`))