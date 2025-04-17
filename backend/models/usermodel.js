const { Schema , model} = require('../connection');

const mySchema = new Schema ({
    name : String ,
    email : {type : String , unique : true} ,
    password :{type : String , require : true} ,
    role: {type : String , default : 'user' , enum : ['user' , 'admin' , ]},
    createdAt : {type : Date , default:Date.now}
});

module.exports =  model('user' , mySchema);