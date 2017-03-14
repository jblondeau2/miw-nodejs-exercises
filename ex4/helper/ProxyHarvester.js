'use strict';

var path = require('path');
var fs = require('fs');
var xray = require('x-ray')();
var crypto = require('crypto');

var Proxy = require("../model/proxy");

// Helpers
var array_group = require('./array/array_group');
var array_combine = require('./array/array_combine');


class ProxyHarvester{

    // Constructor
    constructor() {
        //this.type = type;
    }

    loadFromHtml(html){

        return new Promise(function(resolve, reject){

            xray(html, ['#proxylisttable tbody'],
                {
                    //lines: xray(['tr@html'])
                    ips: xray('tr', ['td:nth-child(1)@html']),
                    ports: xray('tr', ['td:nth-child(2)@html']),
                    country: xray('tr', ['td:nth-child(4)@html'])
                })(function(err, obj) {

                var result = array_group(obj.ips, obj.ports, obj.country);
                var hasher = crypto.createHash('md5');

                console.log(result);

                result.forEach(function(infos) {

                    try {

//                        var hash = hasher.update(infos.ip+infos.port).digest('hex');

                        // Creating proxy.
                        var newProxy = new Proxy({
                            ipAddress: infos.ip,
                            port: infos.port,
                            country: infos.country,
                            //                          hash: hash,
                            status: true
                        });

                        // Saving New proxy.
                        newProxy.save(function (err) {
                            if (err) return handleError(err);

                            // Saved.
                            console.log('Proxy saved:', newProxy.get('ipAddress')+':'+newProxy.get('port')+' - '+newProxy.get('hash'));
                            //numberOfProxies++;
                            //console.log(numberOfProxies);

                        });

                    } catch (err) {
                        console.log('inserting error: '+err);
                        reject(err);
                    }
                });

                resolve(result.length);

            });
        });
    }

}


// export the class
module.exports = ProxyHarvester;