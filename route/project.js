const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const _config = req._config;
    res.render('project_list', {portfolioData: _config.portfolioData, colorScheme: _config.colorScheme});
});

router.get('/:id', (req, res) => {
    const _config = req._config;
    const postNum = req.params.id;
    res.render('project_view', {markdownRender: _config.markdownRender, postNum: postNum, portfolioData: _config.portfolioData, colorScheme: _config.colorScheme});
});

module.exports = router;