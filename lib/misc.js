'use strict';

const clone = require('./clone');
const is = require('./is');

const misc = {
    merge:function(obj1={}){
        let argsNb = arguments.length;
        if(!argsNb) return {};
        if(argsNb==1) return arguments[0];
        if(argsNb>1){
            let merged = clone(arguments[0]) || {};
            for(let i=0; i<argsNb;i++){
                let o = clone(arguments[i]);
                for(let k in o){
                    if(!merged.hasOwnProperty(k)){
                        merged[k]=o[k];
                    }
                }
            }
            return clone(merged);
        }
    },
    formatByteSize: function (bytes, binary = true) {
        function outputSIForm(bytes) {
            if (bytes < 1000) return bytes + " bytes";
            else if (bytes < 1000000) return (bytes / 1000).toFixed(3) + " KB";
            else if (bytes < 1000000000) return (bytes / 1000000).toFixed(3) + " MB";
            else if (bytes < 1000000000000) return (bytes / 1000000000).toFixed(3) + " GB";
            else if (bytes < 1000000000000000) return (bytes / 1000000000000).toFixed(3) + " TB";
            else if (bytes < 1000000000000000000) return (bytes / 1000000000000000).toFixed(3) + " PB";
            else return (bytes / 1000000000000000000000).toFixed(3) + " EB ";
        };
        function outputIEECForm(bytes) {
            if (bytes < 1024) return bytes + " bytes";
            else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
            else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
            else if (bytes < 1099511627776) return (bytes / 1073741824).toFixed(3) + " GiB";
            else if (bytes < 1125899906842624) return (bytes / 1099511627776).toFixed(3) + " TiB";
            else if (bytes < 1125899906842624 * 1024) return (bytes / 1125899906842624).toFixed(3) + " PiB";
            else return (bytes / 1125899906842624 * 1024 * 1024).toFixed(3) + " EiB";
        }
        
        return binary ? outputIEECForm(bytes) : outputSIForm(bytes);
    },
    sizeOfObjectReadable:function(object,binary=true){
        return this.formatByteSize(this.sizeOfObject(object),binary);
    },
    sizeOfObject: function (object) {
        "use strict";
        /**
         * Byte sizes are taken from ECMAScript Language Specification
         * http://www.ecma-international.org/ecma-262/5.1/
         * http://bclary.com/2004/11/07/#a-4.3.16
         */
        
        var ECMA_byteSize = {
            STRING: 2,
            BOOLEAN: 4,
            NUMBER: 8
        };
        var objects = [object];
        var bytes = 0;
        var SIZE_FOR_UNRECOGNIZED_TYPE = 0;
        
        
        for (var index = 0; index < objects.length; index++) {
            if (is.obj(object)) {
                var stats = {
                    size: function (obj) {
                        if (is.string(obj)) {
                            return obj.length * ECMA_byteSize.STRING;
                        }
                        if (is.bool(obj)) {
                            return ECMA_byteSize.BOOLEAN;
                        }
                        if (is.num(obj)) {
                            return ECMA_byteSize.NUMBER;
                        }
                        return SIZE_FOR_UNRECOGNIZED_TYPE;
                    },
                    keys: [], values: [],
                    addKey: function (key) {
                        this.keys.push(key);
                    },
                    addKeyValue: function (key, value) {
                        this.keys.push(key);
                        this.values.push(value);
                    },
                    print: function () {
                        console.log('---\nkeys:\t', this.keys.length);
                        console.log('values:\t', this.values.length, '\n---');
                    },
                    calculateBytes: function () {
                        var all = this.keys.concat(this.values);
                        
                        var map = all.map(function (x) {
                            return stats.size(x);
                        });
                        
                        return map.reduce(function (x, y) {
                            return x + y;
                        }, 0);
                    }
                };
                var collectKeysVal = function (object, stats) {
                    for (var prop in object) {
                        if (object.hasOwnProperty(prop)) {
                            if (is.obj(object[prop])) {
                                // this key is a reference, count the key and proceed with the referenced value
                                stats.addKey(prop);
                                collectKeysVal(object[prop], stats);
                            } else {
                                stats.addKeyValue(prop, object[prop]);
                            }
                        }
                    }
                    return object;
                };
                
                try {
                    collectKeysVal(object, stats);
                    
                } catch (e) {
                    
                }
                bytes = stats.calculateBytes();
                
            } else if (is.string(object)) {
                bytes = object.length * ECMA_byteSize.STRING;
            } else if (is.bool(object)) {
                bytes = ECMA_byteSize.BOOLEAN;
            } else if (is.num(object)) {
                bytes = ECMA_byteSize.NUMBER;
            }
            return bytes;
        }
    }
};
module.exports = misc;