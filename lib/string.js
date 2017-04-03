'use strict';

const string = {
    pad:{
        right:function(string, length, replaceBy=' '){
            string+='';
            replaceBy+='';
            let additionalLength = length-string.length;
            if(additionalLength<=0){
                return string;
            }
            let pad = "";
            while(additionalLength--){
                pad+=replaceBy;
            }
            return string+pad;
        },
        left:function(string, length, replaceBy=' '){
            string+='';
            replaceBy+='';
            let additionalLength = length-string.length;
            if(additionalLength<=0){
                return string;
            }
            let pad = "";
            while(additionalLength--){
                pad+=replaceBy;
            }
            return pad+string;
        }
    },
    replaceAt:function(string,index, replacement){
            return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
    }
};
module.exports = string;