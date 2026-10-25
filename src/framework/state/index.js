export class State {
    constructor(inistialState = {}) {
        this.state = inistialState;
        this.listeners = new Set();

    }

    getState() {
        return this.state;
    }

    setState(newState) {
        const nextState = typeof newState === "function" ? newState(this.state) : newState;

        if (Object.is(this.state, nextState)) {
            return;
        }
        
        this.state = nextState;
        this.version++;
        this.notify();
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

    notify() {
        for (const listener of [...this.listeners]) {
            if (!this.listeners.has(listener)) continue;

            listener(this.state, this.version);
        }
    }
}