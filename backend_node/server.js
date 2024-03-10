const express=require("express");
const app=express();
const PORT=5500
var db=require('./models/doctors.js')
const doctors=require('./routes/doctors.js');
app.use(express.json());

app.get("/",(req,res)=>{    
    res.send("Hello World")
});

app.use('/doctors',doctors);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})