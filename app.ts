const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const fs = require('fs');
const formData = JSON.parse(fs.readFileSync('config/form.json', 'utf8'));

const app = express();

app.use('/govuk-frontend', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '/node_modules/govuk-frontend/govuk/assets')));
app.use('/macros', express.static(path.join(__dirname, '/macros')));

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
        port: app.get('port'),
        data: {
            title: 'Homepage',
        }
    });
});

// Form page
app.get('/form', function(req, res) {
    res.render('form.njk', {
        page: 'form',
        port: app.get('port'),
        data: {
            title: 'Form',
            formData,
        },
    });
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});