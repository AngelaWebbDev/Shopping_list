const ShoppingList = require('../models/shoppingList.model')

module.exports = {
    addOneItem: (req, res) => {
        Dbname.create(req.body)
            .then(newThing => res.status(200).json(newThing))
            .catch(err => res.status(500).json('addOneItem error:',err))
    }
}