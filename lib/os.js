'use strict';
const os = require('os');
const OS = {
    //Require the server network interface to be named "eth0"
    //Already by default on linux, but windows network need to be renamed to eth0 (In network windows, just press F2 to rename).
    getServerIP: function(_family){
        let family = (_family)?_family:"IPv4";
        let network = null; 
        let i =0;
        //First try to find a eth on (from 1 to 10)
        while(!network && i<10){
            network = os.networkInterfaces()["eth"+i];
            i++;
        }
        if(!network){
            //If not found, try to find wlan
            i = 0;
            while(!network && i<10){
                network = os.networkInterfaces()["wlan"+i];
                i++;
            }
        }
        //If still not found, then we select first item in network
        if(!network){
            let netIter = os.networkInterfaces();
            network = netIter[Object.keys(netIter)[0]];
        }

        let iter = network.filter(function (iter) {
            return iter.family == family;
        })[0];
        return iter.address;
    }
};
module.exports = OS;