const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    res.send(`There's nothing here`);
});

module.exports = router;