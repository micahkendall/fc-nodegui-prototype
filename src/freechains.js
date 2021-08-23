const net = require("net");
var readline = require('readline');
var VERSION = "v0.8.4";

exports.freechains = function(params) {
    if (!params) {
        return;
    }
    var ip = params.ip || '127.0.0.1',
        port = params.port || '8330';
    return (function(str, callback) {
            var received = ""
            var s = net.createConnection({
                port: port,
                ip: ip,
                allowHalfOpen: false
            }, () => {
                s.setEncoding('utf8');
                s.write("FC v0.8.4 " + str + "\n");
            });
            s.on('data', (data)=>{
                received+=data;
                if (data.search("\n")!=-1){
                    callback(received.slice(0,-1));
                    s.end();
                };
            });
    });
}