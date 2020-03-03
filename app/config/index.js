/**
 * This is the server config
 */
module.exports = {
    network: {
        port: 80,
        db: "localhost",
    },

    logger: {
        //conole log
        show_console_log: true,
        
        //log files
        folder: "logs/",
        save_in_log_file: true,
        delete_logs_file: false,
    },
};