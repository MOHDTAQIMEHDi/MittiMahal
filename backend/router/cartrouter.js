
// const express = require('express');

// const Model = require('../models/sellermodel');
// const verifyToken = require('../middlewares/verifyToken');
// const router = express.Router(); 

// router.post ('/cart', verifyToken (req, res) => {
//     req.body.user = req.user._id; // add userId to request body
//     console.log(req.body);
//     new Model(req.body).save()
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// });

// router.get ('/cart', verifyToken , (req, res) => {
//     Model.find({ user: req.user._id })
//         .then((result) => {
//             res.status(200).json(result);
//         }).catch((err) => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// }