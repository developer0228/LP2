const dbConnect=require('./mongodb');
const express=require('express');
const { response } = require('express');
const app=express();
app.use(express.json());


// GET API
// Run the code again with node index.js
// use POSTMAN Select GET Method or API AND search for localhost:3000/getData and click send
// it will return the data from mongodb database
app.get('/getData',async(req,res)=>{
    let result=await dbConnect();
    result=await result.find().toArray();
    res.send(result);
})



// POST API
// Run the code again with node index.js
// use POSTMAN Select POST Method or API AND search for localhost:3000/insertData 
// it will add the data to mongodb database
// process - select POST method in postman, same URL - localhost:3000/insertData
// SELECT BODY , SELECT RAW SELECT JSON FROM TEXT
// type the code:
// {
//     "name":"John",
//     "email":"john@gmail.com",
//     "city":"pune"
// }
// click on send button
// then run again node index.js

app.post('/insertData',async(req,res)=>{
    let result=await dbConnect();
    result=await result.insertOne(req.body);
    res.send("Data added successfully");
})




// PUT API  (update API)
// Run the code again with node index.js
// USE POSTMAN Select PUT Method or API AND search for localhost:3000/updateData/John 
// process - select PUT method in postman, same URL - localhost:3000/updateData/John
// SELECT BODY , SELECT RAW SELECT JSON FROM TEXT
// type the code: (change the city to mumbai)
// {
//     "name":"John",
//     "email":"john@gmail.com",
//     "city":"Mumbai"
// }
app.put('/updateData/:name',async(req,res)=>{
    let result=await dbConnect();
    result=await result.updateOne({name:req.params.name},{$set:req.body});
    res.send("Data updated successfully")
})




// DELETE API
// Run the code again with node index.js
// USE POSTMAN Select DELETE Method or API AND search for localhost:3000/deleteData/Rohit (from first database given in notes)
// Click on send buttton

app.delete('/deleteData/:name',async(req,res)=>{
    let result=await dbConnect();
    result=await result.deleteOne({name:req.params.name});
    res.send("Data deleted successfully")
})



app.listen(3000);