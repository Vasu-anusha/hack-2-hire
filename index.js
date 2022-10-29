const express=require('express');
const mongoose=require('mongoose');
const registerRouter=require('./registration');
const loginRouter=require('./login');

const app=express(); 

app.use(express.urlencoded());
app.use(express.json()); 

app.use('/api/register',registerRouter);
app.use('/api/login',loginRouter);



// mongoose.connect('mongodb+srv://vidlyuser:hzaafkeieyza@cluster0.mtgergr.mongodb.net/vidly',{ useNewUrlParser: true },{ useUnifiedTopology: true })
mongoose.connect('mongodb://localhost:27017/hackhire')
.then(()=>{
  console.log('connected');
})
.catch((err)=>{
 console.log('Not connected to MongoDB',err);
});
 



app.listen(2000);

