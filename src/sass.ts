import * as fs from 'fs';
const sass = require('sass');

sass.render({
  file: 'node_modules/govuk-frontend/govuk/all.scss',
  outputStyle: 'compressed',
}, function(err: any, result: any) {
  if(!err){
    fs.writeFile('node_modules/govuk-frontend/govuk/all.css', result.css, function(err){
      if(err){
        console.log(err);
      }
    });
  } else {
    console.log(err);
  }
});