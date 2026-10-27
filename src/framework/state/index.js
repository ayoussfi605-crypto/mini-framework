export class State {
    constructor(inistialState = {}) {
        this.state = inistialState;
        this.listeners = [];

    }

    getState() {
        return this.state;
    }

    setState(newState) {
        this.state = newState
        this.listeners.forEach(listener => listener(this.state));
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(ele => ele !== listener);
        }
    }
}