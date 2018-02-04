var winston = require("winston");
var moment = require("moment");
var logFileName = process.cwd() + '/logs/' + moment().utc().format("YYYYMMDD") + '.log';
var logger = new (winston.Logger)({
    transports: [
        //new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: logFileName,
            handleExceptions: true, //same file shall be used for handling info as well as exception logs
            json: true,
            maxsize: 5242880,
            timestamp: true
        })
    ],
    exitOnError: false //prevent exit if an uncaught exception occurs
});
logger.on('error', function (err) {
    console.log("Error while create logger %s", err);
});
module.exports = logger;