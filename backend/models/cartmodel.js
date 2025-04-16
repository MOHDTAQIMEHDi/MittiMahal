
const mongoose = require('../connection');

const cartSchema = new mongoose.Schema({
   
    userId: { type: mongoose.Schema.Types.ObjectId,  required:true, ref: 'user' },
   
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;