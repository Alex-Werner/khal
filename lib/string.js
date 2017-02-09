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
    }
};
module.exports = string;