const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
    name:{type:String,
                required:[true,'Item name is required.'],
                minlength:[2,'Item name must be at least 2 characters long.']},
    section:{type:String,
            required:[true,'Grocery section is required.']},
    notes:{type:String},
    alternative1:{type:String},
    alternative2:{type:String}
    }, {timestamps:true})

module.exports = mongoose.model('Items', ItemsSchema)