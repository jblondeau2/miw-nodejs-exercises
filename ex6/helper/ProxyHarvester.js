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

        return new Promise((resolve, reject) => {

            xray(html, ['#proxylisttable tbody'],
                {
                    //lines: xray(['tr@html'])
                    ips: xray('tr', ['td:nth-child(1)@html']),
                    ports: xray('tr', ['td:nth-child(2)@html']),
                    country: xray('tr', ['td:nth-child(4)@html'])
                })((err, obj) => {

                var result = array_group(obj.ips, obj.ports, obj.country);
                var successfulInsert = 0;
                var duplicate = 0;

                console.log(result);

                var inserts = result.map((infos) => {

                    return new Promise((resolve, reject) => {

                        // Creating proxy.
                        var newProxy = new Proxy({
                            ipAddress: infos.ip,
                            port: infos.port,
                            country: infos.country,
                            status: true
                        });

                        // Saving New proxy.
                        newProxy.save(function (err) {
                            if (err){
                                console.log('inserting error: '+err);
                                duplicate++;
                            }else{
                                // Saved.
                                console.log('Proxy saved:', newProxy.get('ipAddress')+':'+newProxy.get('port')+' - '+newProxy.get('hash'));
                                successfulInsert++;
                            }

                            resolve();
                        });
                    });
                });

                Promise.all(inserts).then(() => {
                    console.log('new: '+successfulInsert);
                    console.log('duplicate: '+duplicate);

                    resolve({
                        'new': successfulInsert,
                        'duplicate': duplicate
                    });
                });
            });
        });
    }
}


// export the class
module.exports = ProxyHarvester;