const mongoose = require('mongoose');

const ShoppingListSchema = mongoose.Schema({
        key1:{  type:String,
                required:[true,'error msg'],
                minlength:[5,'error msg']},
        key2:{	type:Number,
                required:[true,'error msg'],
                min:[3,'error msg']}
    },{timestamp:true})

module.exports = mongoose.model('ShoppingList', ShoppingListSchema)