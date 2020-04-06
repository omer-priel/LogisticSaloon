const fs = require("fs");

class Events {
    constructor() {
        this.folder = null;
        this.typeEvents = [];
        this.events = [];
    }

    load(folder) {
        this.folder = folder;
        this.typeEvents = JSON.parse(fs.readFileSync(`${this.folder}/event_types.json`));

        let eventsFiles = fs.readdirSync(`${this.folder}/events`);
        
        for (let fileName of eventsFiles) {
            let file = `${this.folder}/events/${fileName}`;
            let event = JSON.parse(fs.readFileSync(file));

            this.events[event.id] = event;
        }
    }

    getAll() {
        return {
            typeEvents: this.typeEvents,
            events: this.events,
        };
    }
}

module.exports = new Events();