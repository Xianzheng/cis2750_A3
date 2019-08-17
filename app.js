'use strict'

// C library API
const ffi = require('ffi');

// Express App (Routes)
const express = require("express");
const app     = express();
const path    = require("path");
const fileUpload = require('express-fileupload');

app.use(fileUpload());

// Minimization
const fs = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

// Important, pass in port as in `npm run dev 1234`, do not change
const portNum = process.argv[2];

// Send HTML at root, do not change
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});

// Send Style, do not change
app.get('/style.css',function(req,res){
  //Feel free to change the contents of style.css to prettify your Web app
  res.sendFile(path.join(__dirname+'/public/style.css'));
});

// Send obfuscated JS, do not change
app.get('/index.js',function(req,res){
  fs.readFile(path.join(__dirname+'/public/index.js'), 'utf8', function(err, contents) {
    const minimizedContents = JavaScriptObfuscator.obfuscate(contents, {compact: true, controlFlowFlattening: true});
    res.contentType('application/javascript');
    res.send(minimizedContents._obfuscatedCode);
  });
});

//Respond to POST requests that upload files to uploads/ directory
app.post('/upload', function(req, res) {
  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  let uploadFile = req.files.uploadFile;
  //console.log(uploadFile.name);
  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv('uploads/' + uploadFile.name, function(err) {
    if(err) {
      return res.status(500).send(err);
    }

    res.redirect('/');
    //window.location.reload();
  });
});

//Respond to GET requests for files in the uploads/ directory
app.get('/uploads/:name', function(req , res){
  fs.stat('uploads/' + req.params.name, function(err, stat) {
    console.log(err);
    if(err == null) {
      res.sendFile(path.join(__dirname+'/uploads/' + req.params.name));
      window.location.reload();
    } else {
      res.send('');
    }
  });
});

//******************** Your code goes here ********************
var fileName="uploads/testCard.vcf";
let sharedLib = ffi.Library('./parser/lib.so', {

  'returnProp' : [ 'string', ['string'] ],
  'returnOtherPropertyNum' : [ 'int', ['string'] ],
  'returnProperty' : [ 'string', ['string'] ],

});

let prop = sharedLib.returnProp(fileName);
//console.log(prop);

const testFolder = "uploads/"
var fileArray = [];
var jsonArray = [];
var fileName;
var opNum;
var fileNum;
fs.readdir('uploads/', (err, files) => {

  files.forEach((file) => {
   fileArray.push(file);
   fileName ="{\""+"file"+"\":\""+file.toString()+"\"}";
   var array = fs.readFileSync(testFolder + file).toString().split("\n");
   let prop = sharedLib.returnProp(testFolder + file);
   opNum = sharedLib.returnOtherPropertyNum(testFolder + file);
   fileNum ="{\""+"num"+"\":\""+opNum.toString()+"\"}";
   jsonArray.push(prop);
   jsonArray.push(fileName);
   jsonArray.push(fileNum);

  });
});




app.get('/someendpoint', function(req , res){

  fs.readdir('uploads/', (err, files) => {

    files.forEach((file) => {
     fileArray.push(file);
     fileName ="{\""+"file"+"\":\""+file.toString()+"\"}";
     var array = fs.readFileSync(testFolder + file).toString().split("\n");
     let prop = sharedLib.returnProp(testFolder + file);
     opNum = sharedLib.returnOtherPropertyNum(testFolder + file);
     fileNum ="{\""+"num"+"\":\""+opNum.toString()+"\"}";
     jsonArray.push(prop);
     jsonArray.push(fileName);
     jsonArray.push(fileNum);

    });
  });

  res.send(
    //console.log(jsonArray)
      jsonArray
  );
  fileArray = [];
  jsonArray = [];
});
var pro;
var j = [];
var jsonArray1 =[];
app.post('/open', function(req, res) {
  if(!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  let open = req.files.openFile;
  var file = testFolder+open.name;
  //console.log(file);
  pro = sharedLib.returnProperty(file);
  //console.log(pro);
  j=[];
  jsonArray1 = [];
  j = pro.split('|');
  for(var i = 0; i<j.length;i++){
    jsonArray1.push(j[i]);
  }


  //console.log(sharedLib.returnOptionalPro(file));
  // Use the mv() method to place the file somewhere on your server
});
app.get('/someendpoint1', function(req , res){
  //console.log(jsonArray1[0]);

  res.send(
    jsonArray1
  );
});
/*app.get('/someendpoint2', function(req , res){
  res.send(
      op
  );
});*/
app.listen(portNum);
console.log('Running app at localhost: ' + portNum);
