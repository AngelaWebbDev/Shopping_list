const ShoppingListController = require('../controllers/shoppingList.controller')

module.exports = (app) => {
    app.get('/api/address', ShoppingListController.addOneItem)
}