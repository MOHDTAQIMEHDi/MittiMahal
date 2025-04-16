const { Schema , model} = require('../connection');

const mySchema = new Schema ({
    name : String ,
    mobile : {type : Number , unique : true} , 
    address : String,
    city : String,
    state : String, 
    pincode : Number,
    email : {type : String , unique : true} ,
    password :{type : String , require : true} ,
    createdAt : {type : Date , default:Date.now}
});

module.exports =  model('seller' , mySchema);