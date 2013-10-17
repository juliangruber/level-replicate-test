var spawn = require('child_process').spawn;
var rimraf = require('rimraf').sync;
var level = require('level');

var parties = Number(process.argv[2]);
if (!parties) {
  console.error('usage: node test.js [number of parties]');
  process.exit(1);
}

var processes = [];
var delay = 2000;

rimraf(__dirname + '/db-1');
var db = level(__dirname + '/db-1');
db.batch()
  .put(Date.now() + Math.random(), '00')
  .put(Date.now() + Math.random(), '01')
  .put(Date.now() + Math.random(), '02')
  .put(Date.now() + Math.random(), '03')
  .put(Date.now() + Math.random(), '04')
  .write(function(err) {
    if (err) throw err;
    db.close(function() {
      setup(1);
    });
  });

function setup(i) {
  if (i != 1) rimraf(__dirname + '/db-' + i);
  var ps = spawn('node', [__dirname + '/index', i]);
  var ch = String.fromCharCode(64 + i);
  ps.stdout.on('data', log(' ' + ch));
  processes.push(ps);
  if (i < parties) setTimeout(setup.bind(null, i + 1), delay);
  else write();
};

function write() {
  var i = 0;
  setInterval(function() {
    var idx = i % parties;
    console.log('!' + String.fromCharCode(65 + idx) + ' ' + i);
    processes[idx].stdin.write(String(i));
    i++;
  }, delay);
}


function log(pre) {
  return function(d) {
    process.stdout.write(pre + ' ' + d.toString());
  }
}

