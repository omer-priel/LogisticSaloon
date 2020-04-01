class CustomEvent {
    constructor() {
        this.callers = [];   
    }

    add(callback) {
        this.callers[this.callers.length] = callback;
    }

    run() {
        this.callers.forEach(callback => {
            callback(...arguments);
        });
    }
}

export default CustomEvent;