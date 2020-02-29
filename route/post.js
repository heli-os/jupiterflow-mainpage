const express = require('express');
const router = express.Router();
const path = require('path');

const portfolioData = require(path.join(__dirname, '..', 'data','data.json'));

router.use((req, res, next) =>{
    console.log('Time: ', Date.now());
    next();
});

router.get('/', (req, res) => {
    res.render('post', {portfolioData: portfolioData});
});

module.exports = router;