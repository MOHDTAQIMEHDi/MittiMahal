const mongoose = require('mongoose');

const url = "mongodb+srv://mtmt8470:mtmt7070@cluster0.xz5fd.mongodb.net/mittimahal?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
}).catch((err) => {
    console.log(err);
    
});

module.exports = mongoose;