const fs = require("fs");

class Events {
    constructor() {
        this.folder = null;
        this.eventTypes = [];
        this.events = [];
    }

    load(folder) {
        this.folder = folder;
        this.eventTypes = JSON.parse(fs.readFileSync(`${this.folder}/event_types.json`));

        let eventsFiles = fs.readdirSync(`${this.folder}/events`);
        
        for (let fileName of eventsFiles) {
            let file = `${this.folder}/events/${fileName}`;
            let event = JSON.parse(fs.readFileSync(file));

            this.events[event.id] = event;
        }
    }

    getAll() {
        return {
            eventTypes: this.eventTypes,
            events: this.events,
        };
    }
}

module.exports = new Events();