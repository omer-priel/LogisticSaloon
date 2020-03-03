/**
 * The Logger System
 */

const config = require("app/config");

// require packages
const fs = require("fs"),
    dateformat = require("dateformat");


/**
 * The Logger System Class.
 */
class Logger {
    // fields
    file = null;
    last_day = "";

    /**
     * Send log to the server.
     * @param {*} line - the log line 
     */
    log(message, from = "server", type = "MESSAGE") {
        let date = new Date();
        let time = dateformat(date, "hh:mm:ss");
        let day = dateformat(date, "yyyy-mm-dd");

        if (!from) {
            from = "server";
        }

        let line = `${time} ${type} ${from} - ${message}`;

        consoleLog(line);
        
        if (config.logger.save_in_log_file) {
            try {
                if (this.last_day != day) {
                    this.last_day = day;
                    this.file = config.logger.folder + day + ".log";
                    fs.writeFileSync(this.file, line + "\n");
                } else {
                    fs.appendFileSync(this.file, line + "\n");
                }    
            } catch (error) {
                consoleLog(error + "");
            }
        }
    }

    warn(message, from) {
        this.log(message, from, "WARNING");
    }

    error(message, from) {
        this.log(message, from, "ERROR");
    }
}

let logger = new Logger();

// change console.log to logger.log
let consoleLog = console.log;
console.log = function(message, from) {
    logger.log(message, from);
}
console.warn = function(message, from) {
    logger.warn(message, from);
}
console.error = function(message, from) {
    logger.error(message, from);
}

// settings
// logger\delete_logs_file
if (config.logger.delete_logs_file) {
    let files = fs.readdirSync(config.logger.folder);
    files.forEach(file => {
        fs.unlink(config.logger.folder + file, () => {});
    });
} else if (config.logger.save_in_log_file) {
    let date = new Date();
    let day = dateformat(date, "yyyy-mm-dd");

    let file = config.logger.folder + day + ".log";
    if (fs.existsSync(file)) {
        logger.last_day = day;
        logger.file = file;
    }
}

// logger\show_console_log
if (!config.logger.show_console_log) {
    consoleLog = function() {};
}

module.exports = logger;