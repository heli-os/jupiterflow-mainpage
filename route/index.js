const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const _config = req._config;
    res.render('index', {portfolioData: _config.portfolioData, colorScheme: _config.colorScheme});
});


module.exports = router;