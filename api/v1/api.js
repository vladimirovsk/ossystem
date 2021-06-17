const express = require('express');
const router = express.Router();

router.all('*', require('./index'));
router.all("/databases/catalog*", require('./routes/catalog'));
router.all("/databases/categories*", require('./routes/categories'));


module.exports = router;