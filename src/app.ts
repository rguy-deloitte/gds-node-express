import express, {Application, Request, Response} from 'express';
import nunjucks from 'nunjucks';
import { routes } from '../routes'
import path from 'path';

const app: Application = express();

// set static folders
app.use(express.static('public'));
app.use('/govuk-frontend', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk')));
app.use('/assets', express.static(path.join(__dirname, '../node_modules/govuk-frontend/govuk/assets')));

// Setup nunjucks templating engine
nunjucks.configure(['node_modules/govuk-frontend/', 'views'], {
    autoescape: true,
    express: app
});

// routes
app.use('/', routes);

// set port
app.set('port', process.env.PORT || 3000);

// start the server and listen
app.listen(app.get('port'), () => {
    console.log('Server started on port', app.get('port'));
});