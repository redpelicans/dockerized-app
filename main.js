var debug = require('debug')
  , spawn = require('child_process').spawn;

function version(cb){
  var cmd = spawn('git', ['log', '-1', '--format="%h"'])
    , error, version;

  cmd.stdout.on('data', function(data){
    version = data.toString().replace(/(\n$|\")/g, '');
  });

  cmd.stderr.on('data', function(data){
    error = data.toString();
  });

  cmd.on('close', function(code){
    if(code != 0) return cb(new Error(error));
    cb({ gitVersion: version, revision: process.env.APP_REVISION });
  });
}

version(function(err, data){
  if(err)return console.log(err);
  console.log("App now running with git's version: %s", data);
})
