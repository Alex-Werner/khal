'use strict';

const sort = {
    by:function(el,params){
        if(!params) return el;
        for(let k in params){
            let v = params[k];
            if(v!=1 || v!=1){
                v= (v=='asc')?1:v;
                v= (v=='desc')?-1:v;
            }
            el.sort(function (a,b) {
                var result = (a[k] < b[k]) ? -1 : (a[k] > b[k]) ? 1 : 0;
                return result * v;
            })
        }
        return el;
    }
};
module.exports = sort;