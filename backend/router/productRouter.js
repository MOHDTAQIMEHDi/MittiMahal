const express = require('express');

const Model = require('../models/productmodel');

const router = express.Router(); // create express router instance

const jwt = require('jsonwebtoken');
const verifyToken = require('../middlewares/verifyToken');
require('dotenv').config();

router.post('/add', (req, res) => { 
    console.log(req.body);
    // res.send('response from userAdd'); // send response to client

    new Model(req.body).save()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


//getall
router.get ('/getall', (req, res) => { 
    Model.find()
    .then((result) => {
        res.status(200).json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
    });
});
//getbyid
router.get('/getbyid/:id', (req, res) => { 
     Model.findById(req.params.id)
     .then((result) => {
        res.status(200).json(result);
     }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
        
     });
});

//update
router.put ('/update/:id', (req, res) => { 
     Model.findByIdAndUpdate(req.params.id , req.body)
     .then((result) => {
        res.status(200).json(result);
     }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
     });
});




//router.get ('/delete', (req, res) => { 
    //res.send('response from delete'); // send response to client});

    router.delete('/delete/:id',(req,res)=>{
        Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    })

    router.post('/authenticate',(req,res)=>{
        Model.findOne(req.body)
        .then((result) => {
            if (result){
                //generate token
                const {_id,name,email}=result;
                const payload ={_id,name,email};
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn:'1d'},
                    (err, token) =>{
                        if(err){
                            console.log(err);
                            res.status(500).json(err);
                        }else {
                           res.status(200).json({token});     
                        }
                    }
                )
            }
            else{
                res.status(401).json({message:'invalid credentials'})
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
            
        });
    })


module.exports = router; 