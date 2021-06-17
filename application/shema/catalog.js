const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Catalog = new Schema({
    title     : { type: String},
    category  : {
        ref: 'categories',
        type: Schema.Types.ObjectId},
    image:  { data: Buffer, contentType: String },
    description: {type: String}
});

let catalog = mongoose.model("Catalog", Catalog);


module.exports = catalog;