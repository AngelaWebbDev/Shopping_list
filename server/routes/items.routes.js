const ItemsController = require('../controllers/items.controller')

module.exports = (app) => {
    //create
    app.post('/api/newitem', ItemsController.newitem)

    //read all
    app.get('/api/getAll', ItemsController.getAll)

    //read one by id
    app.get('/api/itemdetails/:id', ItemsController.itemdetails)

    //update one by id
    app.put('/api/updateItem/:id', ItemsController.updateItem)

    //delete one by id
    app.delete('/api/deleteItem/:id', ItemsController.deleteItem)
}