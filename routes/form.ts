import { Request, Response } from 'express';
import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// get form config
const formData = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/form.json'), 'utf-8'))

export const formRoute = Router();

// form page render
formRoute.get('/form', (req: Request, res: Response) => {
    res.render('form.njk', {
        data: {
            title: 'Form',
            formData,
        },
    });
});

// for parsing post data
formRoute.use(bodyParser.urlencoded({ extended: true })); 

// form page post
formRoute.post('/form',
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'), // apply validation to password
    (req: Request, res: Response) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //return res.status(400).json({ errors: errors.array() });

        errors.array().forEach(error => {
            formData.inputs.find((input: any) => input.id == error.param).errorMessage = error.msg;
        });

        return res.render('form.njk', {
            data: {
                title: 'Form',
                formData,
            },
        });
    }

    // we have the form data - log to console and send user to complete page
    console.log(req.body);
    res.render('complete.njk');
});