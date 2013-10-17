var net = require('net');
var level = require('level');
var replicate = require('level-replicate');
var sub = require('level-sublevel');
var live = require('level-live-stream');
var noop = function(){};

var id = Number(process.argv[2]);
if (isNaN(id)) throw new Error('id required');
console.log('id: %s', id);

var db = sub(level(__dirname + '/db-' + id));
var master = replicate(db, 'repl', id);

process.stdin.on('data', function(buf) {
  db.put(Date.now(), buf.toString().replace(/\n/, ''));
});

// this shouldn't be necessary
var opts = { end: '\xff' };

live(db, opts).on('data', function(kv) {
  console.log('%s: %s', kv.key, kv.value);
});

net.createServer(function(con) {
  con.pipe(master.createStream({ tail: true })).pipe(con);
}).listen(8000 + id);

var con = net.connect(8000 + id - 1);
con.on('error', noop);
con.pipe(master.createStream({ tail: true })).pipe(con);

