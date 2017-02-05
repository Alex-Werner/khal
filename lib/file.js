const fs = require("fs");
const File = {
    sizeof: function (filename, cb) {
        if(cb){
            fs.stat(filename, function (err, stats) {
                if (err) return cb(err,0)
                cb(null, stats);
            })
        }else{
            let stats = fs.statSync(filename);
            return stats["size"];
        }
    },
    exist:function(filename, cb){
        if(cb){
            fs.stat(filename, function (err, stats) {
                if (err) return cb(err,false)
                cb(null, true);
            })
        }else{
            return fs.existsSync(filename);
        }
        
    },
    create:function(filename, cb){
        if(cb){
            fs.writeFile(filename, '', function (err) {
                if (err) return cb(err)
                cb()
            })
        }else{
            try{
                fs.writeFileSync(filename,'');
                return true;
            }catch (err){
                return false;
            }
        }
       
    },
    append:function(filename, data, cb){
        if(cb){
            fs.appendFile(filename, data, function (err) {
                if (err) return cb(err)
                cb()
            });
        }else{
            try{
                fs.appendFileSync(filename,data);
                return true;
            }catch (err){
                return false;
            }
        }
        
    },
    delete:function(filename, cb){
        if(cb){
            fs.unlink(filename, (err) => {
                if (err) return cb(err)
                cb()
            });
        }else{
            try{
                fs.unlinkSync(filename);
                return true;
            }catch (err){
                return false;
            }
        }
        
    }
};
module.exports = File;