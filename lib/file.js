const fs = require("fs");
const File = {
    sizeof: function (filename, cb) {
        if (cb) {
            fs.stat(filename, function (err, stats) {
                if (err) return cb(err, 0)
                cb(null, stats);
            })
        } else {
            let stats = fs.statSync(filename);
            return stats["size"];
        }
    },
    exist: function (filename, cb) {
        if (cb) {
            fs.stat(filename, function (err, stats) {
                if (err) return cb(err, false)
                cb(null, true);
            })
        } else {
            return fs.existsSync(filename);
        }

    },
    create: function (filename, cb) {
        if (cb) {
            fs.writeFile(filename, '', function (err) {
                if (err) return cb(err);
                cb()
            })
        } else {
            try {
                fs.writeFileSync(filename, '');
                return true;
            } catch (err) {
                return false;
            }
        }

    },
    append: function (filename, data, cb) {
        if (cb) {
            fs.appendFile(filename, data, function (err) {
                if (err) return cb(err)
                cb()
            });
        } else {
            try {
                fs.appendFileSync(filename, data);
                return true;
            } catch (err) {
                return false;
            }
        }

    },
    delete: function (filename, cb) {
        if (cb) {
            fs.unlink(filename, (err) => {
                if (err) return cb(err)
                cb()
            });
        } else {
            try {
                fs.unlinkSync(filename);
                return true;
            } catch (err) {
                return false;
            }
        }
    },
    /**
     *
     * @param URL
     * @param destination
     * @param cb
     * @returns {Promise<U>|Promise.<T>} Return either true either an error, or a statusCode
     */
    download: function (URL, destination) {
        return new Promise(function (resolve, reject) {
            if (!URL) throw("Require URL");
            if (!destination) throw("Require destination");

            const timeout = 20 * 1000;//20 seconde timeout (time to get the response)
            const protocol = url.parse(URL).protocol;
            const req = (protocol === 'https:') ? https : http;

            URL = (protocol === null) ? 'http://' + URL : URL;

            let request = req.get(URL, function (response) {
                const statusCode = response.statusCode;
                if (statusCode === 200) {
                    let file = fs.createWriteStream(destination);
                    response.pipe(file);
                    file.on("finish", function () {
                    });
                    file.on("close", function () {
                        return resolve(true);
                    });
                } else if (statusCode == 302 || statusCode == 301) {
                    //Redirection
                    let newURL = response.headers.location;
                    console.log("Redirect to", newURL);
                    // throw("Moved to ",newURL)
                    return resolve(File.downloadImage(newURL, destination));
                } else if (statusCode === 404) {
                    // throw("Unreachable domain", statusCode);
                    return resolve(statusCode);
                }
                else {
                    // throw("Got an statusCode", statusCode);
                    return resolve(statusCode);
                }
            }).on('error', function (e) {
                // console.log(e);
                return resolve(e);
            });
            request.setTimeout(timeout, function () {
                request.abort();
                console.log("ABORT");
                //Gateway time-out
                return resolve(504);
            })
        }).catch(function (e) {
            return resolve(e);
        });
    }
};
module.exports = File;