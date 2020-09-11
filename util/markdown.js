const hljs = require('highlight.js'); // https://highlightjs.org/
const marked = require('marked');
marked.setOptions({
    highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
    }
});
const fs = require('fs');
const path = require('path');


const markdownRender = (postNum) => {
    const fileDir = path.join(__dirname, '..', 'data', 'project', postNum, 'README.md');
    return marked(fs.readFileSync(fileDir,'utf8'));
};

module.exports = markdownRender;