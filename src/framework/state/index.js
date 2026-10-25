export class State {
    constructor(inistialState = {}) {
        this.state = inistialState;
        this.listeners = new Set();

    }

    getState() {
        return this.state;
    }

    setState(newState) {
        const mergedState = { ...this.state, ...newState };

        if (JSON.stringify(this.state) !== JSON.stringify(mergedState)) {
            this.state = mergedState;
            this.listeners.forEach(listener => listener());
        }

    }

    subscribe(listener) {
        if (typeof listener !== "function") {
            throw new TypeError("Listener must be a function.");
        }

        this.listeners.add(listener);

        return () => {
            this.listeners.delete(listener);
        };
    }
}