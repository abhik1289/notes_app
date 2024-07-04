const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/note',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Server Run")
}).catch((error)=>{
    console.log(error)
});

