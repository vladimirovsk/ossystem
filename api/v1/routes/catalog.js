const express = require('express');
const router = express.Router();

const CatalogController = require('../controlers/catalog')
const catalog = new CatalogController;

const nameRoute = '/databases/';

router.get(nameRoute+ 'catalog',  catalog.select);
/**
 * Filtering Catalog from column id
 */

router.get(nameRoute+ 'catalog/:id',  catalog.read);
/**
 * Filtering Catalog from column title
 */
router.get(nameRoute+ 'catalog/title/:text', catalog.filter);

router.post(nameRoute+ 'catalog', catalog.insert);
router.put(nameRoute+ 'catalog/:id', catalog.update);
router.delete(nameRoute+ 'catalog/:id', catalog.delete);

module.exports = router