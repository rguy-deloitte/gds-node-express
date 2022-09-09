const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');

const app = express();

app.use('/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')));

// Setup nunjucks templating engine
nunjucks.configure(['node_modules/govuk-frontend/', 'views'], {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('index.njk', {
        page: 'home',
        port: app.get('port')
    });
});

// Other example
app.get('/form', function(req, res) {
    res.render('form.njk', {
        page: 'form',
        port: app.get('port')
    });
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});