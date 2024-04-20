const Items = require('../models/items.model')

module.exports = {
    
    newitem: (req, res) => {
                Items.create(req.body, { new: true, runValidators: true })
                            .then(newdoc => res.status(201).json(newdoc))
                            .catch(err => res.status(500).json(err))
    },

    getAll: (req, res) => {
            Items.find({})
                        .then(alldocs => res.status(200).json(alldocs))
                        .catch(err => res.status(500).json(err))
    },

    itemdetails: (req, res) => {
                Items.findOne({_id:req.params.id})
                            .then(onedoc => res.status(200).json(onedoc))
                            .catch(err => res.status(500).json(err))
    },

    updateItem: (req, res) => {
                    Items.findOneAndUpdate({_id:req.params.id}, req.body, {new:true, runValidators: true})
                                .then(updateddoc => res.status(201).json(updateddoc))
                                .catch(err => res.status(500).json(err))
    },

    deleteItem: (req, res) => {
                    Items.deleteOne({_id:req.params.id})
                                .then(confirmDelete => res.status(200).json(confirmDelete))
                                .catch(err => res.status(500).json(err))
    }
}