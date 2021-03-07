const express = require('express');
const router = express.Router();
const {SitemapStream, streamToPromise} = require('sitemap');
const {createGzip} = require('zlib')

let sitemap;

router.get('/ads.txt',(req,res,next)=>{
    res.header('Content-Type', 'text/plain');
    res.send('google.com, pub-1462947422010620, DIRECT, f08c47fec0942fa0');
});

router.get('/robots.txt',(req,res,next)=>{
    res.header('Content-Type','text/plain');
    res.send('User-agent: *' + '\n' +
        'Allow: /' + '\n' +
        'Allow: /ads.txt' + '\n' +
        'Sitemap: https://jupiterflow.com/sitemap.xml'
    );
});

router.get('/sitemap.xml', (req, res, next) => {
    const _config = req._config;
    const portfolioData = _config.portfolioData;

    res.header('Content-Type', 'application/xml');
    res.header('Content-Encoding', 'gzip');
    if (sitemap) {
        res.send(sitemap);
        return
    }
    try {
        const smStream = new SitemapStream({hostname: 'https://www.jupiterflow.com/'});
        const pipeline = smStream.pipe(createGzip());


        smStream.write({url: '/', changefreq: 'daily', priority: 1});
        smStream.write({url: '/resume', changefreq: 'daily', priority: 1});
        smStream.write({url: '/project', changefreq: 'daily', priority: 0.8});

        portfolioData.content.project.data.forEach((item,idx) => {
            const postNum = idx + 1;
            smStream.write({url: '/project/' + postNum, changefreq: 'daily', img: item.img[0],priority: 0.7});
        });


        smStream.end();

        // cache the response
        streamToPromise(pipeline).then(sm => sitemap = sm);
        // stream the response
        pipeline.pipe(res).on('error', (e) => {
            throw e
        });
    } catch (e) {
        console.error(e);
        res.status(500).end();
    }
});

module.exports = router;