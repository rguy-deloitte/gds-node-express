import express, {Application, Request, Response} from 'express';
import nunjucks from 'nunjucks';
import fs from 'fs';
import path from 'path';
import bodyParser from 'body-parser';

const app: Application = express();

// set static folders
app.use('/govuk-frontend', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/assets')));

// for parsing post data
app.use(bodyParser.urlencoded({ extended: true })); 

// get form config
const formData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/form.json'), 'utf-8'));

// Setup nunjucks templating engine
nunjucks.configure(['node_modules/govuk-frontend/', 'views'], {
    autoescape: true,
    express: app
});

app.set('port', process.env.PORT || 3000);

// Home page
app.get('/', function(req, res) {
    res.render('index.njk', {
        data: {
            title: 'Homepage',
        }
    });
});

// Form page
app.get('/form', function(req, res) {
    res.render('form.njk', {
        data: {
            title: 'Form',
            formData,
        },
    });
});

app.post('/form', function(req, res) {
    // we have the form data - log to console and send user to complete page
    console.log(req.body);
    res.render('complete.njk');
});

// Kick start our server
app.listen(app.get('port'), function() {
    console.log('Server started on port', app.get('port'));
});