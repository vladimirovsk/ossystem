const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema({
    name : { type: String, required: true}
});

let category = mongoose.model('Category', Categories);


module.exports = category;


