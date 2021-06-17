const categories = require("../../../application/shema/categories")
const mongoose = require('mongoose');

module.exports = class CategoriesController {
    /**
     * select all records from Categories
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async select(req, res){
        categories.find({}).exec()
            .then(async (responce)=>{
                res.status(200).send(responce)
            })
            .catch((err)=>{throw err})
    }

    /**
     * From insert record to Categories
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async insert(req, res) {
        const body = req.body;
        const new_record = new categories({
            name: body.name
        });
        new_record.save()
            .then( ()=> {
                res.json({new_record})
            })
            .catch(err=>{throw err})
    }

    /**
     * Read one record from Categories
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async read(req, res){
        categories.findOne({ _id: req.params.id }).then(post => {
            if (!post) {
                res.send({ error: 'not found' });
            } else {
                res.json(post);
            }
        });
    }

    /**
     * Update one record from Categories
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async update(req, res){
        categories.findOneAndUpdate({_id:req.params.id}, { $set: req.body }, err => {
            if (err) {
                res.send(err);
            }
            res.json({ status: 'updated' });
        });
    }

    /**
     * Delete one record from Categories
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req, res){
        categories.findOneAndDelete({
            _id: req.params.id,
        }).then(post => {
            if (post) {
                res.json({ status: 'deleted' });
            } else {
                res.json({ status: 'error' });
            }
        });
    }

    /**
     * Filter tables Categories from columns title
     * @param req.params.text
     * @param res
     * @returns {Promise<void>}
     */
    async filter(req, res){
        await categories.find(
            {
                name: {$regex: req.params.text}
            }).exec()
            .then(result =>{
                res.status(200).json(result);
            })
            .catch(err=>{throw err})
    }
}