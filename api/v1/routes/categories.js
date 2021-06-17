const express = require('express');
const router = express.Router();

const CategoriesController = require('../controlers/categories')
const categories = new CategoriesController;

const nameRoute = '/databases/';

router.get(nameRoute+ 'categories',  categories.select);
/**
 * Filtering Categories from column Id
 */
router.get(nameRoute+ 'categories/:id',  categories.read);
/**
 * Filtering Categories from column Name
 */
router.get(nameRoute+ 'categories/name/:text', categories.filter);

router.post(nameRoute+ 'categories', categories.insert);
router.put(nameRoute+ 'categories/:id', categories.update);
router.delete(nameRoute+ 'categories/:id', categories.delete);


module.exports = router