const express=require('express');
const helmet=require('helmet');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const mongoose=require('mongoose');
const authRouter=require('./routers/authRouter');
const searchRouter=require('./routers/searchRouter');

const app=express();
app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Datebase Connected");
}).catch(err=>{
    console.log("Error: ",err);
});

app.use('/api/auth',authRouter);
app.use('/api',searchRouter);

app.get('/',(req,res)=>{
    res.json({message:'Hello from the server'});
});

app.listen(process.env.PORT,()=>{
    console.log('listening...');
});