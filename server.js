var util = require('util'),
    connect = require('connect'),
    http = require('http'),
    fs = require('fs'),
    less = require('less'),
    PORT = 8000,
    LESS_FILE = '/css/main.less',
    CSS_FILE = '/css/main.css';


// Create our server
var app = connect();
var publicDir = __dirname + '/public';
var lessFilePath = publicDir + LESS_FILE;
var cssFilePath = publicDir + CSS_FILE;

// Configure express
app.use(connect.static(publicDir));

console.log("Starting server on port " + PORT);
var server = http.createServer(app).listen(PORT);

function compileLessFile() {
  fs.readFile(lessFilePath, function(err, data) {
    var code = new Buffer(data).toString();
    try {
      less.render(code, function(err, css) {
        if (err) { 
          console.log(err);
        } else {
          fs.writeFile(cssFilePath, css);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });  
}

// Compile LESS file on start
compileLessFile();

// Watch the less file and recompile whenever it changes
fs.watchFile(lessFilePath, function() {
  console.log("Less file changed. Recompiling ...");
  compileLessFile();
});