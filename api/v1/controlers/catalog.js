const catalog = require("../../../application/shema/catalog")
const mongoose = require('mongoose');

module.exports = class CatalogController {
    /**
     * select all records from Catalog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async select(req, res){
        catalog.find({}).exec()
            .then(async (responce)=>{
                res.status(200).send(responce)
            })
            .catch((err)=>{throw err})
    }

    /**
     * From insert record to Catalog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
     async insert(req, res) {
         const body = req.body;
         //console.log(mongoose.Types.ObjectId(body.category))
          const new_record = new catalog({
             title: body.title,
             description:body.description,
             image:body.image,
             category: mongoose.Types.ObjectId(body.category)
          });

         new_record.save()
             .then( ()=> {
                 res.json({new_record})
             })
             .catch(err=>{throw err})
    }

    /**
     * Read one record from Catalog
      * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async read(req, res){
         console.log(req.params.id)
        catalog.findOne({ _id: req.params.id }).then(post => {
            if (!post) {
                res.send({ error: 'not found' });
            } else {
                res.json(post);
            }
        });
    }

    /**
     * Update one record from Catalog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async update(req, res){
        let body = {
            title:req.body.title,
            description:req.body.description,
            image: req.body.image,
            category: mongoose.Types.ObjectId(req.body.category)
        }
        catalog.findOneAndUpdate({_id:req.params.id}, { $set: body }, err => {
            if (err) {
                res.send(err);
            }
            res.json({ status: 'updated' });
        });
    }

    /**
     * Delete one record from Catalog
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async delete(req, res){
        catalog.findOneAndDelete({
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
     * Filter tables catalog from columns title
     * @param req.params.text
     * @param res
     * @returns {Promise<void>}
     */
    async filter(req, res){
        await catalog.find(
            {
                title: {$regex: req.params.text}, image: {$regex: req.params.text}
            })
            .then(result =>{
                res.status(200).json(result);
            })
            .catch(err=>{throw err})
    }
}