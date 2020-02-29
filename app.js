const https = require('https');
const fs = require('fs');
const optionsForHTTPS = {
    key: fs.readFileSync('/etc/letsencrypt/live/jupiterflow.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/jupiterflow.com/cert.pem')
};

const express = require('express');
const app = express();
const path = require('path');

const portfolioData = require(path.join(__dirname, 'data', 'data.json'));
const colorScheme = require(path.join(__dirname, 'data', 'colorScheme.json'));

const indexRouter = require('./route/index');
const projectRouer = require('./route/project');
const postRouter = require('./route/post');

const markdownRender = require('./util/markdown');

if (app.get('env') === 'development')
    app.locals.pretty = true;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));

app.use('/static', express.static(path.join(__dirname, 'public'), {
    maxAge: '0'
}));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

const setParams = (req, res, next) => {
    req._config = {
        portfolioData: portfolioData,
        colorScheme: colorScheme,
        markdownRender: markdownRender
    }
    next();
};

app.use('/', setParams, indexRouter);
app.use('/project', setParams, projectRouer);
app.use('/post', setParams, postRouter);

https.createServer(optionsForHTTPS, app).listen(9608, () => {
    console.log('9608 connected !');
});