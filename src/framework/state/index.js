export class State {
    constructor(inistialState = {}) {
        this.state = inistialState;
        this.listeners = [];

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
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(ele => ele !== listener);
        }
    }
}