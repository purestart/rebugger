"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//日志传输流
var winston = require("winston");
require("winston-daily-rotate-file");
var process = require("child_process");
var _a = winston.format, combine = _a.combine, timestamp = _a.timestamp, label = _a.label, printf = _a.printf, prettyPrint = _a.prettyPrint;
var timestampOptions = {
    format: "YYYY-MM-DD HH:mm:ss"
};
// let successLogger = winston.createLogger({
//   format: combine(
//     timestamp(timestampOptions),
//     prettyPrint(),
//     winston.format.errors({ stack: true }), //加上这个就会自动加上stack
//     winston.format.json()
//   ), //json化报错信息
//   transports: [
//     new winston.transports.Console({
//       name: "console-success-log",
//       level: "info",
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       name: "file-info-log",
//       filename: "server/logs/success.log"
//     })
//   ]
// });
// let errorLogger = winston.createLogger({
//   format: combine(
//     timestamp(timestampOptions),
//     prettyPrint(),
//     winston.format.errors({ stack: true }), //加上这个就会自动加上stack
//     winston.format.json()
//   ), //json化报错信息
//   transport: [
//     new winston.transports.Console({
//       name: "console-error-log",
//       json: true,
//       colorize: true
//     }),
//     new winston.transports.File({
//       name: "file-error-log",
//       filename: "server/logs/error.log"
//     })
//   ]
// });
// let oldLogger = winston.createLogger({
//   format: combine(
//     timestamp(timestampOptions),
//     prettyPrint(),
//     winston.format.errors({ stack: true }), //加上这个就会自动加上stack
//     winston.format.json()
//   ), //json化报错信息
//   transports: [
//     new winston.transports.File({
//       name: "error",
//       colorize: true,
//       timestamp: true,
//       level: "error",
//       filename: "server/logs/error.log",
//       json: true
//     })
//     // new winston.transports.File({
//     //   name: "info",
//     //   colorize: true,
//     //   timestamp: true,
//     //   level: "info",
//     //   filename: "server/logs/success.log",
//     //   json: true
//     // })
//   ]
// });
var myFormat = printf(function (info) {
    return info.timestamp + " [" + info.level + "] " + info.url + ": " + info.message + " Method: " + info.method + " " + info.body + " " + info.query;
});
var transport = new winston.transports.DailyRotateFile({
    filename: "server/logs/CGI-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "10240k",
    maxFiles: "14d",
    level: "error",
    json: false,
    timestamp: true
});
transport.on("rotate", function (oldFilename, newFilename) {
    // do something fun
    console.log(oldFilename, newFilename);
    // if(){
    //     process.exec('mkdir ')
    // }
});
var logger = winston.createLogger({
    format: combine(timestamp(timestampOptions), 
    // prettyPrint(),
    winston.format.errors({ stack: false }), //加上这个就会自动加上stack
    winston.format.json(), myFormat),
    transports: [transport]
});
exports.default = {
    // success: successLogger,
    // error: errorLogger,
    logger: logger
};
