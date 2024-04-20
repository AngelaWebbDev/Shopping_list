const mongoose = require('mongoose');

const ItemsSchema = mongoose.Schema({
    name:{type:String,
            required:[true,'Item name required.'],
            minlength:[2,'Item name must be at least 2 characters long.'],
            maxlength:[20, 'Item name cannot be more than 20 characters long.']},
    section:{type:String,
                required:[true,'section is required.'],
                minlength:[1,'section is required'],
                maxlength:[10, 'Section cannot be more than 10 characters long.']},
    notes:{type:String},
    alternative1:{type:String,
                    maxlength:[20, 'Item name cannot be more than 20 characters long.']},
    alternative2:{type:String,
                    maxlength:[20, 'Item name cannot be more than 20 characters long.']}
}, {timestamps:true})

module.exports = mongoose.model('Items', ItemsSchema)