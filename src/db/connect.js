const mongoose = require('mongoose');
// Connect Database with Serber 
mongoose.connect(process.env.DATABASE).then(() => {
    console.log('connection successful');
}).catch((err) => {
    console.log(err);
})