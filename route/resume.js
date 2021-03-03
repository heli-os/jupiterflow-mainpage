const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const _config = req._config;
    res.render('resume.pug', {portfolioData: _config.portfolioData});
});

module.exports = router;