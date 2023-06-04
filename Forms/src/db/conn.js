const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://umeraghori:Hnuf1234*@cluster0.k7na5tt.mongodb.net/forms?retryWrites=true&w=majority", {
    
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`)
})