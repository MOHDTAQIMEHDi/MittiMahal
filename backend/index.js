const express = require('express');
const userRouter = require('./router/userRouter'); // import userRouter
const sellerRouter = require ('./router/sellerRouter');
const productRouter = require ('./router/productRouter');
const cors = require('cors');


const app = express(); // create express app instance 

const port = 5000; // port number

//middleware
app.use(cors({ origin: ['http://localhost:3000']}));
app.use(express.json());
app.use('/user', userRouter); // use userRouter for /user path
app.use('/seller', sellerRouter); // use sellerRouter for /seller path
app.use('/product', productRouter); // use sellerRouter for /seller path



//routes or endpoints  
app.get('/add', (req, res) => {
   res.send('response from express server'); // send response to client

}); 
app.get('/getall', (req, res) => {
   res.send('response from getall'); // send response to client

}); 


app.get('/delete', (req, res) => {
   res.send('delete server'); // send response to client
})


app.listen(port, () => {
   console.log('Server Started');
   
});   // listen to port number    